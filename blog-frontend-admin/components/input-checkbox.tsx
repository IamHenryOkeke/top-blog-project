// components/CustomCheckbox.tsx
import React from 'react';
import { Control, useController } from 'react-hook-form';

interface CustomCheckboxProps {
  name: string;
  control: Control;
  label: string;
}

export default function CustomCheckbox({ name, control, label }: CustomCheckboxProps ) {
  const {
    field: { value, onChange, ref },
  } = useController({
    name,
    control,
    defaultValue: false,
  });

  return (
    <label className="flex items-center space-x-2 cursor-pointer select-none">
      <div className="relative">
        <input
          ref={ref}
          type="checkbox"
          checked={value}
          onChange={(e) => onChange(e.target.checked)}
          className="peer hidden"
        />
        <div className="h-5 w-5 rounded border-2 border-gray-300 peer-checked:border-blue-500 peer-checked:bg-blue-500 flex items-center justify-center">
          <svg
            className="h-3 w-3 text-white hidden peer-checked:block"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            viewBox="0 0 24 24"
          >
            <path d="M5 13l4 4L19 7" />
          </svg>
        </div>
      </div>
      <span className="text-gray-700">{label}</span>
    </label>
  );
};
