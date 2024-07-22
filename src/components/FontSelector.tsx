import React from 'react';

interface FontSelectorProps {
  fonts: { [fontName: string]: { variants: string[]; urls: string[] } };
  selectedFont: string;
  onFontChange: (font: string) => void;
}

const FontSelector: React.FC<FontSelectorProps> = ({ fonts, selectedFont, onFontChange }) => {
  return (
    <div className="font-selector">
      <label htmlFor="font-family">Font Family:</label>
      <select
        id="font-family"
        value={selectedFont}
        onChange={(e) => onFontChange(e.target.value)}
      >
        {Object.keys(fonts).map((font) => (
          <option key={font} value={font}>
            {font}
          </option>
        ))}
      </select>
    </div>
  );
};

export default FontSelector;