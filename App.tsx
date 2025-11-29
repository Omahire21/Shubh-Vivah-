import React, { useState, useRef, useEffect } from 'react';
import Header from './components/Header';
import FormControls from './components/FormControls';
import CardPreview from './components/CardPreview';
import TemplateGallery from './components/TemplateGallery';
import { WeddingDetails, TemplateConfig, INITIAL_DETAILS } from './types';
import { TEMPLATE_OPTIONS } from './data/templates';
import { downloadCard, downloadCardAsPDF } from './utils/downloadUtils';
import { Undo, Redo, FileEdit, Palette, Eye, ZoomIn, ZoomOut, Move, Maximize2, X, Pencil, ArrowUp, ArrowDown, ArrowLeft, ArrowRight, Check } from 'lucide-react';

// Default Couple Photo for Split Cards
const DEFAULT_COUPLE_PHOTO = "https://images.unsplash.com/photo-1621621667797-e06afc217fb0?q=80&w=2070&auto=format&fit=crop";

export default function App() {
  const [details, setDetails] = useState<WeddingDetails>(INITIAL_DETAILS);
  const [template, setTemplate] = useState<TemplateConfig>(TEMPLATE_OPTIONS[0]);
  const [showGallery, setShowGallery] = useState(false);
  const [hasDraft, setHasDraft] = useState(false);
  
  // Mobile Tab State
  const [mobileTab, setMobileTab] = useState<'content' | 'design' | 'preview'>('content');

  // Mini Preview State (Mobile)
  const [showPip, setShowPip] = useState(true);
  // Positioned above the PNG download button (approx 320px from bottom)
  const [pipPos, setPipPos] = useState({ x: window.innerWidth - 120, y: window.innerHeight - 320 });
  const [pipScale, setPipScale] = useState(0.18);
  const isDragging = useRef(false);
  const dragOffset = useRef({ x: 0, y: 0 });
  const longPressTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [showPeekPreview, setShowPeekPreview] = useState(false);

  // History State for Undo/Redo
  const [history, setHistory] = useState<WeddingDetails[]>([]);
  const [redoStack, setRedoStack] = useState<WeddingDetails[]>([]);
  
  // Text Editing State (Mobile/Preview)
  const colorInputRef = useRef<HTMLInputElement>(null);
  const [activeTextField, setActiveTextField] = useState<keyof typeof details.textStyles | null>(null);
  const [isMoveMode, setIsMoveMode] = useState(false);

  useEffect(() => {
    const savedDraft = localStorage.getItem('weddingCardDraft');
    if (savedDraft) setHasDraft(true);
    
    // Reset PIP position on resize - Adjusted for Tablet logic (1280px)
    const handleResize = () => {
       if (window.innerWidth < 1280) {
           setPipPos({ x: window.innerWidth - 120, y: window.innerHeight - 320 });
       }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleRecordHistory = () => {
    setHistory(prev => [...prev, details]);
    setRedoStack([]);
  };

  const handleUndo = () => {
    if (history.length === 0) return;
    const previous = history[history.length - 1];
    setRedoStack(prev => [details, ...prev]);
    setDetails(previous);
    setHistory(prev => prev.slice(0, -1));
  };

  const handleRedo = () => {
    if (redoStack.length === 0) return;
    const next = redoStack[0];
    setHistory(prev => [...prev, details]);
    setDetails(next);
    setRedoStack(prev => prev.slice(1));
  };

  const handleDownload = () => downloadCard('wedding-card-preview', `${details.brideName}-wedding-card`);
  const handleDownloadPDF = () => downloadCardAsPDF('wedding-card-preview', `${details.brideName}-wedding-card`);

  const handleTextClick = (field: keyof typeof details.textStyles) => {
     setActiveTextField(field);
     // DO NOT open color picker automatically anymore.
     // User must click the Pencil icon in the toolbar.
  };

  const openColorPicker = () => {
      if (!activeTextField || !colorInputRef.current) return;
      const currentColor = details.textStyles[activeTextField]?.color || '#000000';
      colorInputRef.current.value = currentColor.startsWith('#') ? currentColor : '#000000';
      colorInputRef.current.click();
  };

  // Callback for dragging/resizing text in preview
  const handleManualStyleUpdate = (field: keyof typeof details.textStyles, updates: Partial<{x: number, y: number, fontSize: number}>) => {
      setDetails(prev => ({
          ...prev,
          textStyles: {
              ...prev.textStyles,
              [field]: { ...prev.textStyles[field], ...updates }
          }
      }));
  };

  const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (!activeTextField) return;
      handleRecordHistory();
      const newColor = e.target.value;
      setDetails(prev => ({
        ...prev,
        textStyles: { ...prev.textStyles, [activeTextField]: { ...prev.textStyles[activeTextField], color: newColor } }
      }));
  };

  const adjustTextPosition = (dx: number, dy: number) => {
      if (!activeTextField) return;
      handleRecordHistory();
      handleManualStyleUpdate(activeTextField, {
          x: (details.textStyles[activeTextField].x || 0) + dx,
          y: (details.textStyles[activeTextField].y || 0) + dy
      });
  };

  const saveDraft = () => {
    try {
      localStorage.setItem('weddingCardDraft', JSON.stringify({ details, templateId: template.id }));
      setHasDraft(true);
      alert('Draft saved!');
    } catch (error) { console.error(error); alert('Failed to save draft.'); }
  };

  const loadDraft = () => {
    try {
      const savedDraft = localStorage.getItem('weddingCardDraft');
      if (savedDraft) {
        handleRecordHistory();
        const { details: savedDetails, templateId: savedTemplateId } = JSON.parse(savedDraft);
        setDetails(savedDetails);
        setTemplate(TEMPLATE_OPTIONS.find(t => t.id === savedTemplateId) || TEMPLATE_OPTIONS[0]);
        alert('Draft loaded!');
      } else alert('No draft found.');
    } catch (error) { console.error(error); alert('Failed to load draft.'); clearDraft(); }
  };

  const clearDraft = () => {
    try { localStorage.removeItem('weddingCardDraft'); setHasDraft(false); alert('Draft cleared.'); }
    catch (error) { console.error(error); }
  };

  // --- Drag & Press-to-Peek Logic for Mobile PIP ---
  const handleTouchStart = (e: React.TouchEvent) => {
    isDragging.current = true;
    
    const touch = e.touches[0];
    dragOffset.current = {
        x: touch.clientX - pipPos.x,
        y: touch.clientY - pipPos.y
    };

    // Start Long Press Timer for "Peek"
    longPressTimer.current = setTimeout(() => {
        setShowPeekPreview(true);
        // We don't change the tab, just show overlay
        isDragging.current = false; // Stop dragging if peek active
    }, 250); // Short delay for better responsiveness
  };

  const handleTouchMove = (e: React.TouchEvent) => {
      if (!isDragging.current) return;
      
      // If user moves finger significantly, cancel the peek timer
      if (longPressTimer.current) {
          clearTimeout(longPressTimer.current);
          longPressTimer.current = null;
      }

      const touch = e.touches[0];
      const newX = touch.clientX - dragOffset.current.x;
      const newY = touch.clientY - dragOffset.current.y;
      
      // Prevent browser scroll ONLY when dragging
      if (e.cancelable) e.preventDefault();
      
      setPipPos({
          x: newX,
          y: newY
      });
  };

  const handleTouchEnd = () => {
      isDragging.current = false;
      if (longPressTimer.current) {
          clearTimeout(longPressTimer.current);
          longPressTimer.current = null;
      }
      // Close peek immediately on release
      setShowPeekPreview(false);
  };

  const adjustPipScale = (delta: number) => {
      setPipScale(prev => Math.min(Math.max(prev + delta, 0.1), 0.4));
  };


  return (
    <div className="h-screen flex flex-col bg-gray-50 text-gray-800 font-sans overflow-hidden">
      <Header />
      <input type="color" ref={colorInputRef} className="hidden" style={{opacity: 0, position: 'absolute', pointerEvents: 'none'}} onChange={handleColorChange} />

      {/* Main Content Area - no-scrollbar added */}
      <main className="flex-1 flex flex-col xl:flex-row overflow-hidden relative pb-16 xl:pb-0 no-scrollbar">
          
          {/* DESKTOP: Left Panel (Controls) */}
          {/* MOBILE/TABLET: Visible only if mobileTab is 'content' or 'design' */}
          <div className={`${(mobileTab === 'content' || mobileTab === 'design') ? 'flex' : 'hidden'} xl:flex w-full xl:w-1/3 2xl:w-1/4 h-full flex-col z-20 shadow-xl overflow-hidden bg-white order-2 xl:order-1`}>
             <FormControls 
                details={details} 
                setDetails={setDetails} 
                currentTemplate={template}
                onOpenGallery={() => setShowGallery(true)}
                onDownload={handleDownload}
                onDownloadPDF={handleDownloadPDF}
                onSaveDraft={saveDraft}
                onLoadDraft={loadDraft}
                onClearDraft={clearDraft}
                hasDraft={hasDraft}
                onRecordChange={handleRecordHistory}
                // Mobile Props
                activeMobileTab={mobileTab === 'preview' ? 'content' : mobileTab}
                hideTabs={true} // Hide internal tabs, use bottom nav on mobile
                showPip={showPip}
                onTogglePip={() => setShowPip(!showPip)}
             />
          </div>

          {/* DESKTOP: Right Panel (Preview) */}
          {/* MOBILE/TABLET: Visible only if mobileTab is 'preview' */}
          <div className={`${mobileTab === 'preview' ? 'flex' : 'hidden'} xl:flex w-full xl:w-2/3 2xl:w-3/4 flex-col h-full overflow-hidden 
                ${mobileTab === 'preview' ? 'bg-gray-100' : 'bg-gray-100 xl:bg-[url("https://www.transparenttextures.com/patterns/cubes.png")]'}
                relative border-b xl:border-b-0 xl:border-l border-gray-300 order-1 xl:order-2`}>
              
              {/* Undo/Redo Controls */}
              <div className="absolute top-4 right-4 z-10 flex items-center gap-2">
                <div className="flex items-center gap-1 bg-white/90 backdrop-blur rounded-full shadow-lg border border-gray-200 p-1">
                   <button onClick={handleUndo} disabled={history.length === 0} className="p-1.5 rounded-full hover:bg-gray-100 disabled:opacity-30 text-gray-700"><Undo size={14} /></button>
                   <div className="w-px h-4 bg-gray-300"></div>
                   <button onClick={handleRedo} disabled={redoStack.length === 0} className="p-1.5 rounded-full hover:bg-gray-100 disabled:opacity-30 text-gray-700"><Redo size={14} /></button>
                </div>
                <div className="bg-white/90 backdrop-blur text-gray-800 text-xs px-3 py-1.5 rounded-full shadow-lg font-semibold border border-gray-200">HD Preview</div>
              </div>

              {/* Preview Container - Updated for Mobile/Tablet Centering */}
              <div className={`w-full h-full overflow-auto flex ${mobileTab === 'preview' ? 'items-center justify-center p-6 pb-32' : 'items-start justify-center pt-32 pb-20'} px-2 xl:px-4`}>
                <div className={`${mobileTab === 'preview' ? 'origin-center' : 'origin-top'} transform scale-[0.6] sm:scale-[0.7] md:scale-[0.85] xl:scale-100 transition-transform duration-300`}>
                   <CardPreview 
                        details={details} 
                        template={template} 
                        id="wedding-card-preview" 
                        onTextClick={handleTextClick} 
                        onUpdateTextStyle={handleManualStyleUpdate}
                        activeTextField={activeTextField}
                        isMoveMode={isMoveMode}
                   />
                </div>
              </div>
          </div>

          {/* FLOATING MINI PREVIEW (Mobile/Tablet Only - When Editing) */}
          {(mobileTab === 'content' || mobileTab === 'design') && showPip && (
              <div 
                className="xl:hidden fixed z-50 bg-white shadow-2xl rounded-lg border-2 border-white ring-1 ring-black/10 overflow-hidden"
                style={{ 
                    top: pipPos.y, 
                    left: pipPos.x,
                    width: `${530 * pipScale + 4}px`, // +4 for border
                    height: `${750 * pipScale + 24}px`, // +24 for header bar
                    transition: isDragging.current ? 'none' : 'all 0.1s ease-out',
                    touchAction: 'none' // CRITICAL: Prevents browser scrolling when dragging
                }}
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
              >
                 {/* Mini Header / Handle */}
                 <div className="bg-gray-100 h-6 flex items-center justify-between px-2 cursor-move border-b border-gray-200">
                    <div className="flex items-center gap-1">
                        <Move size={10} className="text-gray-400" />
                        <span className="text-[8px] text-gray-500 font-medium">Hold to View</span>
                    </div>
                    <div className="flex gap-2">
                        <button onTouchStart={(e) => { e.stopPropagation(); adjustPipScale(-0.02); }} className="p-0.5 bg-gray-200 rounded hover:bg-gray-300 text-gray-600"><ZoomOut size={10} /></button>
                        <button onTouchStart={(e) => { e.stopPropagation(); adjustPipScale(0.02); }} className="p-0.5 bg-gray-200 rounded hover:bg-gray-300 text-gray-600"><ZoomIn size={10} /></button>
                    </div>
                 </div>
                 <div className="w-[530px] origin-top-left pointer-events-none" style={{ transform: `scale(${pipScale})` }}>
                    <CardPreview details={details} template={template} />
                 </div>
              </div>
          )}

          {/* PEEK OVERLAY (Full Screen Preview on Hold) */}
          {showPeekPreview && (
              <div className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200" onTouchEnd={handleTouchEnd}>
                  <div className="transform scale-[0.65] sm:scale-[0.8] origin-center shadow-2xl pointer-events-none">
                     <CardPreview details={details} template={template} />
                  </div>
                  <div className="absolute bottom-10 text-white text-sm font-bold bg-black/50 px-4 py-2 rounded-full">
                      Release to Close
                  </div>
              </div>
          )}
          
          {/* TEXT EDITING TOOLBAR (Mobile Only - When Text Selected) */}
          {activeTextField && mobileTab === 'preview' && (
              <div className="xl:hidden fixed bottom-16 left-0 right-0 z-50 bg-white border-t border-gray-200 shadow-[0_-5px_15px_rgba(0,0,0,0.1)] p-3 animate-in slide-in-from-bottom-5">
                  <div className="flex items-center justify-between gap-2 max-w-md mx-auto">
                      <div className="flex items-center gap-2">
                          <button onClick={openColorPicker} className="flex flex-col items-center justify-center p-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700 w-12 h-12">
                              <Pencil size={18} />
                              <span className="text-[9px] mt-1 font-medium">Color</span>
                          </button>
                          
                          <button onClick={() => setIsMoveMode(!isMoveMode)} className={`flex flex-col items-center justify-center p-2 rounded-lg w-12 h-12 transition-colors ${isMoveMode ? 'bg-green-100 text-green-700 border border-green-300' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}>
                              <Move size={18} />
                              <span className="text-[9px] mt-1 font-medium">Move</span>
                          </button>
                      </div>

                      {/* Nudge Controls */}
                      <div className="flex items-center gap-1 bg-gray-100 p-1 rounded-lg">
                          <button onClick={() => adjustTextPosition(-2, 0)} className="p-2 rounded bg-white shadow-sm hover:bg-gray-50"><ArrowLeft size={16}/></button>
                          <div className="flex flex-col gap-1">
                              <button onClick={() => adjustTextPosition(0, -2)} className="p-2 rounded bg-white shadow-sm hover:bg-gray-50"><ArrowUp size={16}/></button>
                              <button onClick={() => adjustTextPosition(0, 2)} className="p-2 rounded bg-white shadow-sm hover:bg-gray-50"><ArrowDown size={16}/></button>
                          </div>
                          <button onClick={() => adjustTextPosition(2, 0)} className="p-2 rounded bg-white shadow-sm hover:bg-gray-50"><ArrowRight size={16}/></button>
                      </div>

                      <button onClick={() => { setActiveTextField(null); setIsMoveMode(false); }} className="flex flex-col items-center justify-center p-2 rounded-lg bg-red-600 text-white w-12 h-12 shadow-md">
                          <Check size={20} />
                          <span className="text-[9px] mt-1 font-medium">Done</span>
                      </button>
                  </div>
              </div>
          )}

      </main>

      {/* MOBILE/TABLET BOTTOM NAVIGATION */}
      <nav className="xl:hidden fixed bottom-0 left-0 w-full bg-white border-t border-gray-200 flex justify-around items-center z-50 shadow-lg pb-safe">
        <button onClick={() => setMobileTab('content')} className={`flex flex-col items-center justify-center w-full py-2 ${mobileTab === 'content' ? 'text-red-600' : 'text-gray-500'}`}>
          <FileEdit size={20} className="mb-1" />
          <span className="text-[10px] font-medium">Content</span>
        </button>
        <button onClick={() => setMobileTab('design')} className={`flex flex-col items-center justify-center w-full py-2 ${mobileTab === 'design' ? 'text-pink-600' : 'text-gray-500'}`}>
          <Palette size={20} className="mb-1" />
          <span className="text-[10px] font-medium">Design</span>
        </button>
        <button onClick={() => setMobileTab('preview')} className={`flex flex-col items-center justify-center w-full py-2 ${mobileTab === 'preview' ? 'text-blue-600' : 'text-gray-500'}`}>
          <Eye size={20} className="mb-1" />
          <span className="text-[10px] font-medium">Preview</span>
        </button>
      </nav>

      {/* Gallery Modal */}
      {showGallery && (
        <TemplateGallery 
          templates={TEMPLATE_OPTIONS}
          currentId={template.id}
          onSelect={(t) => {
            handleRecordHistory();
            setTemplate(t);
            setDetails(prev => ({
              ...prev,
              // AUTO-PHOTO LOGIC: Only set default photo for Split Cards if user hasn't uploaded one
              photo: (t.layout === 'split-left' || t.layout === 'split-right') 
                     ? (prev.photo || DEFAULT_COUPLE_PHOTO) 
                     : (t.hasPhoto ? prev.photo : undefined),
              
              decoration: { type: t.styles.decorativeElement || 'none', opacity: 1 },
              bottomBorder: { type: 'none', opacity: 1 },
              leftBorder: { type: 'none', opacity: 1 },
              rightBorder: { type: 'none', opacity: 1 },
              backgroundTexture: { type: 'none', opacity: 0.1 },
              photoStyle: { shape: 'circle', scale: 1, x: 0, y: 0 },
              customColors: undefined,
              textStyles: JSON.parse(JSON.stringify(INITIAL_DETAILS.textStyles)),
            }));
            setShowGallery(false);
          }}
          onClose={() => setShowGallery(false)}
          details={details}
        />
      )}
    </div>
  );
}