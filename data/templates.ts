import { TemplateConfig } from '../types';

const createTemplates = (): TemplateConfig[] => {
  const templates: TemplateConfig[] = [];

  // ==========================================
  // 1. UNIQUE DESIGNS (High Detail Structures)
  // ==========================================
  templates.push(
      {
          id: 'unique-royal-arch',
          name: 'Mughal Archway',
          category: 'Unique',
          layout: 'standard',
          hasHeartAccent: true,
          styles: { wrapper: 'bg-[#4a0404]', border: 'border-0', text: 'text-orange-50', accent: 'text-yellow-500', headline: 'text-yellow-200', fontFamily: 'font-traditional', decorativeElement: 'royal-arch', overlayOpacity: 'damask-pattern' }
      },
      {
          id: 'unique-royal-pillars',
          name: 'Golden Pillars',
          category: 'Unique',
          layout: 'standard',
          hasHeartAccent: true,
          styles: { wrapper: 'bg-gradient-to-b from-[#2c0000] to-[#500000]', border: 'border-0', text: 'text-yellow-50', accent: 'text-yellow-400', headline: 'text-yellow-100', fontFamily: 'font-traditional', decorativeElement: 'royal-pillars', overlayOpacity: 'islamic-pattern' }
      },
      {
          id: 'unique-scroll-1',
          name: 'Royal Farman Scroll',
          category: 'Unique',
          layout: 'scroll',
          hasHeartAccent: false,
          styles: { wrapper: 'bg-[#520202]', border: 'border-2 border-yellow-500/50 m-2', text: 'text-yellow-100', accent: 'text-yellow-400', headline: 'text-yellow-400', fontFamily: 'font-script', decorativeElement: 'damask-pattern' }
      },
      {
          id: 'unique-scroll-2',
          name: 'Cream Gold Scroll',
          category: 'Unique',
          layout: 'scroll',
          hasHeartAccent: false,
          styles: { wrapper: 'bg-[#FFF8DC]', border: 'border-2 border-yellow-600/30 m-2', text: 'text-yellow-900', accent: 'text-yellow-600', headline: 'text-yellow-700', fontFamily: 'font-script', decorativeElement: 'damask-pattern' }
      },
      {
          id: 'unique-gatefold-1',
          name: 'Midnight Laser Cut',
          category: 'Unique',
          layout: 'standard',
          hasHeartAccent: false,
          styles: { wrapper: 'bg-gray-900', border: 'border border-yellow-500/30 m-8', text: 'text-yellow-50', accent: 'text-yellow-400', headline: 'text-yellow-200', fontFamily: 'font-sans', decorativeElement: 'gatefold-lattice' },
          customStyle: { backgroundColor: '#1a1a1a' }
      },
      {
          id: 'unique-gatefold-2',
          name: 'Royal Blue Gatefold',
          category: 'Unique',
          layout: 'standard',
          hasHeartAccent: false,
          styles: { wrapper: 'bg-[#002366]', border: 'border border-yellow-400/30 m-8', text: 'text-blue-50', accent: 'text-yellow-400', headline: 'text-yellow-200', fontFamily: 'font-traditional', decorativeElement: 'gatefold-lattice' }
      },
      // DIVINE SPLIT SERIES
      {
          id: 'divine-split-royal-1',
          name: 'Divine Split: Maroon',
          category: 'Unique',
          layout: 'split-left',
          hasPhoto: true,
          hasHeartAccent: true,
          styles: { wrapper: 'bg-[#4a0404]', border: 'border-0', text: 'text-yellow-50', accent: 'text-yellow-500', headline: 'text-yellow-200', fontFamily: 'font-traditional', decorativeElement: 'damask-pattern' }
      },
      {
          id: 'divine-split-royal-2',
          name: 'Divine Split: Gold',
          category: 'Unique',
          layout: 'split-left',
          hasPhoto: true,
          hasHeartAccent: true,
          styles: { wrapper: 'bg-[#B8860B]', border: 'border-0', text: 'text-red-950', accent: 'text-red-800', headline: 'text-red-900', fontFamily: 'font-traditional', decorativeElement: 'silk-texture' }
      },
      {
          id: 'divine-split-royal-3',
          name: 'Divine Split: Navy',
          category: 'Unique',
          layout: 'split-left',
          hasPhoto: true,
          hasHeartAccent: true,
          styles: { wrapper: 'bg-[#0f172a]', border: 'border-0', text: 'text-slate-200', accent: 'text-yellow-500', headline: 'text-yellow-200', fontFamily: 'font-traditional', decorativeElement: 'islamic-pattern' }
      },
       {
          id: 'divine-split-royal-4',
          name: 'Divine Split: Emerald',
          category: 'Unique',
          layout: 'split-left',
          hasPhoto: true,
          hasHeartAccent: true,
          styles: { wrapper: 'bg-[#064e3b]', border: 'border-0', text: 'text-emerald-50', accent: 'text-yellow-400', headline: 'text-emerald-100', fontFamily: 'font-traditional', decorativeElement: 'damask-pattern' }
      },
      {
          id: 'divine-split-royal-5',
          name: 'Maharani Split',
          category: 'Unique',
          layout: 'split-left',
          hasPhoto: true,
          hasHeartAccent: true,
          styles: { wrapper: 'bg-[#800020]', border: 'border-0', text: 'text-orange-50', accent: 'text-orange-400', headline: 'text-orange-200', fontFamily: 'font-hindi', decorativeElement: 'mandala' }
      }
  );

  // ==========================================
  // 2. MODERN LUXURY (Colorful & Premium)
  // ==========================================
  const modernLuxury = [
    { id: 'mod-lux-1', name: 'Obsidian Gold', bg: 'bg-black', border: 'border-4 border-yellow-500 double', decor: 'damask-pattern', text: 'text-yellow-50', hasHeart: true },
    { id: 'mod-lux-2', name: 'Royal Violet', bg: 'bg-violet-900', border: 'border-y-4 border-yellow-400', decor: 'geometric-diagonal', text: 'text-violet-50', hasHeart: true },
    { id: 'mod-lux-3', name: 'Emerald Green Geometric', bg: 'bg-[#047857]', border: 'border-4 border-green-300', decor: 'geometric-diagonal', text: 'text-green-50', hasHeart: true },
    { id: 'mod-lux-4', name: 'Burgundy Rose', bg: 'bg-[#500000]', border: 'border-double border-4 border-rose-300', decor: 'silk-texture', text: 'text-rose-50', hasHeart: true },
    { id: 'mod-lux-5', name: 'Emerald Luxe', bg: 'bg-[#064e3b]', border: 'border-4 border-yellow-500/50', decor: 'royal-arch', text: 'text-emerald-50', hasHeart: true },
    { id: 'mod-lux-6', name: 'Matte Black', bg: 'bg-neutral-900', border: 'border border-white/20', decor: 'none', text: 'text-gray-100', hasHeart: true },
    { id: 'mod-lux-7', name: 'Violet Gold', bg: 'bg-[#4B0082]', border: 'border-4 border-yellow-500', decor: 'mandala', text: 'text-yellow-50', hasHeart: true },
    { id: 'mod-lux-8', name: 'Crimson Modern', bg: 'bg-[#8B0000]', border: 'border-x-8 border-black/30', decor: 'geometric-diagonal', text: 'text-red-50', hasHeart: true },
    { id: 'mod-lux-9', name: 'Carbon Fiber', bg: 'bg-[#1a1a1a]', border: 'border-x-4 border-yellow-500', decor: 'geometric-diagonal', text: 'text-gray-200', hasHeart: true },
    { id: 'mod-lux-10', name: 'Golden Night', bg: 'bg-[#1e1b4b]', border: 'border-0', decor: 'royal-pillars', text: 'text-indigo-50', hasHeart: true },
    // 10 MORE MODERN LUXURY DESIGNS
    { id: 'mod-lux-11', name: 'Aqua Zen', bg: 'bg-[#004d40]', border: 'border-2 border-cyan-300', decor: 'floral-wreath', text: 'text-cyan-50', hasHeart: true },
    { id: 'mod-lux-12', name: 'Rose Gold Shimmer', bg: 'bg-[#5a1b2a]', border: 'border-y-4 border-pink-300', decor: 'silk-texture', text: 'text-pink-100', hasHeart: true },
    { id: 'mod-lux-13', name: 'Deep Purple Galaxy', bg: 'bg-[#1a0033]', border: 'border-4 border-purple-500', decor: 'stars', text: 'text-purple-100', hasHeart: true },
    { id: 'mod-lux-14', name: 'Forest Green Velvet', bg: 'bg-[#013220]', border: 'border-8 border-yellow-600', decor: 'damask-pattern', text: 'text-emerald-50', hasHeart: true },
    { id: 'mod-lux-15', name: 'Charcoal Elegance', bg: 'bg-[#36454F]', border: 'border-double border-4 border-white/50', decor: 'geometric-diagonal', text: 'text-gray-100', hasHeart: true },
    { id: 'mod-lux-16', name: 'Sunrise Orange', bg: 'bg-[#ff7f50]', border: 'border-4 border-yellow-300', decor: 'none', text: 'text-white', hasHeart: true },
    { id: 'mod-lux-17', name: 'Ocean Wave Blue', bg: 'bg-[#0077b6]', border: 'border-x-4 border-white', decor: 'waves', text: 'text-blue-50', hasHeart: true },
    { id: 'mod-lux-18', name: 'Golden Sand', bg: 'bg-[#F4A460]', border: 'border-2 border-[#b8860b]', decor: 'geometric', text: 'text-amber-900', hasHeart: true },
    { id: 'mod-lux-19', name: 'Lavender Mist', bg: 'bg-[#E6E6FA]', border: 'border-dashed border-2 border-purple-300', decor: 'floral', text: 'text-purple-900', hasHeart: true },
    { id: 'mod-lux-20', name: 'Ruby Black', bg: 'bg-[#4a0404]', border: 'border-8 border-red-900', decor: 'damask-pattern', text: 'text-red-50', hasHeart: true }
  ];

  modernLuxury.forEach(m => {
      templates.push({
          id: m.id,
          name: m.name,
          category: 'Modern',
          layout: 'standard',
          hasHeartAccent: m.hasHeart,
          styles: {
              wrapper: m.bg,
              border: `${m.border} m-4`,
              text: m.text,
              accent: 'text-yellow-400',
              headline: 'text-yellow-200',
              fontFamily: 'font-serif', // Use serif for premium look
              decorativeElement: m.decor as any
          }
      });
  });


  // ==========================================
  // 3. PREMIUM PHOTO CARDS
  // ==========================================
  templates.push(
    {
      id: 'photo-royal-frame-gold',
      name: 'Royal Gold Frame',
      category: 'Photo Cards',
      layout: 'standard',
      hasPhoto: true,
      hasHeartAccent: true,
      styles: { wrapper: 'bg-[#2a0a10]', border: 'border-[8px] border-yellow-500 m-2 outline outline-2 outline-yellow-600', text: 'text-yellow-50', accent: 'text-yellow-400', headline: 'text-yellow-200', fontFamily: 'font-traditional', decorativeElement: 'royal-arch' }
    },
    {
      id: 'photo-vignette-classic',
      name: 'Vintage Vignette',
      category: 'Photo Cards',
      layout: 'full-overlay',
      hasPhoto: true,
      hasHeartAccent: true,
      styles: { wrapper: 'bg-black', border: 'border-4 border-white/20 m-4', text: 'text-white', accent: 'text-pink-300', headline: 'text-pink-100', fontFamily: 'font-script', decorativeElement: 'none' }
    },
    {
      id: 'photo-overlay-gold',
      name: 'Golden Haze Overlay',
      category: 'Photo Cards',
      layout: 'full-overlay',
      hasPhoto: true,
      hasHeartAccent: true,
      styles: { wrapper: 'bg-black', border: 'border-2 border-yellow-400/50 m-2', text: 'text-yellow-50', accent: 'text-yellow-400', headline: 'text-yellow-200', fontFamily: 'font-traditional', decorativeElement: 'none' }
    },
    {
      id: 'photo-polaroid-premium',
      name: 'Premium Polaroid',
      category: 'Photo Cards',
      layout: 'polaroid',
      hasPhoto: true,
      hasHeartAccent: true,
      styles: { wrapper: 'bg-gradient-to-br from-gray-100 to-gray-300', border: 'border-0', text: 'text-gray-800', accent: 'text-gray-600', headline: 'text-gray-900', fontFamily: 'font-script', decorativeElement: 'silk-texture' }
    },
    {
      id: 'photo-circle-luxury',
      name: 'Luxury Circle Frame',
      category: 'Photo Cards',
      layout: 'standard',
      hasPhoto: true,
      hasHeartAccent: true,
      styles: { wrapper: 'bg-[#1a1a1a]', border: 'border-double border-4 border-yellow-600 m-4', text: 'text-gray-200', accent: 'text-yellow-500', headline: 'text-yellow-100', fontFamily: 'font-traditional', decorativeElement: 'islamic-pattern' }
    },
    {
      id: 'photo-split-modern-dark',
      name: 'Modern Dark Split',
      category: 'Photo Cards',
      layout: 'split-left',
      hasPhoto: true,
      hasHeartAccent: true,
      styles: { wrapper: 'bg-zinc-900', border: 'border-0', text: 'text-zinc-300', accent: 'text-zinc-500', headline: 'text-white', fontFamily: 'font-sans', decorativeElement: 'none' }
    },
    {
      id: 'photo-card-blush-arch',
      name: 'Blush Arch Photo',
      category: 'Photo Cards',
      layout: 'standard',
      hasPhoto: true,
      hasHeartAccent: true,
      styles: { wrapper: 'bg-rose-50', border: 'border-4 border-rose-200 m-3', text: 'text-rose-900', accent: 'text-rose-400', headline: 'text-rose-800', fontFamily: 'font-traditional', decorativeElement: 'royal-arch' }
    },
    {
      id: 'photo-card-mint-minimal',
      name: 'Mint Minimal Photo',
      category: 'Photo Cards',
      layout: 'standard',
      hasPhoto: true,
      hasHeartAccent: true,
      styles: { wrapper: 'bg-emerald-50', border: 'border-2 border-emerald-100 m-6', text: 'text-emerald-900', accent: 'text-emerald-600', headline: 'text-emerald-800', fontFamily: 'font-sans', decorativeElement: 'none' }
    },
    {
      id: 'photo-card-midnight-sparkle',
      name: 'Midnight Sparkle',
      category: 'Photo Cards',
      layout: 'full-overlay',
      hasPhoto: true,
      hasHeartAccent: true,
      styles: { wrapper: 'bg-blue-950', border: 'border-0', text: 'text-blue-50', accent: 'text-yellow-300', headline: 'text-yellow-100', fontFamily: 'font-script', decorativeElement: 'none' }
    },
    {
      id: 'photo-card-rustic-wood',
      name: 'Rustic Charm',
      category: 'Photo Cards',
      layout: 'standard',
      hasPhoto: true,
      hasHeartAccent: true,
      styles: { wrapper: 'bg-[#5c4033]', border: 'border-4 border-[#3e2b22] m-2', text: 'text-orange-100', accent: 'text-orange-300', headline: 'text-orange-200', fontFamily: 'font-traditional', decorativeElement: 'damask-pattern' }
    },
    // 9 MORE PHOTO CARDS
    {
      id: 'photo-card-11',
      name: 'Golden Leaf Overlay',
      category: 'Photo Cards',
      layout: 'full-overlay',
      hasPhoto: true,
      hasHeartAccent: true,
      styles: { wrapper: 'bg-[#1a1a1a]', border: 'border-0', text: 'text-yellow-50', accent: 'text-yellow-400', headline: 'text-yellow-200', fontFamily: 'font-traditional', decorativeElement: 'floral-wreath' }
    },
    {
      id: 'photo-card-12',
      name: 'Art Deco Frame',
      category: 'Photo Cards',
      layout: 'standard',
      hasPhoto: true,
      hasHeartAccent: true,
      styles: { wrapper: 'bg-[#2F4F4F]', border: 'border-8 border-gray-400 m-2', text: 'text-gray-100', accent: 'text-yellow-300', headline: 'text-yellow-100', fontFamily: 'font-serif', decorativeElement: 'geometric-diagonal' }
    },
    {
      id: 'photo-card-13',
      name: 'Purple Haze Split',
      category: 'Photo Cards',
      layout: 'split-left',
      hasPhoto: true,
      hasHeartAccent: true,
      styles: { wrapper: 'bg-[#3b0764]', border: 'border-0', text: 'text-purple-50', accent: 'text-purple-300', headline: 'text-purple-100', fontFamily: 'font-sans', decorativeElement: 'damask-pattern' }
    },
    {
      id: 'photo-card-14',
      name: 'Vintage Film Strip',
      category: 'Photo Cards',
      layout: 'polaroid',
      hasPhoto: true,
      hasHeartAccent: true,
      styles: { wrapper: 'bg-[#f0f0f0]', border: 'border-4 border-gray-400 m-2', text: 'text-gray-700', accent: 'text-gray-500', headline: 'text-gray-900', fontFamily: 'font-script', decorativeElement: 'none' }
    },
    {
      id: 'photo-card-15',
      name: 'Emerald Frame Classic',
      category: 'Photo Cards',
      layout: 'standard',
      hasPhoto: true,
      hasHeartAccent: true,
      styles: { wrapper: 'bg-[#064e3b]', border: 'border-double border-6 border-emerald-300 m-4', text: 'text-emerald-50', accent: 'text-yellow-400', headline: 'text-yellow-200', fontFamily: 'font-traditional', decorativeElement: 'royal-pillars' }
    },
    {
      id: 'photo-card-16',
      name: 'Crimson Vignette',
      category: 'Photo Cards',
      layout: 'full-overlay',
      hasPhoto: true,
      hasHeartAccent: true,
      styles: { wrapper: 'bg-[#800000]', border: 'border-0', text: 'text-red-50', accent: 'text-pink-300', headline: 'text-pink-100', fontFamily: 'font-script', decorativeElement: 'none' }
    },
    {
      id: 'photo-card-17',
      name: 'Modern Gold Split',
      category: 'Photo Cards',
      layout: 'split-left',
      hasPhoto: true,
      hasHeartAccent: true,
      styles: { wrapper: 'bg-[#ffd700]', border: 'border-0', text: 'text-gray-800', accent: 'text-gray-600', headline: 'text-black', fontFamily: 'font-sans', decorativeElement: 'damask-pattern' }
    },
    {
      id: 'photo-card-18',
      name: 'Floral Teal Overlay', // Renamed from Peacock Feather Overlay
      category: 'Photo Cards',
      layout: 'full-overlay',
      hasPhoto: true,
      hasHeartAccent: true,
      styles: { wrapper: 'bg-[#004d40]', border: 'border-0', text: 'text-teal-50', accent: 'text-yellow-400', headline: 'text-yellow-200', fontFamily: 'font-traditional', decorativeElement: 'floral-wreath' } // Replaced peacock-side
    },
    {
      id: 'photo-card-19',
      name: 'Minimal White Photo',
      category: 'Photo Cards',
      layout: 'standard',
      hasPhoto: true,
      hasHeartAccent: true,
      styles: { wrapper: 'bg-white', border: 'border-2 border-gray-200 m-4', text: 'text-gray-800', accent: 'text-gray-500', headline: 'text-black', fontFamily: 'font-sans', decorativeElement: 'none' }
    }
  );

  // ==========================================
  // 4. ROYAL COLLECTION (Extended to 22 Variations)
  // ==========================================
  const royalSchemes = [
    { bg: 'bg-[#4a0404]', name: 'Crimson', decor: 'damask-pattern', hasHeart: true },
    { bg: 'bg-[#2e1065]', name: 'Imperial', decor: 'islamic-pattern', hasHeart: true },
    { bg: 'bg-[#0f172a]', name: 'Midnight', decor: 'damask-pattern', hasHeart: true },
    { bg: 'bg-[#3b1c0a]', name: 'Chocolate', decor: 'silk-texture', hasHeart: true },
    { bg: 'bg-[#064e3b]', name: 'Emerald', decor: 'damask-pattern', hasHeart: true },
    { bg: 'bg-[#000000]', name: 'Onyx', decor: 'royal-arch', hasHeart: true },
    { bg: 'bg-[#4b0082]', name: 'Indigo', decor: 'royal-pillars', hasHeart: true },
    { bg: 'bg-[#800000]', name: 'Maroon', decor: 'mandala', hasHeart: true },
    { bg: 'bg-[#0f766e]', name: 'Teal Elegance', decor: 'royal-pillars', hasHeart: true }, // REPLACED Royal Sapphire
    { bg: 'bg-[#556b2f]', name: 'Olive Gold', decor: 'damask-pattern', hasHeart: true },
    { bg: 'bg-[#8b4513]', name: 'Bronze', decor: 'royal-pillars', hasHeart: true },
    { bg: 'bg-[#708090]', name: 'Slate Royal', decor: 'islamic-pattern', hasHeart: true },
    // 10 MORE ROYAL DESIGNS
    { bg: 'bg-[#6a0518]', name: 'Ruby Grand', decor: 'royal-arch', hasHeart: true },
    { bg: 'bg-[#1e1b4b]', name: 'Sapphire Night', decor: 'islamic-pattern', hasHeart: true },
    { bg: 'bg-[#2d001e]', name: 'Violet Empire', decor: 'gatefold-lattice', hasHeart: false }, // Gatefold often don't have heart
    { bg: 'bg-[#4e342e]', name: 'Coffee Palace', decor: 'silk-texture', hasHeart: true },
    { bg: 'bg-[#0b5c00]', name: 'Emerald Kingdom', decor: 'royal-pillars', hasHeart: true },
    { bg: 'bg-[#1c1c1c]', name: 'Onyx Gem', decor: 'geometric-diagonal', hasHeart: true },
    { bg: 'bg-[#311b92]', name: 'Amethyst Royal', decor: 'mandala', hasHeart: true },
    { bg: 'bg-[#8b0000]', name: 'Garnet', decor: 'paithani-border', hasHeart: false }, // Paithani often uses || श्री ||
    { bg: 'bg-[#006064]', name: 'Cyan Dynasty', decor: 'floral-wreath', hasHeart: true },
    { bg: 'bg-[#b8860b]', name: 'Golden Sun', decor: 'toran', hasHeart: true }
  ];

  royalSchemes.forEach((s, i) => {
    templates.push({
      id: `royal-gen-${i}`,
      name: `Royal ${s.name}`,
      category: 'Royal',
      layout: 'standard',
      hasHeartAccent: s.hasHeart,
      styles: {
        wrapper: s.bg,
        border: 'border-[6px] border-yellow-500 m-4 border-double',
        text: 'text-white',
        accent: 'text-yellow-400',
        headline: 'text-yellow-200',
        fontFamily: 'font-traditional',
        decorativeElement: s.decor as any,
      }
    });
  });

  // ==========================================
  // 5. FLORAL COLLECTION (Extended to 20 Variations)
  // ==========================================
  const floralStyles = [
      { bg: 'bg-pink-50', border: 'border-pink-200', text: 'text-pink-900', name: 'Blush', hasHeart: true },
      { bg: 'bg-amber-50', border: 'border-amber-200', text: 'text-amber-900', name: 'Cream', hasHeart: true },
      { bg: 'bg-sky-50', border: 'border-sky-200', text: 'text-sky-900', name: 'Sky', hasHeart: true },
      { bg: 'bg-rose-100', border: 'border-rose-300', text: 'text-rose-900', name: 'Rose', hasHeart: true },
      { bg: 'bg-purple-50', border: 'border-purple-200', text: 'text-purple-900', name: 'Lavender', hasHeart: true },
      { bg: 'bg-green-50', border: 'border-green-200', text: 'text-green-900', name: 'Mint', hasHeart: true },
      { bg: 'bg-yellow-50', border: 'border-yellow-200', text: 'text-yellow-900', name: 'Sunshine', hasHeart: true },
      { bg: 'bg-orange-50', border: 'border-orange-200', text: 'text-orange-900', name: 'Peach', hasHeart: true },
      { bg: 'bg-teal-50', border: 'border-teal-200', text: 'text-teal-900', name: 'Aqua', hasHeart: true },
      { bg: 'bg-white', border: 'border-gray-200', text: 'text-gray-800', name: 'Classic White', hasHeart: true },
      // 10 MORE FLORAL DESIGNS
      { bg: 'bg-[#fce4ec]', border: 'border-pink-100', text: 'text-pink-800', name: 'Cherry Blossom', hasHeart: true },
      { bg: 'bg-[#e0f2f1]', border: 'border-teal-100', text: 'text-teal-800', name: 'Jade Floral', hasHeart: true },
      { bg: 'bg-[#fffde7]', border: 'border-lime-100', text: 'text-lime-800', name: 'Lemon Bloom', hasHeart: true },
      { bg: 'bg-[#ede7f6]', border: 'border-indigo-100', text: 'text-indigo-800', name: 'Indigo Petal', hasHeart: true },
      { bg: 'bg-[#ffebee]', border: 'border-red-100', text: 'text-red-800', name: 'Crimson Rose', hasHeart: true },
      { bg: 'bg-[#f3e5f5]', border: 'border-deep-purple-100', text: 'text-deep-purple-800', name: 'Violet Bloom', hasHeart: true },
      { bg: 'bg-[#e0f7fa]', border: 'border-cyan-100', text: 'text-cyan-800', name: 'Cyan Floral', hasHeart: true },
      { bg: 'bg-[#e8f5e9]', border: 'border-light-green-100', text: 'text-light-green-800', name: 'Green Garden', hasHeart: true },
      { bg: 'bg-[#fff3e0]', border: 'border-orange-100', text: 'text-orange-800', name: 'Autumn Floral', hasHeart: true },
      { bg: 'bg-[#e3f2fd]', border: 'border-blue-100', text: 'text-blue-800', name: 'Bluebell', hasHeart: true }
  ];

  floralStyles.forEach((f, i) => {
      const allowPhoto = i % 2 === 0; 
      const decorType = i % 3 === 0 ? 'floral-wreath' : 'floral-corner';
      templates.push({
          id: `floral-gen-${i}`,
          name: `${f.name} Floral`,
          category: 'Floral',
          layout: 'standard',
          hasPhoto: allowPhoto,
          hasHeartAccent: f.hasHeart,
          styles: {
              wrapper: f.bg,
              border: `border-2 ${f.border} m-4`,
              text: f.text,
              accent: 'text-gray-400',
              headline: f.text,
              fontFamily: 'font-script',
              decorativeElement: decorType as any,
          }
      });
  });

  // ==========================================
  // 6. MARATHI & TRADITIONAL
  // ==========================================
  
  // New Marathi Photo Cards
  templates.push(
      {
          id: 'marathi-photo-1',
          name: 'Peshwai Photo Royal',
          category: 'Marathi',
          layout: 'standard',
          hasPhoto: true,
          hasHeartAccent: true,
          styles: { wrapper: 'bg-[#cc5500]', border: 'border-2 border-yellow-200 m-2', text: 'text-white', accent: 'text-yellow-300', headline: 'text-yellow-100', fontFamily: 'font-hindi', decorativeElement: 'fort-silhouette' }
      },
      {
          id: 'marathi-photo-2',
          name: 'Paithani Photo Frame',
          category: 'Marathi',
          layout: 'standard',
          hasPhoto: true,
          hasHeartAccent: false, // Paithani often uses || श्री ||
          styles: { wrapper: 'bg-[#4B0082]', border: 'border-2 border-yellow-500 m-2', text: 'text-yellow-50', accent: 'text-yellow-400', headline: 'text-yellow-200', fontFamily: 'font-hindi', decorativeElement: 'paithani-border' }
      },
      {
          id: 'marathi-photo-3',
          name: 'Maratha Fort Photo',
          category: 'Marathi',
          layout: 'standard',
          hasPhoto: true,
          hasHeartAccent: true,
          styles: { wrapper: 'bg-[#8B0000]', border: 'border-2 border-white/30 m-2', text: 'text-white', accent: 'text-yellow-400', headline: 'text-white', fontFamily: 'font-hindi', decorativeElement: 'fort-silhouette' }
      },
      {
          id: 'marathi-photo-4',
          name: 'Golden Marathi Photo',
          category: 'Marathi',
          layout: 'standard',
          hasPhoto: true,
          hasHeartAccent: true,
          styles: { wrapper: 'bg-[#FFD700]', border: 'border-2 border-red-900/30 m-2', text: 'text-red-900', accent: 'text-red-700', headline: 'text-red-800', fontFamily: 'font-hindi', decorativeElement: 'toran' }
      },
      {
          id: 'marathi-photo-5',
          name: 'Shivkalin Photo Classic',
          category: 'Marathi',
          layout: 'standard',
          hasPhoto: true,
          hasHeartAccent: true,
          styles: { wrapper: 'bg-[#8B4513]', border: 'border-2 border-orange-200 m-2', text: 'text-orange-50', accent: 'text-orange-300', headline: 'text-orange-100', fontFamily: 'font-hindi', decorativeElement: 'royal-arch' }
      }
  );

  const traditionalColors = [
    // Strong Fort Styles (Shivkalin)
    { bg: '#8B0000', name: 'Shivkalin Red', decor: 'fort-silhouette', hasHeart: true },
    { bg: '#cc5500', name: 'Peshwai Orange', decor: 'fort-silhouette', hasHeart: true },
    { bg: '#DC143C', name: 'Maratha Crimson', decor: 'fort-silhouette', hasHeart: true },
    { bg: '#8B4513', name: 'Raigad Brown', decor: 'fort-silhouette', hasHeart: true },
    { bg: '#00008B', name: 'Raigad Blue', decor: 'fort-silhouette', hasHeart: true },
    
    // Unique Violet/Yellow Combinations
    { bg: '#4B0082', name: 'Royal Violet', decor: 'fort-silhouette', hasHeart: true },
    { bg: '#FFD700', name: 'Maratha Gold', decor: 'toran', hasHeart: true },
    
    // Traditional Decor
    { bg: '#B22222', name: 'Brick Red', decor: 'toran', hasHeart: true },
    { bg: '#800080', name: 'Imperial Purple', decor: 'toran', hasHeart: true },
    { bg: '#FF4500', name: 'Saffron Glow', decor: 'mandala', hasHeart: true },
    { bg: '#2F4F4F', name: 'Dark Slate', decor: 'toran', hasHeart: true },
    // 10 MORE MARATHI DESIGNS
    { bg: '#FF6347', name: 'Tomato Red Fest', decor: 'toran', hasHeart: true },
    { bg: '#DAA520', name: 'Goldenrod', decor: 'paithani-border', hasHeart: false },
    { bg: '#7B68EE', name: 'Medium Slate Blue', decor: 'fort-silhouette', hasHeart: true },
    { bg: '#2E8B57', name: 'Sea Green', decor: 'mandala', hasHeart: true },
    { bg: '#CD853F', name: 'Peru Brown', decor: 'royal-arch', hasHeart: true },
    { bg: '#D2B48C', name: 'Tan Marathi', decor: 'silk-texture', hasHeart: true },
    { bg: '#B0C4DE', name: 'Light Steel Blue', decor: 'islamic-pattern', hasHeart: true },
    { bg: '#8B008B', name: 'Dark Magenta Floral', decor: 'floral-corner', hasHeart: true }, // Replaced peacock-side
    { bg: '#A9A9A9', name: 'Dark Gray Fort', decor: 'fort-silhouette', hasHeart: true },
    { bg: '#F5DEB3', name: 'Wheat Traditional', decor: 'toran', hasHeart: true }
  ];

  traditionalColors.forEach((t, i) => {
     // Special handling for Gold background to ensure text visibility
     const isGold = t.name === 'Maratha Gold';
     const textCol = isGold ? 'text-red-900' : 'text-white';
     const accentCol = isGold ? 'text-red-700' : 'text-yellow-300';
     const headCol = isGold ? 'text-red-800' : 'text-yellow-100';

     templates.push({
        id: `marathi-new-${i}`,
        name: t.name,
        category: 'Marathi',
        layout: 'standard',
        hasHeartAccent: t.hasHeart,
        styles: {
            wrapper: 'bg-white',
            border: `border-2 ${isGold ? 'border-red-900/30' : 'border-white/40'} m-2`,
            text: textCol,
            accent: accentCol,
            headline: headCol,
            fontFamily: 'font-hindi',
            decorativeElement: t.decor as any
        },
        customStyle: { backgroundColor: t.bg }
     });
  });

  // ==========================================
  // 7. HINDU TRADITIONAL (New Category)
  // ==========================================
  templates.push(
      {
          id: 'hindu-trad-1',
          name: 'Purple Floral Paithani', // Renamed from Purple Peacock Paithani
          category: 'Hindu Traditional',
          layout: 'standard',
          hasHeartAccent: false, // Paithani often uses || श्री ||
          styles: { wrapper: 'bg-[#4a148c]', border: 'border-x-8 border-yellow-500', text: 'text-yellow-50', accent: 'text-yellow-400', headline: 'text-yellow-200', fontFamily: 'font-hindi', decorativeElement: 'paithani-border' } // Replaced peacock-side
      },
      {
          id: 'hindu-trad-2',
          name: 'Deep Maroon Mandala',
          category: 'Hindu Traditional',
          layout: 'standard',
          hasHeartAccent: true,
          styles: { wrapper: 'bg-[#560000]', border: 'border-0', text: 'text-orange-50', accent: 'text-orange-400', headline: 'text-orange-200', fontFamily: 'font-hindi', decorativeElement: 'half-mandala-side' }
      },
      {
          id: 'hindu-trad-3',
          name: 'Navy Blue Royal',
          category: 'Hindu Traditional',
          layout: 'standard',
          hasHeartAccent: true,
          styles: { wrapper: 'bg-[#000051]', border: 'border-0', text: 'text-yellow-50', accent: 'text-yellow-400', headline: 'text-yellow-100', fontFamily: 'font-traditional', decorativeElement: 'vertical-border' }
      },
      {
          id: 'hindu-trad-4',
          name: 'Royal Magenta Floral', // Renamed from Royal Magenta Peacock
          category: 'Hindu Traditional',
          layout: 'standard',
          hasHeartAccent: true,
          styles: { wrapper: 'bg-[#880e4f]', border: 'border-4 border-yellow-400/50 m-2', text: 'text-white', accent: 'text-yellow-300', headline: 'text-yellow-100', fontFamily: 'font-hindi', decorativeElement: 'floral-wreath' } // Replaced peacock-side
      },
      {
          id: 'hindu-trad-5',
          name: 'Golden Cream Mandala',
          category: 'Hindu Traditional',
          layout: 'standard',
          hasHeartAccent: true,
          styles: { wrapper: 'bg-[#fff8e1]', border: 'border-x-8 border-red-800', text: 'text-red-900', accent: 'text-red-700', headline: 'text-red-800', fontFamily: 'font-traditional', decorativeElement: 'half-mandala-side' }
      },
      {
          id: 'hindu-trad-6',
          name: 'Dark Green Traditional',
          category: 'Hindu Traditional',
          layout: 'standard',
          hasHeartAccent: true,
          styles: { wrapper: 'bg-[#1b5e20]', border: 'border-2 border-yellow-500 m-2', text: 'text-yellow-50', accent: 'text-yellow-400', headline: 'text-yellow-100', fontFamily: 'font-hindi', decorativeElement: 'toran' }
      },
      {
          id: 'hindu-trad-7',
          name: 'Chocolate Ornamental',
          category: 'Hindu Traditional',
          layout: 'standard',
          hasHeartAccent: true,
          styles: { wrapper: 'bg-[#3e2723]', border: 'border-0', text: 'text-orange-100', accent: 'text-orange-400', headline: 'text-orange-200', fontFamily: 'font-traditional', decorativeElement: 'vertical-border' }
      },
      // --- NEW HINDU TRADITIONAL DESIGNS (15) ---
      {
          id: 'hindu-trad-8',
          name: 'Divine Red Mandala',
          category: 'Hindu Traditional',
          layout: 'standard',
          hasHeartAccent: true,
          styles: { wrapper: 'bg-[#b71c1c]', border: 'border-4 border-yellow-500/50 m-2', text: 'text-yellow-50', accent: 'text-yellow-400', headline: 'text-yellow-100', fontFamily: 'font-hindi', decorativeElement: 'mandala' }
      },
      {
          id: 'hindu-trad-9',
          name: 'Saffron Toran',
          category: 'Hindu Traditional',
          layout: 'standard',
          hasHeartAccent: true,
          styles: { wrapper: 'bg-[#ff6f00]', border: 'border-2 border-yellow-200 m-2', text: 'text-white', accent: 'text-yellow-100', headline: 'text-yellow-50', fontFamily: 'font-hindi', decorativeElement: 'toran' }
      },
      {
          id: 'hindu-trad-10',
          name: 'Royal Teal Floral', // Renamed from Royal Teal Peacock
          category: 'Hindu Traditional',
          layout: 'standard',
          hasHeartAccent: true,
          styles: { wrapper: 'bg-[#004d40]', border: 'border-2 border-yellow-500 m-3', text: 'text-teal-50', accent: 'text-yellow-400', headline: 'text-yellow-200', fontFamily: 'font-traditional', decorativeElement: 'floral-wreath' } // Replaced peacock-side
      },
      {
          id: 'hindu-trad-11',
          name: 'Magenta Paithani',
          category: 'Hindu Traditional',
          layout: 'standard',
          hasHeartAccent: false, // Paithani often uses || श्री ||
          styles: { wrapper: 'bg-[#880e4f]', border: 'border-0', text: 'text-pink-50', accent: 'text-yellow-400', headline: 'text-yellow-100', fontFamily: 'font-hindi', decorativeElement: 'paithani-border' }
      },
      {
          id: 'hindu-trad-12',
          name: 'Golden Vertical',
          category: 'Hindu Traditional',
          layout: 'standard',
          hasHeartAccent: true,
          styles: { wrapper: 'bg-[#f57f17]', border: 'border-2 border-red-900 m-2', text: 'text-red-950', accent: 'text-red-800', headline: 'text-red-900', fontFamily: 'font-traditional', decorativeElement: 'vertical-border' }
      },
      {
          id: 'hindu-trad-13',
          name: 'Emerald Arch',
          category: 'Hindu Traditional',
          layout: 'standard',
          hasHeartAccent: true,
          styles: { wrapper: 'bg-[#1b5e20]', border: 'border-4 border-yellow-500 double m-4', text: 'text-green-50', accent: 'text-yellow-400', headline: 'text-yellow-100', fontFamily: 'font-traditional', decorativeElement: 'royal-arch' }
      },
      {
          id: 'hindu-trad-14',
          name: 'Wine Pillars',
          category: 'Hindu Traditional',
          layout: 'standard',
          hasHeartAccent: true,
          styles: { wrapper: 'bg-[#4a148c]', border: 'border-0', text: 'text-purple-50', accent: 'text-yellow-400', headline: 'text-yellow-100', fontFamily: 'font-traditional', decorativeElement: 'royal-pillars' }
      },
      {
          id: 'hindu-trad-15',
          name: 'Sandalwood Half-Mandala',
          category: 'Hindu Traditional',
          layout: 'standard',
          hasHeartAccent: true,
          styles: { wrapper: 'bg-[#5d4037]', border: 'border-2 border-orange-200 m-3', text: 'text-orange-50', accent: 'text-orange-300', headline: 'text-orange-100', fontFamily: 'font-hindi', decorativeElement: 'half-mandala-side' }
      },
      {
          id: 'hindu-trad-16',
          name: 'Maroon Damask',
          category: 'Hindu Traditional',
          layout: 'standard',
          hasHeartAccent: true,
          styles: { wrapper: 'bg-[#7f0000]', border: 'border-4 border-yellow-600 m-2', text: 'text-red-50', accent: 'text-yellow-500', headline: 'text-yellow-200', fontFamily: 'font-traditional', decorativeElement: 'damask-pattern' }
      },
      {
          id: 'hindu-trad-17',
          name: 'Coral Floral',
          category: 'Hindu Traditional',
          layout: 'standard',
          hasHeartAccent: true,
          styles: { wrapper: 'bg-[#bf360c]', border: 'border-2 border-yellow-200 m-3', text: 'text-white', accent: 'text-yellow-300', headline: 'text-yellow-100', fontFamily: 'font-script', decorativeElement: 'floral-corner' }
      },
      {
          id: 'hindu-trad-18', // Replaced 'Indigo Lattice' with this new design.
          name: 'Golden Lotus Pond',
          category: 'Hindu Traditional',
          layout: 'standard',
          hasHeartAccent: true,
          styles: { wrapper: 'bg-[#003366]', border: 'border-double border-4 border-yellow-500 m-2', text: 'text-blue-100', accent: 'text-yellow-300', headline: 'text-yellow-100', fontFamily: 'font-script', decorativeElement: 'floral-wreath' }
      },
      {
          id: 'hindu-trad-19',
          name: 'Deep Orange Lanterns',
          category: 'Hindu Traditional',
          layout: 'standard',
          hasHeartAccent: true,
          styles: { wrapper: 'bg-[#e65100]', border: 'border-0', text: 'text-white', accent: 'text-yellow-200', headline: 'text-yellow-100', fontFamily: 'font-hindi', decorativeElement: 'lanterns-hanging' }
      },
      {
          id: 'hindu-trad-20',
          name: 'Copper Fort',
          category: 'Hindu Traditional',
          layout: 'standard',
          hasHeartAccent: true,
          styles: { wrapper: 'bg-[#3e2723]', border: 'border-2 border-orange-300 m-3', text: 'text-orange-100', accent: 'text-orange-400', headline: 'text-orange-200', fontFamily: 'font-hindi', decorativeElement: 'fort-silhouette' }
      },
      {
          id: 'hindu-trad-21',
          name: 'Ruby Silk',
          category: 'Hindu Traditional',
          layout: 'standard',
          hasHeartAccent: true,
          styles: { wrapper: 'bg-[#b00020]', border: 'border-double border-4 border-pink-200 m-2', text: 'text-pink-50', accent: 'text-yellow-300', headline: 'text-yellow-100', fontFamily: 'font-traditional', decorativeElement: 'silk-texture' }
      },
      {
          id: 'hindu-trad-22',
          name: 'Midnight Wreath',
          category: 'Hindu Traditional',
          layout: 'standard',
          hasHeartAccent: true,
          styles: { wrapper: 'bg-[#263238]', border: 'border-2 border-gray-500 m-3', text: 'text-gray-200', accent: 'text-yellow-400', headline: 'text-yellow-100', fontFamily: 'font-script', decorativeElement: 'floral-wreath' }
      },
      // 10 MORE HINDU TRADITIONAL DESIGNS
      {
          id: 'hindu-trad-23',
          name: 'Vibrant Om Chakra',
          category: 'Hindu Traditional',
          layout: 'standard',
          hasHeartAccent: true,
          styles: { wrapper: 'bg-[#FF7043]', border: 'border-4 border-yellow-500/50 m-2', text: 'text-white', accent: 'text-yellow-100', headline: 'text-yellow-50', fontFamily: 'font-hindi', decorativeElement: 'mandala' }
      },
      {
          id: 'hindu-trad-24',
          name: 'Floral Blue Golden', // Renamed from Peacock Blue Golden
          category: 'Hindu Traditional',
          layout: 'standard',
          hasHeartAccent: true,
          styles: { wrapper: 'bg-[#00796B]', border: 'border-2 border-yellow-500 m-3', text: 'text-teal-50', accent: 'text-yellow-400', headline: 'text-yellow-200', fontFamily: 'font-traditional', decorativeElement: 'floral-wreath' } // Replaced peacock-side
      },
      {
          id: 'hindu-trad-25',
          name: 'Crimson Elephants',
          category: 'Hindu Traditional',
          layout: 'standard',
          hasHeartAccent: true,
          styles: { wrapper: 'bg-[#BF360C]', border: 'border-double border-4 border-yellow-300 m-2', text: 'text-white', accent: 'text-yellow-300', headline: 'text-yellow-100', fontFamily: 'font-hindi', decorativeElement: 'vertical-border' }
      },
      {
          id: 'hindu-trad-26',
          name: 'Azure Floral Arch',
          category: 'Hindu Traditional',
          layout: 'standard',
          hasHeartAccent: true,
          styles: { wrapper: 'bg-[#039BE5]', border: 'border-4 border-yellow-500 double m-4', text: 'text-blue-50', accent: 'text-yellow-400', headline: 'text-yellow-100', fontFamily: 'font-traditional', decorativeElement: 'royal-arch' }
      },
      {
          id: 'hindu-trad-27',
          name: 'Forest Gold Pillars',
          category: 'Hindu Traditional',
          layout: 'standard',
          hasHeartAccent: true,
          styles: { wrapper: 'bg-[#388E3C]', border: 'border-0', text: 'text-green-50', accent: 'text-yellow-400', headline: 'text-yellow-100', fontFamily: 'font-traditional', decorativeElement: 'royal-pillars' }
      },
      {
          id: 'hindu-trad-28',
          name: 'Saffron Geometric',
          category: 'Hindu Traditional',
          layout: 'standard',
          hasHeartAccent: true,
          styles: { wrapper: 'bg-[#FFB300]', border: 'border-2 border-red-900 m-2', text: 'text-red-950', accent: 'text-red-800', headline: 'text-red-900', fontFamily: 'font-traditional', decorativeElement: 'geometric-diagonal' }
      },
      {
          id: 'hindu-trad-29',
          name: 'Plum Lotus',
          category: 'Hindu Traditional',
          layout: 'standard',
          hasHeartAccent: true,
          styles: { wrapper: 'bg-[#6A1B9A]', border: 'border-2 border-pink-200 m-3', text: 'text-purple-50', accent: 'text-pink-300', headline: 'text-pink-100', fontFamily: 'font-hindi', decorativeElement: 'floral-wreath' }
      },
      {
          id: 'hindu-trad-30',
          name: 'Rustic Terracotta Fort',
          category: 'Hindu Traditional',
          layout: 'standard',
          hasHeartAccent: true,
          styles: { wrapper: 'bg-[#E64A19]', border: 'border-4 border-orange-300 m-2', text: 'text-white', accent: 'text-orange-400', headline: 'text-orange-200', fontFamily: 'font-hindi', decorativeElement: 'fort-silhouette' }
      },
      {
          id: 'hindu-trad-31',
          name: 'Sunstone Damask',
          category: 'Hindu Traditional',
          layout: 'standard',
          hasHeartAccent: true,
          styles: { wrapper: 'bg-[#FF8A65]', border: 'border-double border-4 border-yellow-500 m-2', text: 'text-red-900', accent: 'text-yellow-300', headline: 'text-yellow-100', fontFamily: 'font-traditional', decorativeElement: 'damask-pattern' }
      },
      {
          id: 'hindu-trad-32',
          name: 'Elegant Brown Mandala',
          category: 'Hindu Traditional',
          layout: 'standard',
          hasHeartAccent: true,
          styles: { wrapper: 'bg-[#4E342E]', border: 'border-2 border-orange-200 m-3', text: 'text-orange-100', accent: 'text-orange-400', headline: 'text-orange-200', fontFamily: 'font-hindi', decorativeElement: 'half-mandala-side' }
      },
      // Final 1 design to reach 150
      {
        id: 'hindu-trad-33',
        name: 'Vedic Gold Frame',
        category: 'Hindu Traditional',
        layout: 'standard',
        hasHeartAccent: true,
        styles: { wrapper: 'bg-[#FFF8DC]', border: 'border-8 border-yellow-600 double m-4', text: 'text-red-900', accent: 'text-red-700', headline: 'text-red-800', fontFamily: 'font-traditional', decorativeElement: 'royal-arch' }
    }
  );

  return templates;
};

export const TEMPLATE_OPTIONS = createTemplates();