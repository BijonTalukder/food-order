import { useState } from 'react';
import { BiChevronDown } from 'react-icons/bi';
import { AiOutlineSearch } from 'react-icons/ai';

type Option = {
  label: string;
  value: string;
};

type FormSelectProps = {
  id?: string
  options: Option[];
  dataKey: keyof Option;  // Use keyof Option here to ensure dataKey is a valid key of Option
  placeholder?: string;
  searchPlaceholder?: string;
  className?: string
  onSelect?: (value: Option) => void;
};

const FormSearchableSelect = ({
  id,
  options = [],
  dataKey = "label",
  placeholder = "Select an option",
  searchPlaceholder = "Enter name",
  className,
  onSelect
}: FormSelectProps) => {
  const [inputValue, setInputValue] = useState("");
  const [selected, setSelected] = useState<Option | null>(null);
  const [open, setOpen] = useState(false);

  const handleSelect = (value: Option) => {
    setSelected(value);
    setOpen(false);
    if (onSelect) {
      onSelect(value);
    }
  };

  return (
    <div className={`w-72 font-medium h-80 ${className}`}>
      <div
        onClick={() => setOpen(!open)}
        className={`bg-gray-300 w-full p-2 flex items-center justify-between rounded ${!selected && "text-gray-700"}`}
      >
        {selected ? selected[dataKey] : placeholder}
        <BiChevronDown size={20} />
      </div>
      <ul className={`bg-gray-300 mt-2 overflow-y-auto ${open ? "max-h-60" : "max-h-0"}`}>
        <div className='flex items-center px-2 sticky top-0 border bg-white'>
          <AiOutlineSearch size={20} />
          <input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value.toLowerCase())}
            type='text'
            placeholder={searchPlaceholder}
            className='placeholder:text-gray-700 p-2 outline-none'
          />
        </div>
        {
          options
            .filter(item => item[dataKey]?.toLowerCase().includes(inputValue))
            .map((item, index) => (
              <li
                key={index}
                className={`p-2 text-sm hover:bg-sky-600 hover:text-white ${selected && item[dataKey]?.toLowerCase() === selected[dataKey]?.toLowerCase() ? "bg-sky-600 text-white" : ""}`}
                onClick={() => handleSelect(item)}
              >
                {item[dataKey]}
              </li>
            ))
        }
      </ul>
    </div>
  );
}

export default FormSearchableSelect;
