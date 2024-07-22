import React from 'react';

interface ItalicToggleProps {
  isItalic: boolean;
  onToggle: () => void;
  isDisabled: boolean;
  italicUnavailableMessage: string;
}

const ItalicToggle: React.FC<ItalicToggleProps> = ({ isItalic, onToggle, isDisabled, italicUnavailableMessage }) => {
  return (
    <div className="italic-toggle">
      <label>
        <input type="checkbox" checked={isItalic} onChange={onToggle} disabled={isDisabled} />
        Italic
      </label>
      {isDisabled && <p className="italic-message">{italicUnavailableMessage}</p>}
    </div>
  );
};

export default ItalicToggle;