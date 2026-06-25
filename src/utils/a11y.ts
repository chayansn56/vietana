/**
 * Accessibility utility functions
 */

export const generateAltText = (filename: string): string => {
  if (!filename) return '';
  // Remove extension and replace hyphens/underscores with spaces
  const nameWithoutExt = filename.replace(/\.[^/.]+$/, "");
  const readableName = nameWithoutExt.replace(/[-_]/g, ' ');
  return readableName.charAt(0).toUpperCase() + readableName.slice(1);
};

export const checkColorContrast = (fgHex: string, bgHex: string): boolean => {
  // A simplified contrast checker for WCAG AA (4.5:1 for normal text)
  const getLuminance = (hex: string) => {
    let r = parseInt(hex.slice(1, 3), 16) / 255;
    let g = parseInt(hex.slice(3, 5), 16) / 255;
    let b = parseInt(hex.slice(5, 7), 16) / 255;
    
    r = r <= 0.03928 ? r / 12.92 : Math.pow((r + 0.055) / 1.055, 2.4);
    g = g <= 0.03928 ? g / 12.92 : Math.pow((g + 0.055) / 1.055, 2.4);
    b = b <= 0.03928 ? b / 12.92 : Math.pow((b + 0.055) / 1.055, 2.4);
    
    return 0.2126 * r + 0.7152 * g + 0.0722 * b;
  };
  
  const l1 = getLuminance(fgHex);
  const l2 = getLuminance(bgHex);
  
  const ratio = (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05);
  return ratio >= 4.5;
};
