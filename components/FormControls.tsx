import React, { useRef, useState, useEffect } from 'react';
import { WeddingDetails, INITIAL_DETAILS, ENGLISH_DETAILS, TemplateConfig, DecorativeElement, BottomBorderType, BackgroundTextureType, SideBorderType, CustomColors } from '../types';
import { Palette, Users, Type, Download, Languages, Sparkles, LayoutGrid, ImageIcon, Upload, MessageSquareQuote, Move, ZoomIn, ZoomOut, Circle, Square, MoveUp, MoveDown, MoveLeft, MoveRight, Minus, Plus, Clock, Contact, MapPin, Sliders, Layers, Columns, Star, Save, FolderOpen, Trash2, FileText, PaintBucket, RefreshCcw, Printer, IndianRupee, ChevronDown, ChevronUp, HeartHandshake, CalendarDays, MapPinned, AlignVerticalJustifyCenter, AlignHorizontalJustifyCenter, PanelBottom, PictureInPicture2 } from 'lucide-react';
import { COLOR_PALETTES } from '../data/colorPalettes';

interface FormControlsProps {
  details: WeddingDetails;
  setDetails: React.Dispatch<React.SetStateAction<WeddingDetails>>;
  currentTemplate: TemplateConfig;
  onOpenGallery: () => void;
  onDownload: () => void;
  onDownloadPDF: () => void;
  onSaveDraft: () => void;
  onLoadDraft: () => void;
  onClearDraft: () => void;
  hasDraft: boolean;
  onRecordChange: () => void;
  activeMobileTab?: 'content' | 'design'; // Control tab from parent on mobile
  hideTabs?: boolean; // Hide internal tabs if controlled externally
  showPip?: boolean;
  onTogglePip?: () => void;
}

const FormControls: React.FC<FormControlsProps> = ({
  details,
  setDetails,
  currentTemplate,
  onOpenGallery,
  onDownload,
  onDownloadPDF,
  onSaveDraft,
  onLoadDraft,
  onClearDraft,
  hasDraft,
  onRecordChange,
  activeMobileTab,
  hideTabs = false,
  showPip = true,
  onTogglePip
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [activeTab, setActiveTab] = useState<'content' | 'design'>('content');
  
  // Sync external tab state (for mobile nav)
  useEffect(() => {
    if (activeMobileTab) {
        setActiveTab(activeMobileTab);
    }
  }, [activeMobileTab]);

  // --- Razorpay Payment Logic ---
  const handlePayment = (onSuccess: () => void) => {
    if (typeof (window as any).Razorpay === 'undefined') {
        alert("Payment gateway failed to load. Please check your internet connection.");
        return;
    }

    const options = {
        "key": "rzp_test_Rl93ao9CqHy9Qv",
        "amount": "4900", // ₹49
        "currency": "INR",
        "name": "Shubh Vivah",
        "description": "Premium Wedding Card Export",
        "image": "https://cdn-icons-png.flaticon.com/512/3656/3656988.png",
        "handler": function (response: any) {
            onSuccess();
        },
        "prefill": {
            "name": details.groomName || "User Name",
            "contact": ""
        },
        "theme": {
            "color": "#db2777"
        },
        "modal": {
            "ondismiss": function(){ console.log('Checkout form closed'); }
        }
    };

    try {
        const rzp1 = new (window as any).Razorpay(options);
        rzp1.open();
        rzp1.on('payment.failed', function (response: any){
            alert("Payment Failed. Reason: " + response.error.description);
        });
    } catch (error) {
        console.error("Razorpay Error:", error);
        if (confirm("Razorpay Key is missing or invalid in code. \n\nClick OK to simulate a successful payment for Demo purposes.")) {
            onSuccess();
        }
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setDetails((prev) => ({ ...prev, [name]: value }));
  };

  const toggleLanguage = (lang: 'marathi' | 'english') => {
    onRecordChange();
    if (lang === 'marathi') {
      setDetails(prev => ({ 
          ...prev, 
          ...INITIAL_DETAILS, 
          textStyles: prev.textStyles, 
          photoStyle: prev.photoStyle, 
          photo: prev.photo,
          decoration: prev.decoration,
          bottomBorder: prev.bottomBorder,
          leftBorder: prev.leftBorder,
          rightBorder: prev.rightBorder,
          backgroundTexture: prev.backgroundTexture,
          showSwastik: prev.showSwastik, 
          showAmpersand: prev.showAmpersand,
          customColors: prev.customColors,
      }));
    } else {
      setDetails(prev => ({ 
          ...prev, 
          ...ENGLISH_DETAILS, 
          textStyles: prev.textStyles, 
          photoStyle: prev.photoStyle, 
          photo: prev.photo, 
          decoration: prev.decoration,
          bottomBorder: prev.bottomBorder,
          leftBorder: prev.leftBorder,
          rightBorder: prev.rightBorder,
          backgroundTexture: prev.backgroundTexture,
          showSwastik: prev.showSwastik, 
          showAmpersand: prev.showAmpersand,
          customColors: prev.customColors,
      }));
    }
  };

  const isEnglish = details.headline.includes("Shree");

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onRecordChange();
      const imageUrl = URL.createObjectURL(file);
      setDetails(prev => ({ ...prev, photo: imageUrl }));
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  // --- Style Helpers ---
  const updateTextStyle = (field: keyof typeof details.textStyles, prop: 'fontSize' | 'x' | 'y' | 'color', value: number | string) => {
    onRecordChange();
    setDetails(prev => {
      const currentStyle = prev.textStyles[field];
      let updatedValue: number | string | undefined;

      if (prop === 'fontSize' || prop === 'x' || prop === 'y') {
        updatedValue = (currentStyle[prop] as number || 0) + (value as number);
      } else if (prop === 'color') {
        updatedValue = value as string;
      }

      return {
        ...prev,
        textStyles: { ...prev.textStyles, [field]: { ...currentStyle, [prop]: updatedValue } }
      };
    });
  };

  const updatePhotoStyle = (type: 'scale' | 'x' | 'y', change: number) => {
    onRecordChange();
    setDetails(prev => ({
      ...prev,
      photoStyle: { ...prev.photoStyle, [type]: prev.photoStyle[type] + change }
    }));
  };

  const setPhotoShape = (shape: 'circle' | 'square' | 'rounded') => {
    onRecordChange();
    setDetails(prev => ({ ...prev, photoStyle: { ...prev.photoStyle, shape } }));
  };

  const updateDecoration = (type: DecorativeElement) => {
    setDetails(prev => ({ ...prev, decoration: { ...prev.decoration, type } }));
  };

  const updateDecorOpacity = (opacity: number) => {
    setDetails(prev => ({ ...prev, decoration: { ...prev.decoration, opacity } }));
  };

  const updateTexture = (type: BackgroundTextureType) => {
    setDetails(prev => ({ ...prev, backgroundTexture: { ...prev.backgroundTexture, type } }));
  };

  const updateTextureOpacity = (opacity: number) => {
    setDetails(prev => ({ ...prev, backgroundTexture: { ...prev.backgroundTexture, opacity } }));
  };
  
  const updateBottomBorder = (type: BottomBorderType) => {
      setDetails(prev => ({ ...prev, bottomBorder: { ...prev.bottomBorder, type } }));
  };

  const updateLeftBorder = (type: SideBorderType) => {
      setDetails(prev => ({ ...prev, leftBorder: { ...prev.leftBorder, type } }));
  };

  const updateRightBorder = (type: SideBorderType) => {
      setDetails(prev => ({ ...prev, rightBorder: { ...prev.rightBorder, type } }));
  };

  // Mutually Exclusive Symbol Selection
  const setSymbol = (type: 'swastik' | 'ampersand' | 'none') => {
      onRecordChange();
      setDetails(prev => ({
          ...prev,
          showSwastik: type === 'swastik',
          showAmpersand: type === 'ampersand'
      }));
  };

  const applyColorPalette = (palette: CustomColors) => {
    onRecordChange();
    setDetails(prev => {
      const newTextStyles = { ...prev.textStyles };
      const setCol = (field: keyof typeof newTextStyles, col: string) => {
          newTextStyles[field] = { ...newTextStyles[field], color: col };
      };
      const bodyTextFields: (keyof typeof newTextStyles)[] = [
          'brideName', 'groomName', 'brideParents', 'groomParents', 
          'message', 'ceremonyDetails', 'venueName', 'venueAddress', 'rsvp'
      ];
      bodyTextFields.forEach(f => setCol(f, palette.text));
      const highlightFields: (keyof typeof newTextStyles)[] = [
          'headline', 'subHeading', 'venueTitle', 'swastikSymbol', 'ampersandSymbol'
      ];
      highlightFields.forEach(f => setCol(f, palette.highlight));
      return {
        ...prev,
        customColors: palette,
        textStyles: newTextStyles
      };
    });
  };

  const resetColors = () => {
    onRecordChange();
    setDetails(prev => {
        const { customColors, ...rest } = prev;
        const resetTextStyles = { ...prev.textStyles };
        (Object.keys(resetTextStyles) as Array<keyof typeof resetTextStyles>).forEach(key => {
            resetTextStyles[key] = { ...resetTextStyles[key], color: undefined };
        });
        return { ...rest, textStyles: resetTextStyles };
    });
  };

  const handlePrint = () => {
    setTimeout(() => { window.print(); }, 100);
  };

  const StyleToolbar = ({ field }: { field: keyof typeof details.textStyles }) => (
    <div className="flex items-center gap-2 mt-1 bg-gray-800 p-1.5 rounded-md border border-gray-600">
       <div className="flex items-center border-r border-gray-600 pr-2 gap-1">
          <button onClick={() => updateTextStyle(field, 'fontSize', -0.1)} className="p-1 hover:bg-gray-700 rounded text-gray-300"><Minus size={12}/></button>
          <Type size={12} className="text-pink-500" />
          <button onClick={() => updateTextStyle(field, 'fontSize', 0.1)} className="p-1 hover:bg-gray-700 rounded text-gray-300"><Plus size={12}/></button>
       </div>
       <div className="flex items-center gap-1">
          <button onClick={() => updateTextStyle(field, 'x', -5)} className="p-1 hover:bg-gray-700 rounded text-gray-300"><MoveLeft size={12}/></button>
          <button onClick={() => updateTextStyle(field, 'y', -5)} className="p-1 hover:bg-gray-700 rounded text-gray-300"><MoveUp size={12}/></button>
          <button onClick={() => updateTextStyle(field, 'y', 5)} className="p-1 hover:bg-gray-700 rounded text-gray-300"><MoveDown size={12}/></button>
          <button onClick={() => updateTextStyle(field, 'x', 5)} className="p-1 hover:bg-gray-700 rounded text-gray-300"><MoveRight size={12}/></button>
       </div>
    </div>
  );

  const decorativeOptions: { label: string; value: DecorativeElement }[] = [
    { label: 'None', value: 'none' },
    { label: 'Lanterns Hanging', value: 'lanterns-hanging' },
    { label: 'Toran (Garland)', value: 'toran' },
    { label: 'Mandala', value: 'mandala' },
    { label: 'Royal Arch', value: 'royal-arch' },
    { label: 'Royal Pillars', value: 'royal-pillars' },
    { label: 'Fort Silhouette', value: 'fort-silhouette' },
    { label: 'Paithani Border', value: 'paithani-border' },
    { label: 'Floral Corner', value: 'floral-corner' },
    { label: 'Floral Wreath', value: 'floral-wreath' },
    { label: 'Vertical Border', value: 'vertical-border' },
    { label: 'Half Mandala', value: 'half-mandala-side' },
    { label: 'Gatefold Lattice', value: 'gatefold-lattice' },
    { label: 'Geometric', value: 'geometric-diagonal' },
    { label: 'Damask Pattern', value: 'damask-pattern' },
    { label: 'Islamic Pattern', value: 'islamic-pattern' },
    { label: 'Silk Texture', value: 'silk-texture' },
  ];

  const bottomBorderOptions: { label: string; value: BottomBorderType }[] = [
      { label: 'None', value: 'none' },
      { label: 'Lanterns Border', value: 'lanterns-border' },
      { label: 'Simple Gold', value: 'simple-gold' },
      { label: 'Double Gold', value: 'double-gold' },
      { label: 'Ornate Gold', value: 'ornate-gold' },
      { label: 'Floral Vine', value: 'floral-vine' },
      { label: 'Mango Paisley', value: 'mango-paisley' },
      { label: 'Lotus Row', value: 'lotus-row' },
      { label: 'Elephants', value: 'elephants' },
      { label: 'Diyas', value: 'diyas' },
      { label: 'Kalash', value: 'kalash' },
      { label: 'Om Pattern', value: 'om-pattern' },
      { label: 'Swastik Row', value: 'swastik-row' },
      { label: 'Ganesha Row', value: 'ganesha-row' },
      { label: 'Shehnai', value: 'shehnai' },
      { label: 'Wedding Dhol', value: 'wedding-dhol' },
      { label: 'Hanging Bells', value: 'hanging-bells' },
      { label: 'Temple Spire', value: 'temple-spire' },
      { label: 'Rangoli', value: 'rangoli' },
      { label: 'Abstract Waves', value: 'abstract-waves' },
      { label: 'Dot Mandala', value: 'dot-mandala' },
      { label: 'Leafy Scroll', value: 'leafy-scroll' },
      { label: 'Royal Fence', value: 'royal-fence' },
      { label: 'Marigold Garland', value: 'marigold-garland' },
      { label: 'Starry Night', value: 'starry-night' },
      { label: 'Hearts Row', value: 'hearts-row' },
      { label: 'Geometric Diamonds', value: 'geometric-diamonds' },
  ];

  const sideBorderOptions: { label: string; value: SideBorderType }[] = [
      { label: 'None', value: 'none' },
      { label: 'Simple Line Gold', value: 'simple-line-gold' },
      { label: 'Ornate Pillar', value: 'ornate-pillar' },
      { label: 'Floral Creeper', value: 'floral-creeper' },
      { label: 'Mango Motif', value: 'mango-motif-stack' },
      { label: 'Elephant', value: 'elephant-trumpeting' },
      { label: 'Lotus Stack', value: 'lotus-stack' },
      { label: 'Diya Stack', value: 'diya-stack' },
      { label: 'Hanging Bells', value: 'bells-hanging-side' },
      { label: 'Lattice Strip', value: 'lattice-strip' },
      { label: 'Royal Sword', value: 'royal-sword' },
      { label: 'Shehnai', value: 'shehnai-vertical' },
      { label: 'Wedding Knot', value: 'wedding-knot' },
      { label: 'Kalash Stack', value: 'kalash-stack' },
      { label: 'Geometric Zigzag', value: 'geometric-zigzag' },
      { label: 'Leafy Branch', value: 'leafy-branch' },
      { label: 'Star String', value: 'star-string' },
      { label: 'Heart String', value: 'heart-string' },
      { label: 'Marigold String', value: 'marigold-string' },
      { label: 'Abstract Curves', value: 'abstract-curves' },
      { label: 'Dot Line', value: 'dot-line' },
  ];

  const textureOptions: { label: string; value: BackgroundTextureType }[] = [
      { label: 'None', value: 'none' },
      { label: 'Paper', value: 'paper' },
      { label: 'Canvas', value: 'canvas' },
      { label: 'Silk', value: 'silk' },
      { label: 'Damask', value: 'damask' },
      { label: 'Islamic', value: 'islamic' },
      { label: 'Mandala', value: 'mandala' },
      { label: 'Floral', value: 'floral' },
      { label: 'Dots', value: 'dots' },
      { label: 'Lines', value: 'lines' },
      { label: 'Grunge', value: 'grunge' },
      { label: 'Marble', value: 'marble' },
      { label: 'Wood', value: 'wood' },
      { label: 'Stars', value: 'stars' },
      { label: 'Hearts', value: 'hearts' },
      { label: 'Glitter', value: 'glitter' },
      { label: 'Geometric', value: 'geometric' },
      { label: 'Waves', value: 'waves' },
      { label: 'Checkered', value: 'checkered' },
      { label: 'Honeycomb', value: 'honeycomb' },
      { label: 'Lanterns', value: 'lanterns-pattern' },
      { label: 'Floral Outline', value: 'floral-outline' },
      { label: 'Rose Bloom', value: 'rose-bloom' },
      { label: 'Lotus Petals', value: 'lotus-petals' },
      { label: 'Vine Leaves', value: 'vine-leaves' },
      { label: 'Peony Garden', value: 'peony-garden' },
  ];

  const SectionHeader = ({ icon, title, colorClass }: { icon: React.ReactNode, title: string, colorClass: string }) => (
      <div className={`flex items-center gap-2 p-2 rounded-lg mb-2 border-l-4 ${colorClass} bg-gray-50 shadow-sm`}>
          {icon}
          <h3 className="text-sm font-bold text-gray-700 uppercase">{title}</h3>
      </div>
  );

  return (
    <div className="bg-white rounded-none h-full flex flex-col border-r border-gray-200 shadow-xl overflow-hidden">
      
      {/* Sidebar Header & Tabs */}
      <div className="flex-none bg-white border-b border-gray-200">
          <div className="flex p-3 lg:p-4 items-center justify-between border-b border-gray-100">
             <h2 className="text-lg lg:text-xl font-bold flex items-center gap-2 text-red-700">
                 <Sparkles className="text-yellow-500" size={20} /> Controls
             </h2>
             <div className="flex items-center gap-2">
                {/* Mobile PiP Toggle with Label */}
                {onTogglePip && (
                    <button 
                        onClick={onTogglePip}
                        className={`xl:hidden p-1.5 px-2 rounded-md border transition-colors flex items-center gap-1.5 ${showPip ? 'bg-blue-50 text-blue-600 border-blue-200' : 'bg-gray-50 text-gray-400 border-gray-200'}`}
                        title="Floating Window"
                    >
                        <PictureInPicture2 size={18} />
                        <span className="text-[10px] font-bold hidden sm:inline leading-none">Floating Window</span>
                    </button>
                )}
                <div className="flex bg-gray-100 rounded-lg p-1 border border-gray-200">
                    <button onClick={() => { if(isEnglish) toggleLanguage('marathi'); }} className={`px-3 py-1 text-xs font-bold rounded-md transition-all ${!isEnglish ? 'bg-white text-red-600 shadow-sm ring-1 ring-black/5' : 'text-gray-500 hover:text-gray-700'}`}>Marathi</button>
                    <button onClick={() => { if(!isEnglish) toggleLanguage('english'); }} className={`px-3 py-1 text-xs font-bold rounded-md transition-all ${isEnglish ? 'bg-white text-blue-600 shadow-sm ring-1 ring-black/5' : 'text-gray-500 hover:text-gray-700'}`}>English</button>
                </div>
             </div>
          </div>
          
          {/* Hide tabs if controlled externally (Mobile Navigation) */}
          {!hideTabs && (
              <div className="flex">
                 <button onClick={() => setActiveTab('content')} className={`flex-1 py-3 text-sm font-semibold flex items-center justify-center gap-2 border-b-2 transition-colors ${activeTab === 'content' ? 'border-red-600 text-red-600 bg-red-50' : 'border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-50'}`}><Type size={16}/> Content</button>
                 <button onClick={() => setActiveTab('design')} className={`flex-1 py-3 text-sm font-semibold flex items-center justify-center gap-2 border-b-2 transition-colors ${activeTab === 'design' ? 'border-pink-600 text-pink-600 bg-pink-50' : 'border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-50'}`}><Palette size={16}/> Design</button>
              </div>
          )}
      </div>

      {/* Scrollable Content Area - no-scrollbar class added for mobile */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6 no-scrollbar">
          {activeTab === 'content' && (
             <div className="space-y-6 animate-in slide-in-from-left-4 duration-300 pb-20 lg:pb-0">
                
                {/* 1. Couple Details Section */}
                <div className="space-y-3 border-b border-gray-100 pb-4">
                    <SectionHeader icon={<HeartHandshake size={16} className="text-pink-600"/>} title="Couple Details" colorClass="border-pink-500" />
                    
                    <div>
                        <label className="block text-xs font-bold text-gray-400 uppercase mb-1">Top Headline</label>
                        <input type="text" name="headline" value={details.headline} onChange={handleChange} className="w-full p-2 bg-white text-gray-800 border border-gray-300 rounded focus:ring-1 focus:ring-red-500 outline-none text-center font-medium text-xs" />
                        <StyleToolbar field="headline" />
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                        <div><label className="block text-xs font-bold text-gray-400 uppercase mb-1">Groom Name</label><input type="text" name="groomName" value={details.groomName} onChange={handleChange} className="w-full p-2 bg-white text-gray-800 border border-gray-300 rounded focus:ring-1 focus:ring-red-500 outline-none text-xs" /><StyleToolbar field="groomName" /></div>
                        <div><label className="block text-xs font-bold text-gray-400 uppercase mb-1">Bride Name</label><input type="text" name="brideName" value={details.brideName} onChange={handleChange} className="w-full p-2 bg-white text-gray-800 border border-gray-300 rounded focus:ring-1 focus:ring-red-500 outline-none text-xs" /><StyleToolbar field="brideName" /></div>
                    </div>
                </div>

                {/* 2. Family Info */}
                <div className="space-y-3 border-b border-gray-100 pb-4">
                    <SectionHeader icon={<Users size={16} className="text-blue-600"/>} title="Family Info" colorClass="border-blue-500" />
                    <div><label className="block text-xs font-bold text-gray-400 uppercase mb-1">Groom's Parents</label><textarea name="groomParents" value={details.groomParents} onChange={handleChange} rows={2} className="w-full p-2 bg-white text-gray-800 border border-gray-300 rounded focus:ring-1 focus:ring-red-500 outline-none text-xs" /><StyleToolbar field="groomParents" /></div>
                    <div><label className="block text-xs font-bold text-gray-400 uppercase mb-1">Bride's Parents</label><textarea name="brideParents" value={details.brideParents} onChange={handleChange} rows={2} className="w-full p-2 bg-white text-gray-800 border border-gray-300 rounded focus:ring-1 focus:ring-red-500 outline-none text-xs" /><StyleToolbar field="brideParents" /></div>
                </div>

                {/* 3. Event Details */}
                <div className="space-y-3 border-b border-gray-100 pb-4">
                    <SectionHeader icon={<CalendarDays size={16} className="text-amber-600"/>} title="Event Details" colorClass="border-amber-500" />
                    <div><label className="block text-xs font-bold text-gray-400 uppercase mb-1">Event Sub-Heading</label><input type="text" name="subHeading" value={details.subHeading} onChange={handleChange} className="w-full p-2 bg-white text-gray-800 border border-gray-300 rounded focus:ring-1 focus:ring-red-500 outline-none text-center text-xs" /><StyleToolbar field="subHeading" /></div>
                    <div><label className="block text-xs font-bold text-gray-400 uppercase mb-1">Main Message</label><textarea name="message" value={details.message} onChange={handleChange} rows={3} className="w-full p-2 bg-white text-gray-800 border border-gray-300 rounded focus:ring-1 focus:ring-red-500 outline-none text-xs" /><StyleToolbar field="message" /></div>
                    <div><label className="block text-xs font-bold text-gray-400 uppercase mb-1">Other Ceremonies</label><textarea name="ceremonyDetails" value={details.ceremonyDetails} onChange={handleChange} rows={2} className="w-full p-2 bg-white text-gray-800 border border-gray-300 rounded focus:ring-1 focus:ring-red-500 outline-none text-xs" /><StyleToolbar field="ceremonyDetails" /></div>
                </div>

                {/* 4. Venue & RSVP */}
                <div className="space-y-3">
                    <SectionHeader icon={<MapPinned size={16} className="text-green-600"/>} title="Venue & RSVP" colorClass="border-green-500" />
                    <div><label className="block text-xs font-bold text-gray-400 uppercase mb-1">Venue Title</label><input type="text" name="venueTitle" value={details.venueTitle} onChange={handleChange} className="w-full p-2 bg-white text-gray-800 border border-gray-300 rounded focus:ring-1 focus:ring-red-500 outline-none text-xs" /><StyleToolbar field="venueTitle" /></div>
                    <div><label className="block text-xs font-bold text-gray-400 uppercase mb-1">Venue Name</label><textarea name="venueName" value={details.venueName} onChange={handleChange} rows={2} className="w-full p-2 bg-white text-gray-800 border border-gray-300 rounded focus:ring-1 focus:ring-red-500 outline-none text-xs" /><StyleToolbar field="venueName" /></div>
                    <div><label className="block text-xs font-bold text-gray-400 uppercase mb-1">Venue Address</label><textarea name="venueAddress" value={details.venueAddress} onChange={handleChange} rows={2} className="w-full p-2 bg-white text-gray-800 border border-gray-300 rounded focus:ring-1 focus:ring-red-500 outline-none text-xs" /><StyleToolbar field="venueAddress" /></div>
                    <div className="pt-2 border-t border-gray-100"><label className="block text-xs font-bold text-gray-400 uppercase mb-1">RSVP / Invitee</label><textarea name="rsvp" value={details.rsvp} onChange={handleChange} rows={2} className="w-full p-2 bg-white text-gray-800 border border-gray-300 rounded focus:ring-1 focus:ring-red-500 outline-none text-xs" /><StyleToolbar field="rsvp" /></div>
                </div>

             </div>
          )}

          {activeTab === 'design' && (
             <div className="space-y-6 animate-in slide-in-from-right-4 duration-300 pb-20 lg:pb-0">
                <section>
                  <div className="flex justify-between items-center mb-2"><h2 className="flex items-center gap-2 text-sm font-bold text-gray-500 uppercase tracking-wider"><LayoutGrid size={16} className="text-pink-600" /> Current Template</h2></div>
                  <button onClick={onOpenGallery} className="w-full h-24 rounded-lg border-2 border-dashed border-gray-300 hover:border-pink-500 hover:bg-pink-50 transition-all flex flex-col items-center justify-center gap-2 group"><div className="p-3 bg-pink-100 text-pink-600 rounded-full group-hover:scale-110 transition-transform"><LayoutGrid size={24} /></div><span className="text-sm font-semibold text-gray-600 group-hover:text-pink-700">Change Design (150+)</span></button>
                </section>

                {/* Upload Photo Moved Here */}
                {(currentTemplate.hasPhoto || currentTemplate.category === 'Photo Cards' || currentTemplate.category === 'Marathi') && (
                    <div className="bg-blue-50 p-3 rounded-lg border border-blue-100">
                        <label className="block text-xs font-semibold text-blue-800 uppercase mb-2 flex items-center gap-1"><ImageIcon size={14}/> Couple Photo</label>
                        <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handlePhotoUpload} />
                        <button onClick={triggerFileInput} className="w-full py-2 bg-white text-blue-600 border border-blue-200 rounded hover:bg-blue-50 flex items-center justify-center gap-2 transition-colors text-sm font-medium"><Upload size={14} /> {details.photo ? 'Change Photo' : 'Upload Photo'}</button>
                        {details.photo && (
                            <div className="mt-3 bg-white p-2 rounded border border-blue-100 space-y-2">
                                <div className="flex justify-between items-center"><span className="text-xs font-bold text-gray-500">Frame</span><div className="flex gap-1"><button onClick={() => setPhotoShape('circle')} className="p-1 rounded hover:bg-gray-100"><Circle size={14}/></button><button onClick={() => setPhotoShape('square')} className="p-1 rounded hover:bg-gray-100"><Square size={14}/></button><button onClick={() => setPhotoShape('rounded')} className="p-1 rounded hover:bg-gray-100"><Square size={14} className="rounded-sm"/></button></div></div>
                                <div className="flex justify-between items-center"><span className="text-xs font-bold text-gray-500">Zoom</span><div className="flex gap-1"><button onClick={() => updatePhotoStyle('scale', -0.1)} className="p-1 hover:bg-gray-100"><ZoomOut size={14}/></button><button onClick={() => updatePhotoStyle('scale', 0.1)} className="p-1 hover:bg-gray-100"><ZoomIn size={14}/></button></div></div>
                                <div className="flex justify-between items-center"><span className="text-xs font-bold text-gray-500">Move</span><div className="flex gap-1"><button onClick={() => updatePhotoStyle('x', -5)} className="p-1 hover:bg-gray-100"><MoveLeft size={14}/></button><button onClick={() => updatePhotoStyle('y', -5)} className="p-1 hover:bg-gray-100"><MoveUp size={14}/></button><button onClick={() => updatePhotoStyle('y', 5)} className="p-1 hover:bg-gray-100"><MoveDown size={14}/></button><button onClick={() => updatePhotoStyle('x', 5)} className="p-1 hover:bg-gray-100"><MoveRight size={14}/></button></div></div>
                            </div>
                        )}
                    </div>
                )}

                <section className="bg-pink-50 p-4 rounded-lg border border-pink-100 space-y-3">
                   <div className="flex justify-between items-center mb-1"><h2 className="flex items-center gap-2 text-xs font-bold text-pink-800 uppercase"><PaintBucket size={14} /> Smart Palettes</h2><button onClick={resetColors} className="text-xs text-gray-500 hover:text-red-600 flex items-center gap-1" title="Reset"><RefreshCcw size={10} /> Reset</button></div>
                   <div className="grid grid-cols-5 gap-2">{COLOR_PALETTES.map((palette) => (<button key={palette.id} onClick={() => applyColorPalette(palette.colors)} className="group relative flex flex-col items-center gap-1"><div className="w-10 h-10 rounded-full overflow-hidden border-2 border-white shadow-md group-hover:scale-110 transition-transform flex flex-col"><div className="h-full w-full relative" style={{ backgroundColor: palette.colors.background }}><div className="absolute inset-0 flex items-center justify-center"><span className="text-[10px] font-bold" style={{color: palette.colors.highlight}}>A</span></div></div></div><span className="text-[9px] text-gray-600 truncate w-full text-center">{palette.name.split(' ')[0]}</span></button>))}</div>
                </section>

                <section className="bg-amber-50 p-4 rounded-lg border border-amber-100 space-y-4">
                   <h2 className="flex items-center gap-2 text-xs font-bold text-amber-800 uppercase mb-1"><Sliders size={14} /> Decorations</h2>
                   
                   <div><label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Main Decor</label><select value={details.decoration?.type || 'none'} onChange={(e) => updateDecoration(e.target.value as DecorativeElement)} className="w-full p-2 bg-white border border-amber-200 rounded text-sm text-gray-700 outline-none">{decorativeOptions.map(opt => (<option key={opt.value} value={opt.value}>{opt.label}</option>))}</select><div className="flex items-center gap-2 mt-2"><span className="text-xs text-gray-400 w-10">Op: {Math.round((details.decoration?.opacity || 1) * 100)}%</span><input type="range" min="0" max="1" step="0.1" value={details.decoration?.opacity || 1} onChange={(e) => updateDecorOpacity(parseFloat(e.target.value))} className="flex-1 h-1.5 bg-amber-200 rounded-lg appearance-none cursor-pointer accent-amber-600" /></div></div>
                   
                   <div className="h-px bg-amber-200 w-full my-2"></div>
                   
                   <div className="space-y-2">
                       <label className="block text-xs font-semibold text-gray-500 uppercase mb-1"><PanelBottom size={10} className="inline mr-1"/> Bottom Border</label>
                       <select value={details.bottomBorder?.type || 'none'} onChange={(e) => updateBottomBorder(e.target.value as BottomBorderType)} className="w-full p-2 bg-white border border-amber-200 rounded text-sm text-gray-700 outline-none">
                           {bottomBorderOptions.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
                       </select>
                   </div>
                   
                   <div className="grid grid-cols-2 gap-2">
                       <div className="space-y-2">
                           <label className="block text-xs font-semibold text-gray-500 uppercase mb-1"><AlignHorizontalJustifyCenter size={10} className="inline mr-1"/> Left Border</label>
                           <select value={details.leftBorder?.type || 'none'} onChange={(e) => updateLeftBorder(e.target.value as SideBorderType)} className="w-full p-2 bg-white border border-amber-200 rounded text-sm text-gray-700 outline-none">
                               {sideBorderOptions.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
                           </select>
                       </div>
                       <div className="space-y-2">
                           <label className="block text-xs font-semibold text-gray-500 uppercase mb-1"><AlignHorizontalJustifyCenter size={10} className="inline mr-1"/> Right Border</label>
                           <select value={details.rightBorder?.type || 'none'} onChange={(e) => updateRightBorder(e.target.value as SideBorderType)} className="w-full p-2 bg-white border border-amber-200 rounded text-sm text-gray-700 outline-none">
                               {sideBorderOptions.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
                           </select>
                       </div>
                   </div>

                   <div className="h-px bg-amber-200 w-full my-2"></div>

                   <div className="space-y-2">
                       <label className="block text-xs font-semibold text-gray-500 uppercase mb-1"><Layers size={10} className="inline mr-1"/> Texture</label>
                       <select value={details.backgroundTexture?.type || 'none'} onChange={(e) => updateTexture(e.target.value as BackgroundTextureType)} className="w-full p-2 bg-white border border-amber-200 rounded text-sm text-gray-700 outline-none">
                           {textureOptions.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
                       </select>
                       <input type="range" min="0" max="1" step="0.05" value={details.backgroundTexture?.opacity || 0.1} onChange={(e) => updateTextureOpacity(parseFloat(e.target.value))} className="w-full h-1.5 bg-amber-200 rounded-lg appearance-none cursor-pointer accent-amber-600" />
                   </div>

                   <div className="h-px bg-amber-200 w-full my-2"></div>
                   
                   <div>
                       <h3 className="flex items-center gap-1 text-xs font-semibold text-gray-500 uppercase mb-2"><Star size={10} /> Symbols</h3>
                       <div className="flex items-center gap-4 bg-white p-2 rounded border border-amber-200">
                           <label className="flex items-center gap-1 cursor-pointer">
                               <input type="radio" name="cardSymbol" checked={!details.showSwastik && !details.showAmpersand} onChange={() => setSymbol('none')} className="accent-amber-600" />
                               <span className="text-xs font-medium text-gray-700">None</span>
                           </label>
                           <label className="flex items-center gap-1 cursor-pointer">
                               <input type="radio" name="cardSymbol" checked={details.showSwastik} onChange={() => setSymbol('swastik')} className="accent-amber-600" />
                               <span className="text-xs font-medium text-gray-700">Swastik</span>
                           </label>
                           <label className="flex items-center gap-1 cursor-pointer">
                               <input type="radio" name="cardSymbol" checked={details.showAmpersand} onChange={() => setSymbol('ampersand')} className="accent-amber-600" />
                               <span className="text-xs font-medium text-gray-700">&</span>
                           </label>
                       </div>
                       <div className="mt-2">
                           {details.showSwastik && <StyleToolbar field="swastikSymbol" />}
                           {details.showAmpersand && <StyleToolbar field="ampersandSymbol" />}
                       </div>
                   </div>
                </section>
                
                <section className="bg-blue-50 p-4 rounded-lg border border-blue-100 space-y-3">
                  <h2 className="flex items-center gap-2 text-xs font-bold text-blue-800 uppercase mb-1"><Save size={14} /> Drafts</h2>
                  <div className="grid grid-cols-3 gap-2"><button onClick={onSaveDraft} className="py-2 bg-blue-600 text-white rounded text-xs hover:bg-blue-700 flex flex-col items-center justify-center"><Save size={12} className="mb-1"/> Save</button><button onClick={onLoadDraft} disabled={!hasDraft} className="py-2 bg-white text-blue-600 border border-blue-200 rounded text-xs hover:bg-blue-50 disabled:opacity-50 flex flex-col items-center justify-center"><FolderOpen size={12} className="mb-1"/> Load</button><button onClick={onClearDraft} disabled={!hasDraft} className="py-2 bg-red-100 text-red-600 border border-red-200 rounded text-xs hover:bg-red-50 disabled:opacity-50 flex flex-col items-center justify-center"><Trash2 size={12} className="mb-1"/> Clear</button></div>
                </section>
             </div>
          )}
      </div>

      <div className="flex-none p-4 bg-gray-50 border-t border-gray-200">
          <div className="grid grid-cols-3 gap-2 mb-3">
             <button type="button" onClick={() => handlePayment(handlePrint)} className="bg-gray-700 hover:bg-gray-800 text-white py-3 rounded-lg flex items-center justify-center gap-1 text-xs font-bold transition-all"><Printer size={16} /> Print <span className="text-[10px] ml-1 bg-white/20 px-1 rounded">₹49</span></button>
             <button type="button" onClick={() => handlePayment(onDownloadPDF)} className="bg-red-700 hover:bg-red-800 text-white py-3 rounded-lg flex items-center justify-center gap-1 text-xs font-bold transition-all"><FileText size={16} /> PDF <span className="text-[10px] ml-1 bg-white/20 px-1 rounded">₹49</span></button>
             <button type="button" onClick={() => handlePayment(onDownload)} className="bg-red-700 hover:bg-red-800 text-white py-3 rounded-lg flex items-center justify-center gap-1 text-xs font-bold transition-all"><ImageIcon size={16} /> PNG <span className="text-[10px] ml-1 bg-white/20 px-1 rounded">₹49</span></button>
          </div>
          <div className="text-center">
             <span className="text-[10px] font-bold text-red-600 uppercase tracking-widest">Developed By Om Ahire</span>
          </div>
      </div>
    </div>
  );
};

export default FormControls;