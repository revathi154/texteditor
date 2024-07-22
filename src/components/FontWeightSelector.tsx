import React from 'react';

interface FontWeightSelectorProps {
  variants: string[];
  selectedWeight: string;
  onWeightChange: (weight: string) => void;
}

const FontWeightSelector: React.FC<FontWeightSelectorProps> = ({ variants, selectedWeight, onWeightChange }) => {
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    onWeightChange(event.target.value);
  };

  const numericVariants = variants.map(variant => {
    const [weight] = variant.split('italic');
    return weight.trim();
  });

  return (
    <select value={selectedWeight} onChange={handleChange}>
      {numericVariants.map((weight, index) => (
        <option key={index} value={weight}>
          {weight}
        </option>
      ))}
    </select>
  );
};

export default FontWeightSelector;