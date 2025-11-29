import React, { useState, useRef, useEffect } from 'react';
import { WeddingDetails, TemplateConfig, BackgroundTextureType, BottomBorderType, SideBorderType } from '../types';
import { Maximize2 } from 'lucide-react';

interface CardPreviewProps {
  details: WeddingDetails;
  template: TemplateConfig;
  id?: string;
  onTextClick?: (field: keyof WeddingDetails['textStyles']) => void;
  onUpdateTextStyle?: (field: keyof WeddingDetails['textStyles'], updates: Partial<{x: number, y: number, fontSize: number}>) => void;
  activeTextField?: keyof WeddingDetails['textStyles'] | null;
  isMoveMode?: boolean;
}

const CardPreview: React.FC<CardPreviewProps> = ({ details, template, id, onTextClick, onUpdateTextStyle, activeTextField, isMoveMode = false }) => {
  const { styles, customStyle, layout = 'standard' } = template;
  
  // Custom Colors Extraction
  const accentColor = details.customColors?.accent;
  const borderColor = details.customColors?.border;
  const customBackground = details.customColors?.background;
  
  // Use user selected decoration or fallback to template default if not yet set in state
  const decorType = details.decoration?.type || styles.decorativeElement || 'none';
  const decorOpacity = details.decoration?.opacity ?? 1;
  const borderType = details.bottomBorder?.type || 'none';
  const leftBorderType = details.leftBorder?.type || 'none';
  const rightBorderType = details.rightBorder?.type || 'none';
  const textureType = details.backgroundTexture?.type || 'none';
  const textureOpacity = details.backgroundTexture?.opacity || 0.1;

  // Logic for height and compact mode
  const isStandardPhoto = template.hasPhoto && details.photo && layout === 'standard';
  const isSplit = layout === 'split-left' || layout === 'split-right';
  const isFloral = template.category === 'Floral';
  const isFullOverlay = layout === 'full-overlay';
  const isPolaroid = layout === 'polaroid';
  const hasPhoto = Boolean(template.hasPhoto && details.photo);
  
  const containerHeightClass = (isStandardPhoto || isSplit) ? 'h-[900px]' : 'h-[750px]';
  const compactMode = isStandardPhoto;
  
  // Flag borders activity
  const hasLeftBorder = leftBorderType !== 'none';
  const hasRightBorder = rightBorderType !== 'none';
  const hasBottomBorder = borderType !== 'none';

  // Calculate Layout Scale
  // Standard base scale - Increased values for better legibility
  let baseLayoutScale = isSplit ? 0.95 : (isStandardPhoto || isFullOverlay || isPolaroid ? 0.80 : 0.88);
  
  // Reduce scale if borders are active to prevent text overlap
  // If side borders, reduce width effectively
  // If bottom border, reduce height availability
  if (hasLeftBorder || hasRightBorder || hasBottomBorder) {
      baseLayoutScale = baseLayoutScale * 0.9;
  }
  
  const layoutScale = baseLayoutScale;

  // Determine Contrast Color for Selection Box
  const getSelectionColor = () => {
    // Basic heuristic: check background color or wrapper class
    const bg = customBackground || '';
    const wrapper = styles.wrapper || '';
    
    // List of dark identifiers
    const isDark = 
        bg === '#000000' || 
        bg.startsWith('#0') || 
        bg.startsWith('#1') || 
        bg.startsWith('#2') || 
        bg.startsWith('#3') || 
        bg.startsWith('#4') || 
        bg.startsWith('#5') ||
        wrapper.includes('bg-black') ||
        wrapper.includes('bg-gray-9') ||
        wrapper.includes('bg-slate-9') ||
        wrapper.includes('bg-zinc-9') ||
        wrapper.includes('bg-[#') && (wrapper.includes('0') || wrapper.includes('1')); // Very rough guess

    return isDark ? 'border-white text-white' : 'border-black text-black';
  };

  const selectionClass = getSelectionColor();
  const selectionBorderColor = selectionClass.includes('white') ? 'white' : 'black';

  // --- Draggable Text Wrapper (Internal Component) ---
  const DraggableElement = ({ 
    field, 
    children, 
    baseFontSize,
    className = "",
    allowResize = true
  }: { 
    field: keyof WeddingDetails['textStyles']; 
    children: React.ReactNode; 
    baseFontSize: number;
    className?: string;
    allowResize?: boolean;
  }) => {
     // Determine if this field is selected based on prop from App or internal logic if id not provided
     const isSelected = activeTextField === field;
     const s = details.textStyles[field];
     
     // Refs for drag logic
     const startPos = useRef({ x: 0, y: 0 });
     const startValues = useRef({ x: 0, y: 0, fontSize: 0 });
     const mode = useRef<'move' | 'resize' | null>(null);

     const handleTouchStart = (e: React.TouchEvent) => {
         // Only enable drag interactions if we have the update handler (i.e., not in gallery thumbnail mode)
         if (!onUpdateTextStyle || !onTextClick) return;
         
         e.stopPropagation(); // Prevent parent scrolling
         onTextClick(field); // Notify parent to select this field

         const touch = e.touches[0];
         startPos.current = { x: touch.clientX, y: touch.clientY };
         startValues.current = { x: s.x, y: s.y, fontSize: s.fontSize };
         mode.current = 'move';
     };

     const handleResizeStart = (e: React.TouchEvent) => {
         e.stopPropagation();
         e.preventDefault(); // Prevent accidental scroll
         const touch = e.touches[0];
         startPos.current = { x: touch.clientX, y: touch.clientY };
         startValues.current = { x: s.x, y: s.y, fontSize: s.fontSize };
         mode.current = 'resize';
     };

     const handleTouchMove = (e: React.TouchEvent) => {
         if (!mode.current || !onUpdateTextStyle) return;
         e.stopPropagation();
         
         const touch = e.touches[0];
         const dx = touch.clientX - startPos.current.x;
         const dy = touch.clientY - startPos.current.y;

         if (mode.current === 'move') {
             // GUARD: Only move if isMoveMode is true
             if (!isMoveMode) return;

             // Sensitivity divider
             const sensitivity = 1; 

             onUpdateTextStyle(field, {
                 x: startValues.current.x + (dx / sensitivity),
                 y: startValues.current.y + (dy / sensitivity)
             });
         } else if (mode.current === 'resize') {
             // Calculate magnitude of movement for smoother resize
             // Moving down or right increases size
             const delta = (dx + dy) / 2; 
             const scaleFactor = delta / 100; // 100px = 1.0 size change
             
             const newSize = Math.max(0.2, startValues.current.fontSize + scaleFactor);
             
             onUpdateTextStyle(field, {
                 fontSize: newSize
             });
         }
     };

     const handleTouchEnd = () => {
         mode.current = null;
     };
     
     return (
         <div 
            className={`relative inline-block transition-colors ${className}`}
            style={{
                fontSize: `${(baseFontSize * s.fontSize * layoutScale).toFixed(2)}rem`,
                transform: `translate(${s.x}px, ${s.y}px)`,
                color: s.color,
                zIndex: isSelected ? 50 : undefined, // Bring to front when selected
                touchAction: 'none' // Critical for handling touch events properly
            }}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
         >
            {/* The Actual Content */}
            <div className={`relative ${isSelected ? 'z-20' : ''}`}>
                {children}
            </div>

            {/* Selection Box Overlay (Only when selected) */}
            {isSelected && onUpdateTextStyle && (
                <div className={`absolute -inset-2 border-2 border-dashed ${selectionClass} rounded z-10 pointer-events-none`}>
                    {/* Resize Handle - Always Active when selected */}
                    {allowResize && (
                        <div 
                            className={`absolute -bottom-4 -right-4 w-8 h-8 rounded-full flex items-center justify-center shadow-md pointer-events-auto border-2 ${selectionClass}`}
                            style={{ backgroundColor: selectionBorderColor === 'white' ? '#333' : '#fff' }}
                            onTouchStart={handleResizeStart}
                        >
                            <Maximize2 size={14} className={selectionBorderColor === 'white' ? 'text-white' : 'text-black'} style={{ transform: 'rotate(90deg)' }} />
                        </div>
                    )}
                </div>
            )}
         </div>
     );
  };

  const shouldHideCentralSymbol = (!details.showSwastik && !details.showAmpersand) || isStandardPhoto || (hasPhoto && (isFullOverlay || isPolaroid));

  // Logic to push content down for top decorations
  const topHeaderDecors = [
      'toran', 
      'royal-arch', 
      'lanterns-hanging', 
      'paithani-border', 
      'royal-pillars', 
      'floral-corner',
      'gatefold-lattice',
      'floral-wreath'
  ];
  const shouldPushContentDown = topHeaderDecors.includes(decorType);
  
  // Dynamic Padding for Side Borders (~20px gap + border width)
  const contentPaddingX = (hasLeftBorder && hasRightBorder) ? 'px-16' 
                         : hasLeftBorder ? 'pl-16 pr-8' 
                         : hasRightBorder ? 'pr-16 pl-8' 
                         : 'px-8';
  
  const contentPaddingB = hasBottomBorder ? 'pb-16' : 'pb-2';

  // --- Render Background Texture (Z-0) ---
  const renderTexture = () => {
    if (textureType === 'none') return null;

    let style: React.CSSProperties = { opacity: textureOpacity };
    const color = 'rgba(255,255,255,0.5)'; // Default overlay color
    
    switch (textureType) {
        case 'paper': style.backgroundImage = 'url("https://www.transparenttextures.com/patterns/cream-paper.png")'; break;
        case 'canvas': style.backgroundImage = 'url("https://www.transparenttextures.com/patterns/canvas-texture.png")'; break;
        case 'silk': style.backgroundImage = 'linear-gradient(115deg, transparent 0%, rgba(255,255,255,0.4) 25%, transparent 50%, rgba(255,255,255,0.4) 75%, transparent 100%)'; style.backgroundSize = '200% 200%'; break;
        case 'damask': style.backgroundImage = `radial-gradient(circle, ${color} 2px, transparent 2.5px), radial-gradient(circle, ${color} 2px, transparent 2.5px)`; style.backgroundSize = '30px 30px'; break;
        case 'islamic': style.backgroundImage = `repeating-linear-gradient(45deg, transparent, transparent 10px, ${color} 10px, ${color} 11px), repeating-linear-gradient(-45deg, transparent, transparent 10px, ${color} 10px, ${color} 11px)`; break;
        case 'mandala': style.backgroundImage = 'url("https://www.transparenttextures.com/patterns/arabesque.png")'; break;
        case 'floral': style.backgroundImage = 'url("https://www.transparenttextures.com/patterns/floral-linen.png")'; break;
        case 'dots': style.backgroundImage = `radial-gradient(${color} 1px, transparent 1px)`; style.backgroundSize = '10px 10px'; break;
        case 'lines': style.backgroundImage = `repeating-linear-gradient(0deg, transparent, transparent 19px, ${color} 20px)`; break;
        case 'grunge': style.backgroundImage = 'url("https://www.transparenttextures.com/patterns/concrete-wall.png")'; break;
        case 'marble': style.backgroundImage = 'url("https://www.transparenttextures.com/patterns/white-diamond-dark.png")'; break; 
        case 'wood': style.backgroundImage = 'url("https://www.transparenttextures.com/patterns/wood-pattern.png")'; break;
        case 'stars': style.backgroundImage = 'url("https://www.transparenttextures.com/patterns/stardust.png")'; break;
        case 'hearts': style.backgroundImage = `radial-gradient(circle at 10px 10px, ${color} 2px, transparent 2.5px)`; break; 
        case 'glitter': style.backgroundImage = 'url("https://www.transparenttextures.com/patterns/glitter.png")'; break;
        case 'geometric': style.backgroundImage = `linear-gradient(30deg, ${color} 12%, transparent 12.5%, transparent 87%, ${color} 87.5%, ${color}), linear-gradient(150deg, ${color} 12%, transparent 12.5%, transparent 87%, ${color} 87.5%, ${color}), linear-gradient(30deg, ${color} 12%, transparent 12.5%, transparent 87%, ${color} 87.5%, ${color}), linear-gradient(150deg, ${color} 12%, transparent 12.5%, transparent 87%, ${color} 87.5%, ${color}), linear-gradient(60deg, ${color} 25%, transparent 25.5%, transparent 75%, ${color} 75%, ${color}), linear-gradient(60deg, ${color} 25%, transparent 25.5%, transparent 75%, ${color} 75%, ${color})`; style.backgroundSize = '20px 35px'; style.opacity = textureOpacity * 0.5; break;
        case 'waves': style.backgroundImage = `repeating-radial-gradient(circle at 0 0, transparent 0, ${color} 1px, transparent 2px, transparent 5px)`; break;
        case 'checkered': style.backgroundImage = `repeating-linear-gradient(45deg, ${color} 25%, transparent 25%, transparent 75%, ${color} 75%, ${color}), repeating-linear-gradient(45deg, ${color} 25%, transparent 25%, transparent 75%, ${color} 75%, ${color})`; style.backgroundSize = '20px 20px'; break;
        case 'honeycomb': style.backgroundImage = 'url("https://www.transparenttextures.com/patterns/honey-im-subtle.png")'; break;
        case 'lanterns-pattern': style.backgroundImage = 'radial-gradient(circle at 50% 50%, rgba(255,215,0,0.4) 0%, transparent 20%), radial-gradient(circle at 20% 80%, rgba(255,215,0,0.3) 0%, transparent 15%)'; style.backgroundSize = '100px 100px'; break;
        
        case 'floral-outline': style.backgroundImage = `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M50 0 Q 75 25 50 50 T 50 100 Q 25 75 50 50 T 50 0' fill='none' stroke='%23ffffff' opacity='0.2'/%3E%3C/svg%3E")`; style.backgroundSize = '80px 80px'; style.opacity = textureOpacity * 0.8; break;
        case 'rose-bloom': style.backgroundImage = `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cdefs%3E%3CradialGradient id='roseGrad'%3E%3Cstop offset='0%25' stop-color='%23ffffff' stop-opacity='0.2'/%3E%3Cstop offset='100%25' stop-color='%23ffffff' stop-opacity='0'/%3E%3C/radialGradient%3E%3C/defs%3E%3Ccircle cx='50' cy='50' r='30' fill='url(%23roseGrad)'/%3E%3Cpath d='M50 20 Q 70 20 80 40 L 50 50 L 20 40 Q 30 20 50 20 Z' fill='%23ffffff' opacity='0.1'/%3E%3C/svg%3E")`; style.backgroundSize = '120px 120px'; style.opacity = textureOpacity * 0.6; break;
        case 'lotus-petals': style.backgroundImage = `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M50 0 Q 70 20 85 50 Q 70 80 50 100 Q 30 80 15 50 Q 30 20 50 0 Z' fill='%23ffffff' opacity='0.15'/%3E%3C/svg%3E")`; style.backgroundSize = '100px 100px'; style.opacity = textureOpacity * 0.7; break;
        case 'vine-leaves': style.backgroundImage = `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M20 50 Q 40 30 50 10 Q 60 30 80 50 Q 60 70 50 90 Q 40 70 20 50 Z' fill='none' stroke='%23ffffff' stroke-width='1' opacity='0.15'/%3E%3Cpath d='M80 50 Q 60 70 50 90 Q 40 70 20 50' fill='none' stroke='%23ffffff' stroke-width='1' opacity='0.08'/%3E%3C/svg%3E")`; style.backgroundSize = '80px 80px'; style.opacity = textureOpacity * 0.8; break;
        case 'peony-garden': style.backgroundImage = `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='50' cy='50' r='40' fill='%23ffffff' opacity='0.08'/%3E%3Ccircle cx='50' cy='50' r='20' fill='%23ffffff' opacity='0.05'/%3E%3Cpath d='M50 10 L60 40 L90 50 L60 60 L50 90 L40 60 L10 50 L40 40 Z' fill='%23ffffff' opacity='0.03'/%3E%3C/svg%3E")`; style.backgroundSize = '150px 150px'; style.opacity = textureOpacity * 0.6; break;

        default: return null;
    }

    return <div className="absolute inset-0 pointer-events-none z-0" style={style}></div>;
  };

  // --- Render Bottom Border (Z-10) ---
  const renderBottomBorder = () => {
    if (borderType === 'none') return null;

    const customAccentStyle = accentColor ? { color: accentColor, opacity: 0.9 } : { opacity: 0.9 };
    const customBorderStyle = accentColor ? { borderColor: accentColor } : {};
    const customBgStyle = accentColor ? { backgroundColor: accentColor } : {};

    const repeat = (content: React.ReactNode, count: number = 10) => (
        <div className={`absolute bottom-0 left-0 right-0 h-12 flex justify-between items-end px-2 pb-1 overflow-hidden z-10 ${!accentColor ? styles.accent : ''}`} style={customAccentStyle}>
            {Array.from({length: count}).map((_, i) => <div key={i}>{content}</div>)}
        </div>
    );

    const lanternSVG = (
      <svg width="24" height="40" viewBox="0 0 24 40" fill="currentColor" className="drop-shadow-sm" style={{ color: accentColor || '#FFD700' }}>
         <path d="M12 0 L12 10 M7 10 L17 10 L19 18 L16 28 L8 28 L5 18 L7 10 Z" fill="currentColor" stroke={accentColor ? 'rgba(0,0,0,0.2)' : '#B8860B'} strokeWidth="1"/>
         <circle cx="12" cy="20" r="3" fill="#FFFACD" className="animate-pulse"/>
         <path d="M8 28 L8 35 M12 28 L12 38 M16 28 L16 35" stroke={accentColor ? 'rgba(0,0,0,0.2)' : '#B8860B'} strokeWidth="1"/>
      </svg>
    );

    switch(borderType) {
        case 'lanterns-border': return repeat(lanternSVG, 10);
        case 'simple-gold': return <div className={`absolute bottom-4 left-4 right-4 h-1 z-10 ${!accentColor ? 'bg-yellow-500' : ''}`} style={customBgStyle}></div>;
        case 'double-gold': return <div className={`absolute bottom-4 left-4 right-4 h-2 border-y-2 z-10 ${!accentColor ? 'border-yellow-500' : ''}`} style={customBorderStyle}></div>;
        case 'ornate-gold': return <div className={`absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-yellow-900/50 to-transparent border-t z-10 ${!accentColor ? 'border-yellow-500' : ''}`} style={customBorderStyle}></div>;
        case 'floral-vine': return repeat(<span className="text-2xl">🌿</span>, 12);
        case 'mango-paisley': return repeat(<span className="text-2xl rotate-180">❧</span>, 15);
        case 'lotus-row': return repeat(<span className="text-2xl">🪷</span>, 10);
        case 'elephants': return repeat(<span className="text-2xl">🐘</span>, 8);
        case 'diyas': return repeat(<span className="text-2xl">🪔</span>, 12);
        case 'kalash': return repeat(<span className="text-2xl">🏺</span>, 12);
        case 'om-pattern': return repeat(<span className="text-xl">🕉</span>, 15);
        case 'swastik-row': return repeat(<span className="text-xl">卐</span>, 15);
        case 'ganesha-row': return repeat(<span className="text-2xl">🐘</span>, 8); 
        case 'shehnai': return repeat(<span className="text-2xl">🎺</span>, 10);
        case 'wedding-dhol': return repeat(<span className="text-2xl">🥁</span>, 10);
        case 'hanging-bells': return <div className={`absolute bottom-0 left-0 right-0 h-10 flex justify-around items-start z-10 ${!accentColor ? styles.accent : ''}`} style={customAccentStyle}><span className="text-xl">🔔</span><span className="text-xl">🔔</span><span className="text-xl">🔔</span><span className="text-xl">🔔</span><span className="text-xl">🔔</span></div>;
        case 'temple-spire': return repeat(<span className="text-2xl">🛕</span>, 10);
        case 'rangoli': return repeat(<span className="text-xl">💠</span>, 15);
        case 'abstract-waves': return <div className="absolute bottom-0 left-0 right-0 h-6 z-10" style={{backgroundColor: accentColor || 'rgba(234, 179, 8, 0.5)', maskImage: 'radial-gradient(circle at 10px 0, transparent 5px, black 6px)', maskSize: '20px 20px', WebkitMaskImage: 'radial-gradient(circle at 10px 0, transparent 5px, black 6px)', WebkitMaskSize: '20px 20px'}}></div>;
        case 'dot-mandala': return repeat(<span className="text-xl">✺</span>, 15);
        case 'leafy-scroll': return repeat(<span className="text-xl">🍃</span>, 15);
        case 'royal-fence': return repeat(<span className="text-xl">IIII</span>, 15);
        case 'marigold-garland': return repeat(<span className="text-xl" style={!accentColor ? {color: '#f97316'} : {}}>🏵</span>, 12);
        case 'starry-night': return repeat(<span className="text-lg" style={!accentColor ? {color: '#fef08a'} : {}}>✨</span>, 15);
        case 'hearts-row': return repeat(<span className="text-lg" style={!accentColor ? {color: '#f87171'} : {}}>♥</span>, 15);
        case 'geometric-diamonds': return repeat(<span className="text-xl">❖</span>, 15);
        default: return null;
    }
  };

  // --- Render Side Border (Z-10) ---
  const renderSideBorder = (side: 'left' | 'right') => {
    const type = side === 'left' ? leftBorderType : rightBorderType;
    if (type === 'none') return null;

    const customAccentStyle = accentColor ? { color: accentColor } : {};
    const customBgStyle = accentColor ? { backgroundColor: accentColor } : {};

    const baseClass = `absolute top-0 bottom-0 w-12 flex flex-col items-center py-2 z-10 ${!accentColor ? styles.accent : ''} ${side === 'left' ? 'left-0 border-r border-white/10' : 'right-0 border-l border-white/10'}`;
    const repeatCount = 8;

    const repeatV = (content: React.ReactNode) => (
        <div className={baseClass + " justify-around overflow-hidden"} style={customAccentStyle}>
            {Array.from({length: repeatCount}).map((_, i) => <div key={i}>{content}</div>)}
        </div>
    );

    const pillarSVG = (
        <svg width="20" height="60" viewBox="0 0 20 60" fill="currentColor">
            <rect x="5" y="0" width="10" height="60" rx="2" opacity="0.7"/>
            <circle cx="10" cy="10" r="3" fill={accentColor || "#FFD700"} />
            <circle cx="10" cy="50" r="3" fill={accentColor || "#FFD700"} />
        </svg>
    );

    switch(type) {
        case 'simple-line-gold': return <div className={`absolute top-4 bottom-4 w-1 z-10 ${side === 'left' ? 'left-4' : 'right-4'} ${!accentColor ? 'bg-yellow-500' : ''}`} style={customBgStyle}></div>;
        case 'ornate-pillar': return repeatV(pillarSVG);
        case 'floral-creeper': return repeatV(<span className={`text-2xl ${side==='right'?'rotate-180':''}`}>🌿</span>);
        case 'mango-motif-stack': return repeatV(<span className={`text-xl ${side==='left'?'scale-x-[-1]':''}`}>❧</span>);
        case 'elephant-trumpeting': return repeatV(<span className={`text-2xl ${side==='left'?'scale-x-[-1]':''}`}>🐘</span>);
        case 'lotus-stack': return repeatV(<span className="text-xl">🪷</span>);
        case 'diya-stack': return repeatV(<span className="text-xl">🪔</span>);
        case 'bells-hanging-side': return repeatV(<span className="text-xl">🔔</span>);
        case 'lattice-strip': return <div className={`absolute top-0 bottom-0 w-8 z-10 ${side === 'left' ? 'left-0' : 'right-0'}`} style={{backgroundImage: 'radial-gradient(circle, currentColor 2px, transparent 3px)', backgroundSize: '10px 10px', opacity: 0.5, color: accentColor || 'inherit'}}></div>;
        case 'royal-sword': return repeatV(<span className={`text-2xl ${side==='left'?'rotate-90':'-rotate-90'}`}>🗡</span>);
        case 'shehnai-vertical': return repeatV(<span className={`text-xl ${side==='left'?'rotate-90':'-rotate-90'}`}>🎺</span>);
        case 'wedding-knot': return repeatV(<span className="text-xl">🎀</span>);
        case 'kalash-stack': return repeatV(<span className="text-xl">🏺</span>);
        case 'geometric-zigzag': return <div className={`absolute top-0 bottom-0 w-4 z-10 ${side === 'left' ? 'left-2' : 'right-2'}`} style={{backgroundImage: 'linear-gradient(45deg, transparent 50%, currentColor 50%), linear-gradient(-45deg, transparent 50%, currentColor 50%)', backgroundSize: '20px 20px', opacity: 0.5, color: accentColor || 'inherit'}}></div>;
        case 'leafy-branch': return repeatV(<span className={`text-xl ${side==='left'?'rotate-90':'-rotate-90'}`}>🍃</span>);
        case 'star-string': return repeatV(<span className="text-lg" style={!accentColor ? {color: '#fff'} : {}}>✨</span>);
        case 'heart-string': return repeatV(<span className="text-lg" style={!accentColor ? {color: '#f87171'} : {}}>♥</span>);
        case 'marigold-string': return repeatV(<span className="text-lg" style={!accentColor ? {color: '#f97316'} : {}}>🏵</span>);
        case 'abstract-curves': return <div className={`absolute top-0 bottom-0 w-6 z-10 ${side === 'left' ? 'left-2 border-r-2 border-dashed' : 'right-2 border-l-2 border-dashed'} ${!accentColor ? 'border-yellow-500' : ''}`} style={accentColor ? {borderColor: accentColor} : {}}></div>;
        case 'dot-line': return repeatV(<span className="text-xs">●</span>);
        default: return null;
    }
  };

  // --- Decorative Components (Condensed) with Z-10 or less ---
  const customDecorStyle = accentColor ? { color: accentColor, opacity: decorOpacity } : { opacity: decorOpacity };
  const customDecorClass = !accentColor ? styles.accent : '';

  const DamaskPattern = () => (<div className="absolute inset-0 pointer-events-none mix-blend-overlay z-0" style={{opacity: decorOpacity * 0.1, backgroundImage: 'radial-gradient(circle, #ffffff 2px, transparent 2.5px), radial-gradient(circle, #ffffff 2px, transparent 2.5px)', backgroundSize: '30px 30px', backgroundPosition: '0 0, 15px 15px'}}></div>);
  const Toran = () => (
    <div className="absolute top-0 left-0 w-full flex justify-between -mt-4 z-10 px-4" style={{opacity: decorOpacity}}>
       {Array.from({ length: 7 }).map((_, i) => (
         <div key={i} className="flex flex-col items-center">
             <div className="h-6 w-0.5" style={{backgroundColor: accentColor || '#b45309'}}></div>
             <div className={`rounded-full border shadow-sm ${i % 2 === 0 ? 'w-10 h-10' : 'w-12 h-12'} flex items-center justify-center text-white text-[10px]`}
                  style={{
                      backgroundColor: accentColor ? (i%2===0 ? accentColor : accentColor) : (i%2===0 ? '#b91c1c' : '#ea580c'), 
                      borderColor: accentColor || '#fde047'
                  }}
             >✿</div>
         </div>
       ))}
    </div>
  );
  const PaithaniBorder = () => (<div className="absolute inset-0 pointer-events-none z-0" style={{opacity: decorOpacity}}><div className="absolute top-0 left-0 right-0 h-24 z-0 opacity-90" style={{background: `repeating-linear-gradient(45deg, ${(accentColor || customStyle?.borderColor as string) || '#DAA520'} 0, ${(accentColor || customStyle?.borderColor as string) || '#DAA520'} 10px, transparent 10px, transparent 20px)`, maskImage: 'linear-gradient(to bottom, black 50%, transparent 100%)', WebkitMaskImage: 'linear-gradient(to bottom, black 50%, transparent 100%)'}}></div></div>);
  const Mandala = () => (<div className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none z-0 ${!accentColor ? styles.text : ''}`} style={{opacity: decorOpacity * 0.1, color: accentColor || undefined}}><svg width="500" height="500" viewBox="0 0 100 100" fill="currentColor"><path d="M50 0 L60 40 L100 50 L60 60 L50 100 L40 60 L0 50 L40 40 Z" /><circle cx="50" cy="50" r="30" stroke="currentColor" strokeWidth="1" fill="none"/><circle cx="50" cy="50" r="20" stroke="currentColor" strokeWidth="0.5" fill="none"/></svg></div>);
  const FloralCorner = () => (<div style={customDecorStyle} className={`${customDecorClass} z-10`}><div className="absolute top-0 left-0 w-40 h-40 pointer-events-none opacity-90"><svg viewBox="0 0 100 100" fill="none"><path d="M0 0 Q 60 20, 100 100 L 0 100 L 0 0" fill="currentColor" opacity="0.15"/><path d="M10,10 Q50,10 80,80" stroke="currentColor" strokeWidth="2" fill="none" /><circle cx="20" cy="20" r="12" fill={accentColor || "#ffb7b2"} /><circle cx="40" cy="15" r="8" fill={accentColor || "#ffdac1"} /><circle cx="15" cy="40" r="8" fill={accentColor || "#e2f0cb"} /><circle cx="50" cy="30" r="5" fill={accentColor || "#c7ceea"} /></svg></div><div className="absolute bottom-0 right-0 w-40 h-40 pointer-events-none rotate-180 opacity-90"><svg viewBox="0 0 100 100" fill="none"><path d="M0 0 Q 60 20, 100 100 L 0 100 L 0 0" fill="currentColor" opacity="0.15"/><path d="M10,10 Q50,10 80,80" stroke="currentColor" strokeWidth="2" fill="none" /><circle cx="20" cy="20" r="12" fill={accentColor || "#ffb7b2"} /><circle cx="40" cy="15" r="8" fill={accentColor || "#ffdac1"} /><circle cx="15" cy="40" r="8" fill={accentColor || "#e2f0cb"} /><circle cx="50" cy="30" r="5" fill={accentColor || "#c7ceea"} /></svg></div></div>);
  const RoyalArch = () => (<div className="absolute inset-4 pointer-events-none z-10 border-b-0" style={{opacity: decorOpacity}}><svg className={`w-full h-full ${!accentColor ? 'text-yellow-500/80' : ''}`} style={accentColor ? {color: accentColor, opacity: 0.8} : {}} fill="none" viewBox="0 0 400 600" preserveAspectRatio="none"><path d="M10,600 L10,200 Q10,100 100,50 Q200,0 300,50 Q390,100 390,200 L390,600" stroke="currentColor" strokeWidth="8" fill="none" className="drop-shadow-lg"/><path d="M20,600 L20,200 Q20,110 100,60 Q200,10 300,60 Q380,110 380,200 L380,600" stroke="currentColor" strokeWidth="2" strokeDasharray="5,5" fill="none"/><line x1="200" y1="0" x2="200" y2="120" stroke="currentColor" strokeWidth="2" /><circle cx="200" cy="130" r="15" fill="currentColor" className={!accentColor ? "text-red-700" : ""}/></svg></div>);
  const RoyalPillars = () => (<div className="absolute inset-0 pointer-events-none z-10 flex justify-between px-2" style={{opacity: decorOpacity}}><div className={`w-8 h-full flex flex-col items-center border-r shadow-xl ${!accentColor ? 'bg-gradient-to-r from-yellow-700 to-yellow-500 border-yellow-900' : ''}`} style={accentColor ? {backgroundColor: accentColor, borderColor: 'rgba(0,0,0,0.2)'} : {}}><div className={`w-10 h-10 mb-2 border-b-4 ${!accentColor ? 'bg-yellow-600 border-yellow-800' : 'brightness-110'}`} style={accentColor ? {backgroundColor: accentColor} : {}}></div><div className={`flex-1 w-6 border-x ${!accentColor ? 'bg-yellow-400/30 border-yellow-600/50' : 'opacity-50'}`} style={accentColor ? {backgroundColor: accentColor} : {}}></div><div className={`w-10 h-12 mt-2 border-t-4 ${!accentColor ? 'bg-yellow-600 border-yellow-800' : 'brightness-110'}`} style={accentColor ? {backgroundColor: accentColor} : {}}></div></div><div className={`w-8 h-full flex flex-col items-center border-l shadow-xl ${!accentColor ? 'bg-gradient-to-l from-yellow-700 to-yellow-500 border-yellow-900' : ''}`} style={accentColor ? {backgroundColor: accentColor, borderColor: 'rgba(0,0,0,0.2)'} : {}}><div className={`w-10 h-10 mb-2 border-b-4 ${!accentColor ? 'bg-yellow-600 border-yellow-800' : 'brightness-110'}`} style={accentColor ? {backgroundColor: accentColor} : {}}></div><div className={`flex-1 w-6 border-x ${!accentColor ? 'bg-yellow-400/30 border-yellow-600/50' : 'opacity-50'}`} style={accentColor ? {backgroundColor: accentColor} : {}}></div><div className={`w-10 h-12 mt-2 border-t-4 ${!accentColor ? 'bg-yellow-600 border-yellow-800' : 'brightness-110'}`} style={accentColor ? {backgroundColor: accentColor} : {}}></div></div></div>);
  const FortSilhouette = () => (<div className={`absolute bottom-0 left-0 right-0 h-40 z-0 pointer-events-none mix-blend-multiply ${!accentColor ? 'text-stone-800' : ''}`} style={{opacity: decorOpacity * 0.8, color: accentColor || undefined}}><svg viewBox="0 0 500 150" className="w-full h-full drop-shadow-lg" preserveAspectRatio="none" fill="currentColor"><path d="M0,150 L0,80 L30,80 L30,60 L60,60 L60,80 L100,80 L100,50 L140,50 L140,80 L180,80 L180,40 L220,40 L220,80 L260,30 L300,80 L340,40 L340,80 L380,50 L380,80 L420,60 L420,80 L460,50 L500,80 L500,150 Z" /></svg><div className="absolute bottom-0 w-full h-20 bg-gradient-to-t from-black/40 to-transparent"></div></div>);
  const FloralWreath = () => (<div className={`absolute top-[35%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 z-0 pointer-events-none ${!accentColor ? styles.accent : ''}`} style={{opacity: decorOpacity * 0.2, color: accentColor || undefined}}><svg viewBox="0 0 200 200" fill="currentColor"><path d="M100,10 A90,90 0 1,0 100,190 A90,90 0 1,0 100,10 M100,30 A70,70 0 1,1 100,170 A70,70 0 1,1 100,30" fillRule="evenodd" opacity="0.3"/><circle cx="100" cy="10" r="10" fill={accentColor || "pink"} /><circle cx="190" cy="100" r="10" fill={accentColor || "orange"} /><circle cx="100" cy="190" r="10" fill={accentColor || "purple"} /><circle cx="10" cy="100" r="10" fill={accentColor || "red"} /></svg></div>);
  const GeometricDiagonal = () => (<div className="absolute inset-0 z-0 overflow-hidden pointer-events-none" style={{opacity: decorOpacity}}><div className="absolute -top-1/2 -left-1/2 w-[200%] h-[200%] bg-gradient-to-r from-transparent via-white/10 to-transparent rotate-45 transform origin-center"></div><div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rotate-45 transform translate-x-32 -translate-y-32"></div><div className="absolute bottom-0 left-0 w-64 h-64 bg-white/5 rotate-45 transform -translate-x-32 translate-y-32"></div></div>);
  const GatefoldLattice = () => (<div style={{opacity: decorOpacity}}><div className="absolute top-0 left-0 bottom-0 w-1/5 z-10 bg-black/20 pointer-events-none flex flex-col items-center overflow-hidden"><div className={`w-full h-full border-r-2 ${!accentColor ? 'border-yellow-500/50' : ''}`} style={{borderColor: accentColor, backgroundImage: `radial-gradient(circle, transparent 20%, ${(customStyle?.backgroundColor as string) || '#000'} 21%)`, backgroundSize: '20px 20px'}}></div><div className="absolute right-0 top-0 bottom-0 w-2 bg-gradient-to-r from-transparent" style={{backgroundImage: `linear-gradient(to right, transparent, ${accentColor || 'rgba(202, 138, 4, 0.4)'})`}}></div></div><div className="absolute top-0 right-0 bottom-0 w-1/5 z-10 bg-black/20 pointer-events-none flex flex-col items-center overflow-hidden"><div className={`w-full h-full border-l-2 ${!accentColor ? 'border-yellow-500/50' : ''}`} style={{borderColor: accentColor, backgroundImage: `radial-gradient(circle, transparent 20%, ${(customStyle?.backgroundColor as string) || '#000'} 21%)`, backgroundSize: '20px 20px'}}></div><div className="absolute left-0 top-0 bottom-0 w-2 bg-gradient-to-l from-transparent" style={{backgroundImage: `linear-gradient(to left, transparent, ${accentColor || 'rgba(202, 138, 4, 0.4)'})`}}></div></div></div>);
  const ScrollRods = () => (<><div className="absolute -top-3 left-1/2 -translate-x-1/2 w-[105%] h-8 z-30 rounded-full shadow-xl flex flex-col justify-center items-center overflow-hidden" style={{ background: accentColor ? `linear-gradient(90deg, ${accentColor} 0%, white 50%, ${accentColor} 100%)` : 'linear-gradient(90deg, #b8860b 0%, #ffd700 50%, #b8860b 100%)' }}><div className="w-full h-1 bg-white/50 blur-[1px]"></div></div><div className="absolute -top-16 left-1/2 -translate-x-1/2 w-1 h-16 z-10 shadow-sm" style={{backgroundColor: accentColor || '#ca8a04'}}></div><div className="absolute -top-16 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full z-10 -mt-2 shadow-sm border" style={{backgroundColor: accentColor || '#eab308', borderColor: accentColor || '#a16207'}}></div><div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-[105%] h-8 z-30 rounded-full shadow-xl flex flex-col justify-center items-center overflow-hidden" style={{ background: accentColor ? `linear-gradient(90deg, ${accentColor} 0%, white 50%, ${accentColor} 100%)` : 'linear-gradient(90deg, #b8860b 0%, #ffd700 50%, #b8860b 100%)' }}><div className="w-full h-1 bg-white/50 blur-[1px]"></div></div></>);
  const LanternsHanging = () => (<div className="absolute top-0 left-0 right-0 h-40 flex justify-around pointer-events-none z-10" style={{opacity: decorOpacity}}>{[1, 2, 3, 4, 5].map((_, i) => { const height = [80, 120, 100, 130, 90][i]; return (<div key={i} className="flex flex-col items-center"><div className="w-0.5" style={{height: `${height}px`, backgroundColor: accentColor || '#ca8a04'}}></div><div className="relative -mt-1"><svg width="30" height="45" viewBox="0 0 30 45" className="drop-shadow-md"><path d="M5 10 L25 10 L28 25 L15 35 L2 25 Z" fill={accentColor || "#FF8C00"} stroke="#B8860B" strokeWidth="1"/><rect x="10" y="35" width="10" height="5" fill="#B8860B" /><circle cx="15" cy="22" r="6" fill="#FFFACD" className="animate-pulse opacity-80" /></svg></div></div>)})}</div>);
  const VerticalBorderComponent = () => (<div className={`absolute top-0 bottom-0 left-4 w-12 border-x-2 flex flex-col items-center py-4 z-0 bg-black/10 ${!accentColor ? 'border-yellow-500/40' : ''}`} style={{opacity: decorOpacity, borderColor: accentColor}}><div className="w-full h-full flex flex-col items-center justify-between opacity-60">{Array.from({length: 8}).map((_, i) => (<div key={i} className={`text-2xl ${!accentColor ? 'text-yellow-400' : ''}`} style={accentColor ? {color: accentColor} : {}}>❖</div>))}</div></div>);
  const SideMandalaComponent = () => (<div className={`absolute top-1/2 right-0 transform translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] pointer-events-none z-0 ${!accentColor ? styles.accent : ''}`} style={{opacity: decorOpacity * 0.2, color: accentColor || undefined}}><svg viewBox="0 0 100 100" fill="currentColor"><circle cx="50" cy="50" r="45" stroke="currentColor" strokeWidth="1" fill="none"/><path d="M50 5 L55 15 L65 15 L60 25 L65 35 L55 35 L50 45 L45 35 L35 35 L40 25 L35 15 L45 15 Z" transform="rotate(0 50 50)" /></svg></div>);
  const FallbackIllustration = () => (<div className={`w-full h-full flex flex-col items-center justify-center opacity-70 z-0 ${!accentColor ? styles.accent : ''}`} style={{color: accentColor || undefined}}><svg viewBox="0 0 100 100" className="w-24 h-24 mx-auto text-yellow-200" fill="currentColor"><path d="M50 20 Q70 20 80 40 Q90 60 50 90 Q10 60 20 40 Q30 20 50 20" fill="none" stroke="currentColor" strokeWidth="2" /><circle cx="50" cy="40" r="10" opacity="0.5" /><path d="M50 10 L50 20 M40 15 L50 20 L60 15" stroke="currentColor" strokeWidth="2" /></svg></div>);

  // Helper to parse Nimantrak: Label vs Names for coloring
  const getNimantrakParts = (text: string) => {
    const parts = text.split(':');
    if (parts.length > 1) {
        return { label: parts[0] + ':', names: parts.slice(1).join(':') };
    }
    return { label: '', names: text };
  };

  const nimantrak = getNimantrakParts(details.rsvp);

  const getHaldiParts = (text: string) => {
      const firstBreak = text.indexOf('\n');
      if (firstBreak !== -1) {
          return { title: text.substring(0, firstBreak), details: text.substring(firstBreak + 1) };
      }
      return { title: text, details: '' };
  };

  const haldi = getHaldiParts(details.ceremonyDetails);

  // --- Main Content Render Logic (Z-30) ---

  const MainContent = ({ hidePhoto }: { hidePhoto?: boolean }) => (
      <div 
        className={`flex-1 flex flex-col items-center h-full z-30 ${!borderColor ? styles.border : ''} relative transition-all duration-300 text-center ${contentPaddingX} ${contentPaddingB} pt-8`}
        style={borderColor ? { borderColor: borderColor, borderWidth: '2px', borderStyle: 'solid' } : {}}
      >
          
           {/* Scale wrapper for compact mode to ensure fit - Added gap-1 for spacing */}
           <div className={`w-full flex flex-col items-center h-full gap-1 ${(isFloral || isSplit) ? 'justify-evenly py-2' : (compactMode || hasPhoto) ? 'justify-between py-2' : 'justify-between'}`}>

            {/* 1. Headline */}
            <div 
                className={`text-center w-full flex-shrink-0 relative mb-2 transition-all duration-300`}
                style={{ 
                    marginTop: shouldPushContentDown ? '1.5rem' : '0rem' // Approx 24px (0.6cm) gap
                }}
            > 
               {/* FIX: Wrap h1 inside DraggableElement */}
               <DraggableElement field="headline" baseFontSize={1.2}>
                   <h1 
                    className={`text-lg font-bold tracking-widest uppercase ${styles.fontFamily} drop-shadow-sm leading-tight ${!details.textStyles.headline.color ? styles.headline : ''}`} 
                   >
                    {details.headline}
                   </h1>
               </DraggableElement>
            </div>

            {/* 2. Groom */}
            <div className={`w-full flex flex-col items-center ${styles.fontFamily} mt-1 mb-0 ${!details.textStyles.groomName.color ? styles.text : ''}`}> 
                {/* FIX: Wrap h2 inside DraggableElement */}
                <DraggableElement field="groomName" baseFontSize={1.85}>
                    <h2 
                        className={`text-3xl font-bold leading-none mb-1`} 
                    >
                        {details.groomName}
                    </h2>
                </DraggableElement>
                
                {/* Parents details with increased font size and gap */}
                {/* FIX: Wrap p inside DraggableElement */}
                <DraggableElement field="groomParents" baseFontSize={1.0} className="w-full">
                    <p className={`opacity-90 whitespace-pre-line leading-tight max-w-[95%] mx-auto mt-3`}>{details.groomParents}</p>
                </DraggableElement>
            </div>

            {/* Photo Logic */}
            {(template.hasPhoto && details.photo && !hidePhoto) && (
                <div className={`border-2 border-white/50 overflow-hidden shadow-md flex-shrink-0 my-2 ${details.photoStyle.shape === 'circle' ? 'rounded-full' : details.photoStyle.shape === 'rounded' ? 'rounded-lg' : 'rounded-none'}`} style={{ width: '100px', height: '100px', transform: `translate(${details.photoStyle.x}px, ${details.photoStyle.y}px)` }}>
                    <img crossOrigin="anonymous" src={details.photo} alt="Couple" className="w-full h-full object-cover" style={{ transform: `scale(${details.photoStyle.scale})` }} />
                </div>
            )}

            {/* Symbol Logic - Swastik or Ampersand */}
            {!shouldHideCentralSymbol && (
                <div className="my-1">
                   {details.showAmpersand ? (
                       // FIX: Wrap span inside DraggableElement
                       <DraggableElement field="ampersandSymbol" baseFontSize={1.5}>
                           <span 
                              className={`opacity-90 leading-none ${!details.textStyles.ampersandSymbol.color ? styles.accent : ''}`} 
                           >
                             &
                           </span>
                       </DraggableElement>
                   ) : (
                       // FIX: Wrap span inside DraggableElement
                       <DraggableElement field="swastikSymbol" baseFontSize={1.5}>
                           <span 
                              className={`opacity-90 leading-none ${!details.textStyles.swastikSymbol.color ? styles.accent : ''}`}
                           >
                             卐
                           </span>
                       </DraggableElement>
                   )}
                </div>
            )}

            {/* 3. Bride */}
            <div className={`w-full flex flex-col items-center ${styles.fontFamily} mt-2 mb-0 ${!details.textStyles.brideName.color ? styles.text : ''}`}>
                {/* FIX: Wrap h2 inside DraggableElement */}
                <DraggableElement field="brideName" baseFontSize={1.85}>
                    <h2 
                        className={`text-3xl font-bold leading-none mb-1`} 
                    >
                        {details.brideName}
                    </h2>
                </DraggableElement>
                 {/* Parents details with increased font size and gap */}
                 {/* FIX: Wrap p inside DraggableElement */}
                 <DraggableElement field="brideParents" baseFontSize={1.0} className="w-full">
                    <p className={`opacity-90 whitespace-pre-line leading-tight max-w-[95%] mx-auto mt-3`}>{details.brideParents}</p>
                 </DraggableElement>
            </div>

            {/* ... Rest of Sections ... */}
            <div className={`mt-2 mb-1`}>
                {/* FIX: Wrap h3 inside DraggableElement */}
                <DraggableElement field="subHeading" baseFontSize={1.75}>
                    <h3 
                        className={`text-3xl font-bold ${styles.fontFamily} ${!details.textStyles.subHeading.color ? styles.accent : ''}`} 
                    >
                        {details.subHeading}
                    </h3>
                </DraggableElement>
            </div>
            
            {/* FIX: Wrap div inside DraggableElement */}
            <DraggableElement field="message" baseFontSize={1.2} className="w-full">
                <div 
                    className={`font-medium opacity-90 max-w-[95%] mx-auto leading-relaxed whitespace-pre-line mb-2 ${!details.textStyles.message.color ? styles.text : ''}`} 
                >{details.message}</div>
            </DraggableElement>
            
            {details.ceremonyDetails && (
                // FIX: Wrap div inside DraggableElement
                <DraggableElement field="ceremonyDetails" baseFontSize={1.0} className="w-full">
                    <div 
                        className={`font-bold border-y border-current py-1 px-4 opacity-90 whitespace-pre-line leading-relaxed mb-2 ${!details.textStyles.ceremonyDetails.color ? styles.text : ''}`} 
                    >
                        {haldi.title && (
                            <div className={`text-xl font-bold mb-1 ${!details.textStyles.ceremonyDetails.color ? styles.accent : ''} ${styles.fontFamily}`}>{haldi.title}</div>
                        )}
                        <div className={`opacity-90 ${!details.textStyles.ceremonyDetails.color ? styles.text : ''}`}>{haldi.details}</div>
                    </div>
                </DraggableElement>
            )}

            <div className={`text-center w-full mt-0 mb-2 ${!details.textStyles.venueTitle.color ? styles.text : ''}`}>
                {/* FIX: Wrap p inside DraggableElement */}
                <DraggableElement field="venueTitle" baseFontSize={1.5}>
                    <p 
                        className={`text-3xl font-bold ${styles.fontFamily} mb-1 ${!details.textStyles.venueTitle.color ? styles.accent : ''}`} 
                    >
                        {details.venueTitle}
                    </p>
                </DraggableElement>

                <div className="flex flex-col items-center gap-0.5">
                    {/* FIX: Wrap p inside DraggableElement */}
                    <DraggableElement field="venueName" baseFontSize={1.3}>
                        <p 
                            className={`text-sm font-bold leading-tight`} 
                        >{details.venueName}</p>
                    </DraggableElement>
                    {/* FIX: Wrap p inside DraggableElement */}
                    <DraggableElement field="venueAddress" baseFontSize={0.95}>
                        <p 
                            className={`opacity-90 leading-tight`} 
                        >{details.venueAddress}</p>
                    </DraggableElement>
                </div>
            </div>

            {details.rsvp && (
                // FIX: Wrap div inside DraggableElement
                <DraggableElement field="rsvp" baseFontSize={0.85}>
                    <div 
                        className={`font-bold whitespace-pre-line mt-1`} 
                    >
                        {nimantrak.label && (
                            <span 
                                className={`mr-1 ${!details.textStyles.rsvp.color ? styles.accent : ''}`}
                                style={{ color: details.textStyles.rsvp.color }} 
                            >
                                {nimantrak.label}
                            </span>
                        )}
                        <span className={`opacity-80 ${!details.textStyles.rsvp.color ? styles.text : ''}`} style={details.textStyles.rsvp.color ? {color: details.textStyles.rsvp.color} : {}}>{nimantrak.names}</span>
                    </div>
                </DraggableElement>
            )}

           </div>
      </div>
  );

  return (
       <div 
        id={id} 
        className={`relative w-[530px] ${containerHeightClass} flex-shrink-0 shadow-2xl overflow-hidden flex flex-col ${styles.wrapper} print:shadow-none transition-all duration-300 mx-auto`}
        style={{
          ...customStyle,
          ...(customBackground ? { background: customBackground } : {}) 
        }}
       >
          {/* ... Render Layers ... */}
          {renderTexture()}
          {/* ... Decorations ... */}
          {decorType === 'damask-pattern' && <DamaskPattern />}
          {decorType === 'toran' && <Toran />}
          {decorType === 'mandala' && <Mandala />}
          {decorType === 'paithani-border' && <PaithaniBorder />}
          {decorType === 'floral-corner' && <FloralCorner />}
          {decorType === 'royal-arch' && <RoyalArch />}
          {decorType === 'royal-pillars' && <RoyalPillars />}
          {decorType === 'fort-silhouette' && <FortSilhouette />}
          {decorType === 'floral-wreath' && <FloralWreath />}
          {decorType === 'geometric-diagonal' && <GeometricDiagonal />}
          {decorType === 'vertical-border' && <VerticalBorderComponent />}
          {decorType === 'half-mandala-side' && <SideMandalaComponent />}
          {decorType === 'gatefold-lattice' && <GatefoldLattice />}
          {decorType === 'lanterns-hanging' && <LanternsHanging />}
          {layout === 'scroll' && <ScrollRods />}

          {/* Render Side Borders */}
          {renderSideBorder('left')}
          {renderSideBorder('right')}

          {/* Render Bottom Border */}
          {renderBottomBorder()}

          {/* Layout Handlers */}
          {layout === 'split-left' ? (
               <div className="flex h-full w-full relative z-30">
                   <div className={`w-[40%] h-full flex items-center justify-center relative overflow-hidden border-r-2 shadow-xl z-20 ${!borderColor ? 'border-yellow-500/30' : ''}`} style={borderColor ? {borderColor: borderColor} : {}}>
                       <div className="absolute inset-0 bg-cover bg-center" style={{backgroundImage: 'url("https://www.transparenttextures.com/patterns/henna.png")', backgroundColor: 'rgba(0,0,0,0.2)'}}></div>
                       {details.photo ? (
                           <img crossOrigin="anonymous" src={details.photo} className="absolute inset-0 w-full h-full object-cover opacity-90" 
                                style={{ transform: `scale(${details.photoStyle.scale})` }} alt="Couple"/>
                       ) : (
                           <div className="absolute inset-0 bg-gradient-to-br from-yellow-900 to-red-900 flex items-center justify-center p-6">
                                <div className="text-center opacity-60">
                                  <svg viewBox="0 0 100 100" className="w-24 h-24 mx-auto text-yellow-200" fill="currentColor">
                                      <path d="M50 0 L100 50 L50 100 L0 50 Z" />
                                  </svg>
                                </div>
                           </div>
                       )}
                   </div>
                   <div className="w-[60%] h-full">
                       {/* PASS hidePhoto=true to avoid duplicate photo in main text area for split layout */}
                       <MainContent hidePhoto={true} />
                   </div>
               </div>
          ) : layout === 'full-overlay' ? (
              <div className="absolute inset-0 w-full h-full">
                  {details.photo ? (
                      <img crossOrigin="anonymous" src={details.photo} className="absolute inset-0 w-full h-full object-cover" alt="Background" 
                           style={{ transform: `scale(${details.photoStyle.scale}) translate(${details.photoStyle.x}px, ${details.photoStyle.y}px)` }}/>
                  ) : (
                      <div className="absolute inset-0 bg-gray-800 flex items-center justify-center">
                           <FallbackIllustration />
                      </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black/60"></div>
                  <div className="relative z-30 h-full">
                      <MainContent />
                  </div>
              </div>
          ) : (
              <div className={`flex-1 w-full relative ${layout === 'scroll' ? 'py-10 px-10' : ''}`}>
                   <MainContent />
              </div>
          )}

      </div>
  );
};

export default CardPreview;
