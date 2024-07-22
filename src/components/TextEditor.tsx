import React from 'react';

interface TextEditorProps {
  text: string;
  onChange: (text: string) => void;
  fontFamily: string;
  fontWeight: string;
  isItalic: boolean;
}

const TextEditor: React.FC<TextEditorProps> = ({ text, onChange, fontFamily, fontWeight, isItalic }) => {
  return (
    <textarea
      value={text}
      onChange={(e) => onChange(e.target.value)}
      style={{
        fontFamily: `'${fontFamily}', sans-serif`,
        fontWeight,
        fontStyle: isItalic ? 'italic' : 'normal',
        width: '100%',
        height: '300px',
      }}
    />
  );
};

export default TextEditor;