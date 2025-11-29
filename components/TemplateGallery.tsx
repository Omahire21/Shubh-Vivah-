import React, { useState, useRef, useEffect } from 'react';
import { TemplateConfig, WeddingDetails } from '../types';
import { X, Check, Search } from 'lucide-react';
import CardPreview from './CardPreview';

interface TemplateGalleryProps {
  templates: TemplateConfig[];
  currentId: string;
  onSelect: (template: TemplateConfig) => void;
  onClose: () => void;
  details: WeddingDetails;
}

const TemplateGallery: React.FC<TemplateGalleryProps> = ({ templates, currentId, onSelect, onClose, details }) => {
  const [searchQuery, setSearchQuery] = useState('');
  
  // Filter templates based on search query
  const filteredTemplates = templates.filter(t => 
    t.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    t.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Group by category for better browsing
  const categories = Array.from(new Set(filteredTemplates.map(t => t.category)));
  
  const [hoveredTemplate, setHoveredTemplate] = useState<TemplateConfig | null>(null);
  const floatingRef = useRef<HTMLDivElement>(null);

  // Track mouse movement to position the floating preview
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!floatingRef.current || !hoveredTemplate) return;

      // Preview scale
      const scale = 0.55;
      // Determine height dynamically for the floating preview too
      const isTall = hoveredTemplate.hasPhoto && details.photo && hoveredTemplate.layout === 'standard';
      const previewHeight = isTall ? 900 : 750;
      
      const width = 530 * scale; 
      const height = previewHeight * scale;
      const padding = 20;

      let x = e.clientX + padding;
      let y = e.clientY + padding;

      // Keep within viewport bounds
      if (x + width > window.innerWidth - 10) { // -10 for a small margin
        x = e.clientX - width - padding;
      }
      // If bottom overflows, flip to top
      if (y + height > window.innerHeight - 10) { // -10 for a small margin
        y = e.clientY - height - padding;
        // If top also overflows, clamp to top edge
        if (y < 10) y = 10; 
      }
      
      // Apply transform directly for position, CSS transition handles the smooth movement
      floatingRef.current.style.transform = `translate(${x}px, ${y}px)`;
    };

    // Only add mouse move listener on Desktop (width > 1024) to avoid issues on touch devices
    if (hoveredTemplate && window.innerWidth > 1024) {
      window.addEventListener('mousemove', handleMouseMove);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [hoveredTemplate, details.photo]); // Re-run effect if hoveredTemplate or photo changes

  // Create a "clean" version of details for previews
  const getCleanDetailsForPreview = (tmpl: TemplateConfig): WeddingDetails => {
    // Reset text styles (remove colors and offsets) for clean gallery preview
    const cleanStyles = { ...details.textStyles };
    (Object.keys(cleanStyles) as Array<keyof typeof cleanStyles>).forEach(k => {
        const current = cleanStyles[k];
        // Reset offsets to 0 and remove custom color for generic preview
        cleanStyles[k] = { ...current, x: 0, y: 0, color: undefined };
    });

    const defaultPreviewPhoto = "https://images.unsplash.com/photo-1621621667797-e06afc217fb0?q=80&w=2070&auto=format&fit=crop";
    
    // Logic: 
    // 1. If user uploaded a photo (details.photo exists), use it for any template that supports photos.
    // 2. If NO user photo, ONLY use default photo for Split Layouts (split-left/split-right).
    // This ensures only the "Divine Split" type cards show the default image, as requested.
    
    const isSplit = tmpl.layout === 'split-left' || tmpl.layout === 'split-right';
    const photoToUse = details.photo ? details.photo : (isSplit ? defaultPreviewPhoto : undefined);

    return {
      ...details,
      photo: photoToUse,
      
      // Reset decoration to template default
      decoration: {
        type: tmpl.styles.decorativeElement || 'none',
        opacity: 1
      },
      // Strip extra custom packs for the preview to show "native" look
      bottomBorder: { type: 'none', opacity: 1 },
      leftBorder: { type: 'none', opacity: 1 },
      rightBorder: { type: 'none', opacity: 1 },
      backgroundTexture: { type: 'none', opacity: 0.1 },
      // Show swastik if not paithani, for preview clarity, unless photo overlay/polaroid is active
      showSwastik: !(tmpl.category === 'Photo Cards' && tmpl.layout && ['full-overlay', 'polaroid'].includes(tmpl.layout)), 
      showAmpersand: false, // Don't show ampersand in native previews
      
      // CRITICAL: Force remove custom colors so previews show original template design
      customColors: undefined, 
      textStyles: cleanStyles,
    };
  };

  const handleTemplateSelect = (t: TemplateConfig) => {
      onSelect(t);
      // Alert user if they selected a photo card that ISN'T a split card (because split cards autoload)
      // and they don't have a photo uploaded yet.
      const isSplit = t.layout === 'split-left' || t.layout === 'split-right';
      if (t.hasPhoto && !isSplit && !details.photo) {
          // Use setTimeout to allow modal to close first
          setTimeout(() => {
             alert("✨ Great choice! You can add your couple photo to this design in the 'Content' tab.");
          }, 300);
      }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-2 lg:p-4 animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-7xl h-[95vh] rounded-2xl shadow-2xl flex flex-col overflow-hidden relative">
        
        {/* Header */}
        <div className="p-4 lg:p-6 border-b border-gray-200 flex flex-col lg:flex-row justify-between items-start lg:items-center bg-white z-10 gap-4">
          <div>
            <h2 className="text-xl lg:text-2xl font-bold text-gray-800">Select Design</h2>
            <p className="text-xs lg:text-sm text-gray-500">Choose from {templates.length} unique designs</p>
          </div>
          
          <div className="flex items-center gap-2 w-full lg:w-auto">
            <div className="relative w-full lg:w-64">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search size={18} className="text-gray-400" />
                </div>
                <input
                    type="text"
                    placeholder="Search templates..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg leading-5 bg-gray-50 placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:border-pink-500 focus:ring-1 focus:ring-pink-500 sm:text-sm"
                />
            </div>
            <button 
                onClick={onClose}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors ml-2"
            >
                <X size={24} className="text-gray-600" />
            </button>
          </div>
        </div>

        {/* Grid Content */}
        <div className="flex-1 overflow-y-auto p-4 lg:p-8 bg-gray-100 relative no-scrollbar">
           {categories.length > 0 ? (
               categories.map(category => (
                 <div key={category} className="mb-8">
                   <h3 className="text-lg font-bold text-gray-700 mb-4 px-2 border-l-4 border-pink-500 pl-3">{category} Designs</h3>
                   {/* Responsive Grid Layout: 3 cols mobile, 3 tablet, 5 desktop */}
                   <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 lg:gap-6">
                     {filteredTemplates.filter(t => t.category === category).map(t => {
                       const isTall = t.hasPhoto && details.photo && t.layout === 'standard';
                       const previewHeight = isTall ? 900 : 750;
                       
                       return (
                       <button
                         key={t.id}
                         onClick={() => handleTemplateSelect(t)}
                         onMouseEnter={() => setHoveredTemplate(t)}
                         onMouseLeave={() => setHoveredTemplate(null)}
                         className={`group relative rounded-lg shadow-sm hover:shadow-2xl transition-all duration-300 overflow-hidden text-left bg-gray-200 flex flex-col ${currentId === t.id ? 'ring-2 lg:ring-4 ring-pink-500 scale-[1.02]' : 'hover:scale-105'}`}
                       >
                         {/* 
                             Thumbnail Preview Container
                             Scale calculation ensures the card fits within the box
                         */}
                         <div className="relative w-full aspect-[530/750] overflow-hidden bg-gray-50 flex items-center justify-center">
                            <div className="transform scale-[0.22] sm:scale-[0.28] md:scale-[0.35] lg:scale-[0.4] origin-center flex-shrink-0" style={{width: 530, height: previewHeight}}>
                               <CardPreview 
                                  details={getCleanDetailsForPreview(t)} 
                                  template={t}
                                  id={`thumb-${t.id}`} // Unique ID prevents conflict
                               />
                            </div>
                         </div>
                         
                         {/* Overlay Label on hover/always on mobile */}
                         <div className="w-full p-2 bg-white border-t border-gray-100 z-10">
                            <div className="font-semibold text-[10px] lg:text-sm text-gray-800 truncate text-center">{t.name}</div>
                         </div>

                         {/* Selected Indicator */}
                         {currentId === t.id && (
                           <div className="absolute top-2 right-2 bg-pink-500 text-white p-1 rounded-full shadow-md z-10">
                             <Check size={14} />
                           </div>
                         )}
                       </button>
                     )})}
                   </div>
                 </div>
               ))
           ) : (
               <div className="flex flex-col items-center justify-center h-full text-gray-500">
                   <p className="text-lg">No templates found matching "{searchQuery}"</p>
               </div>
           )}
        </div>

        {/* Floating Live Preview (Desktop Only) */}
        <div 
            ref={floatingRef}
            className="hidden lg:block fixed top-0 left-0 z-[100] pointer-events-none transition-opacity duration-150 ease-out"
            style={{ 
                willChange: 'transform', 
                opacity: hoveredTemplate ? 1 : 0, 
                transition: 'transform 0.05s ease-out, opacity 0.15s ease-out'
            }} 
        >
            <div className="bg-white p-2 rounded-xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] border-2 border-white ring-1 ring-black/10">
                <div 
                  style={{ 
                      width: 292, // 530 * 0.55
                      height: (hoveredTemplate?.hasPhoto && details.photo && hoveredTemplate?.layout === 'standard' ? 900 : 750) * 0.55 
                  }} 
                  className="bg-gray-50 overflow-hidden rounded-lg relative"
                >
                    <div className="w-[530px] origin-top-left transform scale-[0.55]">
                        {hoveredTemplate && (
                            <CardPreview 
                                details={getCleanDetailsForPreview(hoveredTemplate)} 
                                template={hoveredTemplate} 
                            />
                        )}
                    </div>
                </div>
                
                <div className="absolute bottom-4 left-0 right-0 text-center">
                    <span className="bg-black/75 text-white text-[10px] px-3 py-1 rounded-full backdrop-blur-md font-medium tracking-wide shadow-sm">
                        {hoveredTemplate?.name}
                    </span>
                </div>
            </div>
        </div>

      </div>
    </div>
  );
};

export default TemplateGallery;