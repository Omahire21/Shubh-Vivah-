
import { CustomColors } from '../types';

interface ColorPalette {
  id: string;
  name: string;
  colors: CustomColors;
}

export const COLOR_PALETTES: ColorPalette[] = [
  {
    id: 'deep-maroon',
    name: 'Deep Maroon',
    colors: {
      background: '#4a0404',
      accent: '#fbbf24',
      border: '#7f1d1d',
      text: '#fffbeb', // warm white
      highlight: '#fbbf24', // amber-400
    },
  },
  {
    id: 'royal-navy',
    name: 'Royal Navy',
    colors: {
      background: '#000080',
      accent: '#FFD700',
      border: '#0000cd',
      text: '#f0f9ff', // sky-50
      highlight: '#fcd34d', // yellow-300
    },
  },
  {
    id: 'emerald-green',
    name: 'Emerald Green',
    colors: {
      background: '#064e3b',
      accent: '#34d399',
      border: '#047857',
      text: '#f0fdf4', // mint cream
      highlight: '#fde047', // yellow-300
    },
  },
  {
    id: 'classic-white',
    name: 'Classic White',
    colors: {
      background: '#ffffff',
      accent: '#b91c1c',
      border: '#e5e7eb',
      text: '#1f2937', // gray-800
      highlight: '#b91c1c', // red-700
    },
  },
  {
    id: 'cream-paper',
    name: 'Royal Cream',
    colors: {
      background: '#FFFDD0',
      accent: '#d97706',
      border: '#fcd34d',
      text: '#4a0404', // maroon for consistency
      highlight: '#d97706', // amber-600
    },
  },
  {
    id: 'pure-black',
    name: 'Luxury Black',
    colors: {
      background: '#000000',
      accent: '#fcd34d',
      border: '#333333',
      text: '#f3f4f6', // gray-100
      highlight: '#fbbf24', // amber-400
    },
  },
  {
    id: 'imperial-purple',
    name: 'Imperial Purple',
    colors: {
      background: '#4B0082',
      accent: '#e9d5ff',
      border: '#6d28d9',
      text: '#faf5ff', // purple-50
      highlight: '#fcd34d', // amber-300
    },
  },
  {
    id: 'saffron-orange',
    name: 'Saffron',
    colors: {
      background: '#e65100',
      accent: '#ffe0b2',
      border: '#ff9800',
      text: '#fff7ed', // orange-50
      highlight: '#ffffff', // white for pop against bright orange
    },
  },
  {
    id: 'soft-pink',
    name: 'Pastel Pink',
    colors: {
      background: '#fff0f5',
      accent: '#db2777',
      border: '#fbcfe8',
      text: '#881337', // rose-900
      highlight: '#be123c', // rose-700
    },
  },
  {
    id: 'chocolate-brown',
    name: 'Chocolate',
    colors: {
      background: '#3e2723',
      accent: '#ffcc80',
      border: '#5d4037',
      text: '#fff7ed', // orange-50
      highlight: '#ffcc80', // orange-200
    },
  },
  {
    id: 'teal-depths',
    name: 'Teal Depths',
    colors: {
      background: '#004d40',
      accent: '#5eead4',
      border: '#00695c',
      text: '#ccfbf1', // teal-100
      highlight: '#fde047', // yellow-300
    },
  },
  {
    id: 'charcoal-gray',
    name: 'Charcoal',
    colors: {
      background: '#374151',
      accent: '#9ca3af',
      border: '#4b5563',
      text: '#f9fafb', // gray-50
      highlight: '#fbbf24', // gold for elegant contrast
    },
  }
];
