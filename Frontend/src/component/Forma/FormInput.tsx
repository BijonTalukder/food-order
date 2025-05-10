
// import { Controller, useFormContext } from 'react-hook-form';
// interface IInput{
//     label?:string;
//     type?:string;
//     name:string;
//     value?:string|string[]|undefined;
//     id?:string;
//     placeholder?:string;
//     validate?:object
//     required?:boolean
// }
// const FormInput = ({name,type,value,placeholder,label}:IInput) => {
//     const {control} = useFormContext()
//   return (
//     <Controller
//         control={control}
//         name={name}
//         render={({ field}) => 
//             <label className="form-control w-full">
//             <div className="label">
//               <span className="label-text">{label?label:""}</span>
           
//             </div>
//             <input  type={type}
//             placeholder={placeholder}
//             {
//                 ...field
//             }
//             value={value?value:field.value}
//             className="input input-bordered w-full" />
         
//           </label>
//         }
//       />
//   )
// }

// export default FormInput
import { Controller, useFormContext, RegisterOptions } from 'react-hook-form';

interface IInput {
  label?: string;
  type?: string;
  name: string;
  value?: string | string[] | undefined;
  id?: string;
  placeholder?: string;
  validate?: RegisterOptions;  // Use RegisterOptions for validation
  required?: boolean;
  className?: string;  // Allow additional classes
}

const FormInput = ({
  name,
  type = 'text',  // Default type to 'text'
  value,
  placeholder,
  label,
  validate,
  required,
  className = '',  // Default className to an empty string
}: IInput) => {
  const { control } = useFormContext();

  // Add required validation if needed
  const rules = { ...validate, required: required ? 'This field is required' : undefined };
console.log(required);

  return (
    <Controller
      control={control}
      name={name}
      rules={rules}  // Pass validation rules to Controller
      render={({ field, fieldState }) => (
        <div className={`form-control w-full ${className}`}>
          {
            // console.log(required)
            // required && <p>dsfasdfsfads</p>
          }
          {label && (
            <label className="label flex items-center">
       
              {/* {required && <span className='text-red-700 mr-1'>*</span>} */}
              <span className="label-text"> {label}{required && <span className='text-red-700 mr-1'>*</span>}</span>
            </label>
          )}
          <input
            type={type}
            placeholder={placeholder}
            {...field}
            value={value !== undefined ? value : field.value}
            className={`input input-bordered w-full ${fieldState.error ? 'input-error' : ''}`}
          />
          {fieldState.error && (
            <span className="text-red-500 text-sm">{fieldState.error.message}</span>
          )}
        </div>
      )}
    />
  );
}

export default FormInput;
