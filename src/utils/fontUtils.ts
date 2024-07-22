import fontData from '../fonts.json';

export interface FontData {
  [fontName: string]: {
    variants: string[];
    urls: string[];
  };
}

export const loadFonts = async (): Promise<FontData> => {
  // Simulate loading delay
  await new Promise((resolve) => setTimeout(resolve, 500));

  const processedFontData: FontData = {};

  for (const [fontName, variants] of Object.entries(fontData)) {
    processedFontData[fontName] = {
      variants: Object.keys(variants),
      urls: Object.values(variants)
    };
  }

  return processedFontData;
};

// fontUtils.ts
export function findClosestVariant(
    variants: string[],
    targetWeight: number,
    targetItalic: boolean
  ): string {
    let closestVariant = variants[0];
    let minDiff = Infinity;
  
    for (const variant of variants) {
      const weight = parseInt(variant, 10);
      const isItalic = variant.includes('italic');
  
      if (isNaN(weight)) continue; // Skip if weight is not a number
  
      const diff = Math.abs(weight - targetWeight);
  
      if (diff < minDiff || (diff === minDiff && isItalic === targetItalic)) {
        closestVariant = variant;
        minDiff = diff;
      } else if (diff === minDiff && targetItalic && !isItalic) {
        // Prefer italic if weights are the same and we're looking for italic
        closestVariant = variant;
      }
    }
  
    // If we're looking for italic but didn't find one, return the closest non-italic
    if (targetItalic && !closestVariant.includes('italic')) {
      const nonItalicVariant = closestVariant;
      for (const variant of variants) {
        if (variant.includes('italic') && variant.startsWith(nonItalicVariant)) {
          return variant;
        }
      }
    }
  
    return closestVariant;
  }
  
  
  
export const loadFontIntoPage = (fontFamily: string, url: string) => {
    const link = document.createElement('link');
    link.href = url;
    link.rel = 'stylesheet';
    document.head.appendChild(link);
  };