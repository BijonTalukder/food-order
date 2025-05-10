import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';

interface Option {
  value: string | number;
  label: string;
}

interface FormSelectProps {
  name: string;
  handleChange?: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  options: Option[];
  defaultValue?: string | number;
  label?: string;
}

const FormSelect: React.FC<FormSelectProps> = ({
  name,
  handleChange,
  options,
  defaultValue,
  label
}) => {
  const { control } = useFormContext();

  return (
    <div>
      <Controller
        control={control}
        name={name}
        defaultValue={defaultValue}
        render={({ field }) => (
          <label className="form-control w-full ">
            {label && (
              <div className="label">
                <span className="label-text">{label}</span>
              </div>
            )}
            <select
              className="select select-bordered w-full"
              {...field}
              onChange={handleChange ? handleChange : field.onChange}
            >
              <option disabled value="">
                {defaultValue || "Select an option"}
              </option>
              {options.map((option, index) => (
                <option key={index} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </label>
        )}
      />
    </div>
  );
};

export default FormSelect;
