// src/App.tsx

import React, { useState, useEffect } from 'react';
import TextEditor from './components/TextEditor';
import FontSelector from './components/FontSelector';
import FontWeightSelector from './components/FontWeightSelector';
import ItalicToggle from './components/ItalicToggle';
import { loadFonts, FontData, findClosestVariant, loadFontIntoPage } from './utils/fontUtils';

const App: React.FC = () => {
  const [fonts, setFonts] = useState<FontData>({});
  const [selectedFont, setSelectedFont] = useState<string>('');
  const [selectedWeight, setSelectedWeight] = useState<string>('400');
  const [isItalic, setIsItalic] = useState<boolean>(false);
  const [text, setText] = useState<string>('');
  const [italicUnavailableMessage, setItalicUnavailableMessage] = useState<string>('');

  useEffect(() => {
    const loadSavedData = async () => {
      const savedFont = localStorage.getItem('selectedFont');
      const savedWeight = localStorage.getItem('selectedWeight');
      const savedItalic = localStorage.getItem('isItalic') === 'true';
      const savedText = localStorage.getItem('text');

      const fontData = await loadFonts();
      setFonts(fontData);

      if (savedFont && fontData[savedFont]) {
        setSelectedFont(savedFont);
        const closestVariant = findClosestVariant(
          fontData[savedFont].variants,
          parseInt(savedWeight || '400'),
          savedItalic
        );
        setSelectedWeight(closestVariant.replace('italic', ''));
        setIsItalic(closestVariant.includes('italic'));

        const fontUrl = fontData[savedFont].urls[0];
        loadFontIntoPage(savedFont, fontUrl);

        setItalicUnavailableMessage(
          fontData[savedFont].variants.some(v => v.includes('italic'))
            ? ''
            : 'Italic variants are not available for this font.'
        );
      } else {
        const firstFont = Object.keys(fontData)[0];
        setSelectedFont(firstFont);
        const defaultVariant = findClosestVariant(fontData[firstFont].variants, 400, false);
        setSelectedWeight(defaultVariant.replace('italic', ''));
        setIsItalic(defaultVariant.includes('italic'));

        const fontUrl = fontData[firstFont].urls[0];
        loadFontIntoPage(firstFont, fontUrl);

        setItalicUnavailableMessage(
          fontData[firstFont].variants.some(v => v.includes('italic'))
            ? ''
            : 'Italic variants are not available for this font.'
        );
      }

      setText(savedText || '');
    };

    loadSavedData();
  }, []);

  useEffect(() => {
    localStorage.setItem('selectedFont', selectedFont);
    localStorage.setItem('selectedWeight', selectedWeight);
    localStorage.setItem('isItalic', isItalic.toString());
    localStorage.setItem('text', text);

    const fontUrl = fonts[selectedFont]?.urls[0];
    if (fontUrl) {
      loadFontIntoPage(selectedFont, fontUrl);
    }

    setItalicUnavailableMessage(
      fonts[selectedFont]?.variants.some(v => v.includes('italic'))
        ? ''
        : 'Italic variants are not available for this font.'
    );
  }, [selectedFont, selectedWeight, isItalic, text, fonts]);

  const handleFontChange = (font: string) => {
    setSelectedFont(font);
    const newVariant = findClosestVariant(
      fonts[font].variants,
      parseInt(selectedWeight),
      isItalic
    );
    setSelectedWeight(newVariant.replace('italic', ''));
    setIsItalic(newVariant.includes('italic'));

    const fontUrl = fonts[font].urls[0];
    if (fontUrl) {
      loadFontIntoPage(font, fontUrl);
    }

    setItalicUnavailableMessage(
      fonts[font]?.variants.some(v => v.includes('italic'))
        ? ''
        : 'Italic variants are not available for this font.'
    );
  };

  const handleWeightChange = (weight: string) => {
    setSelectedWeight(weight);
    const newVariant = findClosestVariant(
      fonts[selectedFont]?.variants || [],
      parseInt(weight),
      isItalic
    );
    setIsItalic(newVariant.includes('italic'));
  };

  const handleItalicToggle = () => {
    const newItalic = !isItalic;
    const newVariant = findClosestVariant(
      fonts[selectedFont]?.variants || [],
      parseInt(selectedWeight),
      newItalic
    );
    setSelectedWeight(newVariant.replace('italic', ''));
    setIsItalic(newVariant.includes('italic'));
  };

  const handleTextChange = (newText: string) => {
    setText(newText);
  };

  const handleSave = () => {
    localStorage.setItem('selectedFont', selectedFont);
    localStorage.setItem('selectedWeight', selectedWeight);
    localStorage.setItem('isItalic', isItalic.toString());
    localStorage.setItem('text', text);
    alert('Settings and text have been saved!');
  };

  const handleReset = () => {
    const defaultFont = Object.keys(fonts)[0];
    const defaultVariant = findClosestVariant(fonts[defaultFont].variants, 400, false);

    setSelectedFont(defaultFont);
    setSelectedWeight(defaultVariant.replace('italic', ''));
    setIsItalic(defaultVariant.includes('italic'));
    setText('');

    localStorage.removeItem('selectedFont');
    localStorage.removeItem('selectedWeight');
    localStorage.removeItem('isItalic');
    localStorage.removeItem('text');

    const fontUrl = fonts[defaultFont]?.urls[0];
    if (fontUrl) {
      loadFontIntoPage(defaultFont, fontUrl);
    }

    setItalicUnavailableMessage(
      fonts[defaultFont]?.variants.some(v => v.includes('italic'))
        ? ''
        : 'Italic variants are not available for this font.'
    );
  };

  return (
    <div className="App">
      <h1>EDIT YOUR TEXT HERE</h1>
      <div className="controls">
        <FontSelector
          fonts={fonts}
          selectedFont={selectedFont}
          onFontChange={handleFontChange}
        />
        <FontWeightSelector
          variants={fonts[selectedFont]?.variants || []}
          selectedWeight={selectedWeight}
          onWeightChange={handleWeightChange}
        />
        <ItalicToggle
          isItalic={isItalic}
          onToggle={handleItalicToggle}
          isDisabled={!fonts[selectedFont]?.variants.some(v => v.includes('italic'))}
          italicUnavailableMessage={italicUnavailableMessage}
        />
        <button onClick={handleSave}>Save</button>
        <button onClick={handleReset}>Reset</button>
      </div>
      <TextEditor
        text={text}
        onChange={handleTextChange}
        fontFamily={selectedFont}
        fontWeight={selectedWeight}
        isItalic={isItalic}
      />
    </div>
  );
};

export default App;
