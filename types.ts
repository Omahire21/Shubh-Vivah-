import React from 'react';

export interface ElementStyle {
  fontSize: number; // Multiplier (e.g. 1.0, 1.1)
  x: number; // Offset X in px
  y: number; // Offset Y in px
  color?: string; // Hex color code
}

export interface PhotoStyle {
  shape: 'circle' | 'square' | 'rounded';
  scale: number;
  x: number;
  y: number;
}

export type DecorativeElement = 'toran' | 'mandala' | 'floral-corner' | 'paithani-border' | 'gatefold-lattice' | 'royal-arch' | 'royal-pillars' | 'fort-silhouette' | 'floral-wreath' | 'geometric-diagonal' | 'damask-pattern' | 'islamic-pattern' | 'silk-texture' | 'vertical-border' | 'half-mandala-side' | 'lanterns-hanging' | 'none';

export type BottomBorderType = 
  'none' | 'simple-gold' | 'double-gold' | 'ornate-gold' | 'floral-vine' | 
  'mango-paisley' | 'lotus-row' | 'elephants' | 'diyas' | 
  'kalash' | 'om-pattern' | 'swastik-row' | 'ganesha-row' | 'shehnai' | 
  'wedding-dhol' | 'hanging-bells' | 'temple-spire' | 'rangoli' | 'abstract-waves' | 
  'dot-mandala' | 'leafy-scroll' | 'royal-fence' | 'marigold-garland' | 
  'starry-night' | 'hearts-row' | 'geometric-diamonds' | 'lanterns-border';

export type SideBorderType = 
  'none' | 'simple-line-gold' | 'ornate-pillar' | 'floral-creeper' | 
  'mango-motif-stack' | 'elephant-trumpeting' | 
  'lotus-stack' | 'diya-stack' | 'bells-hanging-side' | 'lattice-strip' | 
  'royal-sword' | 'shehnai-vertical' | 'wedding-knot' | 'kalash-stack' | 
  'geometric-zigzag' | 'leafy-branch' | 'star-string' | 'heart-string' | 
  'marigold-string' | 'abstract-curves' | 'dot-line';

export type BackgroundTextureType = 
  'none' | 'paper' | 'canvas' | 'silk' | 'damask' | 'islamic' | 'mandala' | 
  'floral' | 'dots' | 'lines' | 'grunge' | 'marble' | 'wood' | 'stars' | 
  'hearts' | 'glitter' | 'geometric' | 'waves' | 'checkered' | 'honeycomb' | 'lanterns-pattern' |
  'floral-outline' | 'rose-bloom' | 'lotus-petals' | 'vine-leaves' | 'peony-garden';

export interface DecorationStyle {
  type: DecorativeElement;
  opacity: number;
}

export interface BorderStyle {
  type: BottomBorderType;
  opacity: number;
}

export interface SideBorderStyle {
  type: SideBorderType;
  opacity: number;
}

export interface TextureStyle {
  type: BackgroundTextureType;
  opacity: number;
}

export interface CustomColors {
  background: string; // Main Card Background Color
  accent: string;     // Decorations, icons, borders
  border: string;     // Main card border
  text: string;       // General body text color
  highlight: string;  // Headlines, subheadings, symbols color
}

export interface WeddingDetails {
  headline: string;
  brideName: string;
  groomName: string;
  brideParents: string;
  groomParents: string;
  subHeading: string;
  message: string;
  ceremonyDetails: string;
  venueTitle: string;
  venueName: string;
  venueAddress: string;
  rsvp: string;
  photo?: string;
  
  // Styles
  textStyles: {
    headline: ElementStyle;
    brideName: ElementStyle;
    groomName: ElementStyle;
    brideParents: ElementStyle;
    groomParents: ElementStyle;
    subHeading: ElementStyle;
    message: ElementStyle;
    ceremonyDetails: ElementStyle;
    venueTitle: ElementStyle;
    venueName: ElementStyle;
    venueAddress: ElementStyle;
    rsvp: ElementStyle;
    ampersandSymbol: ElementStyle; // Style for the ampersand symbol
    swastikSymbol: ElementStyle; // New: Style for the Swastik symbol
  };
  photoStyle: PhotoStyle;
  decoration: DecorationStyle;
  bottomBorder: BorderStyle;
  leftBorder: SideBorderStyle; 
  rightBorder: SideBorderStyle; 
  backgroundTexture: TextureStyle;
  customColors?: CustomColors; // Optional custom color palette
  showSwastik: boolean; // Toggle Swastik visibility
  showAmpersand: boolean; // Toggle Ampersand visibility, replaces Swastik
}

export interface TemplateConfig {
  id: string;
  name: string;
  category: 'Traditional' | 'Modern' | 'Marathi' | 'Floral' | 'Royal' | 'Unique' | 'Photo Cards' | 'Hindu Traditional';
  layout?: 'standard' | 'scroll' | 'split-left' | 'split-right' | 'polaroid' | 'full-overlay';
  hasPhoto?: boolean; 
  hasHeartAccent?: boolean; // Indicates if this template is suitable for a heart accent
  styles: {
    wrapper: string;
    border: string;
    text: string;
    accent: string;
    headline: string;
    fontFamily: string;
    decorativeElement?: DecorativeElement;
    overlayOpacity?: string;
  };
  customStyle?: React.CSSProperties;
}

const DEFAULT_TEXT_STYLE: ElementStyle = { fontSize: 1, x: 0, y: 0 };

export const INITIAL_DETAILS: WeddingDetails = {
  headline: "|| श्री गणेशाय नमः ||",
  groomName: "चि. आदित्य",
  groomParents: "सौ. सुमित्रा व श्री. सुरेश पाटील\nमु. पो. सातारा, ता. सातारा, जि. सातारा, यांचे जेष्ठ चिरंजीव",
  brideName: "चि. सौ. कां. अनया",
  brideParents: "सौ. सुजाता व श्री. रमेश देशमुख\nमु. पो. कोरेगाव, ता. कोरेगाव, जि. सातारा, यांची जेष्ठ कन्या",
  subHeading: "यांचा शुभविवाह",
  message: "शनिवार दि. २१/०५/२०२२ रोजी दुपारी ०३:१५ मि.\nया शुभ मुहूर्तावर करण्याचे योजिले आहे,तरी आपण उपस्थित राहून \nवधु वरास शुभाशिर्वाद द्यावे ही नम्र विनंती.",
  ceremonyDetails: "हळदी समारंभ\nशनिवार दि. २१/0५/२०२२ रोजी सकाळी ११:३० वा.\n(विवाहस्थळी)",
  venueTitle: "विवाहस्थळ",
  venueName: "अजिंक्यतारा मंगल कार्यालय",
  venueAddress: "पुणे-कोल्हापूर रोड, शेंद्रे, ता. जि. सातारा",
  rsvp: "निमंत्रक: समस्त पाटील व देशमुख परिवार",
  // REMOVED DEFAULT PHOTO
  photo: "", 
  
  textStyles: {
    headline: { ...DEFAULT_TEXT_STYLE, fontSize: 1.2 },
    brideName: { ...DEFAULT_TEXT_STYLE, fontSize: 1.5 },
    groomName: { ...DEFAULT_TEXT_STYLE, fontSize: 1.5 },
    brideParents: { ...DEFAULT_TEXT_STYLE, fontSize: 1.2 },
    groomParents: { ...DEFAULT_TEXT_STYLE, fontSize: 1.2 },
    subHeading: { ...DEFAULT_TEXT_STYLE, fontSize: 1.4 },
    message: { ...DEFAULT_TEXT_STYLE, fontSize: 1.0 },
    ceremonyDetails: { ...DEFAULT_TEXT_STYLE, fontSize: 1.3 },
    venueTitle: { ...DEFAULT_TEXT_STYLE, fontSize: 1.3 },
    venueName: { ...DEFAULT_TEXT_STYLE, fontSize: 1.3},
    venueAddress: { ...DEFAULT_TEXT_STYLE, fontSize: 1.2 },
    rsvp: { ...DEFAULT_TEXT_STYLE, fontSize: 1.5 },
    ampersandSymbol: { ...DEFAULT_TEXT_STYLE, fontSize: 1.8, x: 0, y: 0 }, // Increased default size
    swastikSymbol: { ...DEFAULT_TEXT_STYLE, fontSize: 1.8, x: 0, y: 0 }, // Increased default size
  },
  photoStyle: { shape: 'circle', scale: 1, x: 0, y: 0 },
  decoration: { type: 'toran', opacity: 1 },
  bottomBorder: { type: 'none', opacity: 1 },
  leftBorder: { type: 'none', opacity: 1 },
  rightBorder: { type: 'none', opacity: 1 },
  backgroundTexture: { type: 'none', opacity: 0.1 },
  showSwastik: true,
  showAmpersand: false,
};

export const ENGLISH_DETAILS: WeddingDetails = {
  ...INITIAL_DETAILS,
  headline: "|| Shree Ganeshay Namah ||",
  groomName: "Aditya",
  groomParents: "S/o Mrs. Sumitra & Mr. Suresh Patil\nResiding at Satara",
  brideName: "Ananya",
  brideParents: "D/o Mrs. Sujata & Mr. Ramesh Deshmukh\nResiding at Koregaon",
  subHeading: "Wedding Ceremony",
  message: "We have organized the wedding on Saturday, 21/05/2022 at 03:15 PM.\nWe request your gracious presence to bless the couple.",
  ceremonyDetails: "Haldi Ceremony\nSaturday, 21/05/2022 at 11:30 AM\n(At Venue)",
  venueTitle: "Wedding Venue",
  venueName: "Ajinkyatara Mangal Karyalay",
  venueAddress: "Pune-Kolhapur Road, Shendre, Dist. Satara",
  rsvp: "Invitee: Patil & Deshmukh Family",
  bottomBorder: { type: 'none', opacity: 1 },
  leftBorder: { type: 'none', opacity: 1 },
  rightBorder: { type: 'none', opacity: 1 },
  backgroundTexture: { type: 'none', opacity: 0.1 },
  showSwastik: true,
  showAmpersand: false,
  photo: "", // REMOVED DEFAULT PHOTO
};