import { useState, useEffect } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import './FileUpload.css';

interface FileUploadProps {
  name: string;
  allowedTypes?: string[];
  onFileSelect?: (file: File) => void;
  label?: string;
  id?: string;
  className?:string;
}

const FileUpload: React.FC<FileUploadProps> = ({
  name,
  allowedTypes = ['image/png', 'image/jpeg', 'image/svg+xml', 'image/webp', 'image/gif'],
  onFileSelect,
  label = 'Upload file',
  id,
  className
}) => {
  const { control } = useFormContext();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [filePreview, setFilePreview] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>, onChange: (file: File) => void) => {
  
  console.log(event.target.files);
  
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      if (allowedTypes.includes(file.type)) {
        setLoading(true);
        setSelectedFile(file);
        setFilePreview(URL.createObjectURL(file));
        onChange(file);
        if (onFileSelect) {
          onFileSelect(file);
        }
       
        setTimeout(() => {
          setLoading(false);
        }, 2000); 
      } else {
        alert('Selected file type is not allowed');
      }
    }
  };

  // Clean up the file preview URL when the component is unmounted or when the file changes
  useEffect(() => {
    return () => {
      if (filePreview) {
        URL.revokeObjectURL(filePreview);
      }
    };
  }, [filePreview]);

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <div>
          {
            label?label:""
          }
          <label
            htmlFor={id || name}
            className="bg-white text-gray-500 font-semibold text-base rounded max-w-md h-52 flex flex-col items-center justify-center cursor-pointer border-2 border-gray-300 border-dashed mx-auto font-[sans-serif]"
          >
            {loading ? (
              <div className="flex flex-col items-center">
                <svg className="animate-spin h-5 w-5 text-gray-500" viewBox="0 0 24 24">
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v8z"
                  ></path>
                </svg>
                <p className="text-xs font-medium text-gray-400 mt-2">Uploading...</p>
              </div>
            ) : (
              <>
                <svg xmlns="http://www.w3.org/2000/svg" className="w-11 mb-2 fill-gray-500" viewBox="0 0 32 32">
                  <path
                    d="M23.75 11.044a7.99 7.99 0 0 0-15.5-.009A8 8 0 0 0 9 27h3a1 1 0 0 0 0-2H9a6 6 0 0 1-.035-12 1.038 1.038 0 0 0 1.1-.854 5.991 5.991 0 0 1 11.862 0A1.08 1.08 0 0 0 23 13a6 6 0 0 1 0 12h-3a1 1 0 0 0 0 2h3a8 8 0 0 0 .75-15.956z"
                    data-original="#000000"
                  />
                  <path
                    d="M20.293 19.707a1 1 0 0 0 1.414-1.414l-5-5a1 1 0 0 0-1.414 0l-5 5a1 1 0 0 0 1.414 1.414L15 16.414V29a1 1 0 0 0 2 0V16.414z"
                    data-original="#000000"
                  />
                </svg>
                {label}
                <input
                  type="file"
                  id={id || name}
                  className="hidden"
                  onChange={(event) => handleFileChange(event, field.onChange)}
                />
                <p className="text-xs font-medium text-gray-400 mt-2">
                  {allowedTypes.map(type => type.split('/')[1].toUpperCase()).join(', ')} are allowed.
                </p>
                {selectedFile && (
                  <>
                    <p className="text-xs font-medium text-gray-500 mt-2">{selectedFile.name}</p>
                    {filePreview && (
                      <img src={filePreview} alt="Preview" className="mt-2 max-w-full max-h-48" />
                    )}
                  </>
                )}
              </>
            )}
          </label>
        </div>
      )}
    />
  );
};

export default FileUpload;