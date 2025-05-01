import { useFormContext } from "react-hook-form";
import { InputHTMLAttributes, TextareaHTMLAttributes } from "react";

interface TextInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  name: string;
}

interface TextInput2Props extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  name: string;
}

function TextInput({ name, label, type = "text", placeholder, ...rest }: TextInputProps) {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div className="w-full flex flex-col gap-2">
      <label htmlFor={name} className="text-lg font-medium">{label}</label>
      <input
        id={name}
        type={type}
        {...register(name)}
        {...rest}
        placeholder={placeholder || name}
        className={`border pl-3 py-2 rounded-md border-accent ${errors[name] && "placeholder:text-red-400"} focus:outline-none`}
      />
      {errors[name] && <p className="text-red-500 text-sm">{(errors[name])?.message as string}</p>}
    </div>
  );
}

function TextInput2({ name, label, placeholder, ...rest }: TextInput2Props) {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div className="w-full flex flex-col gap-2">
      <label htmlFor={name} className="text-lg font-medium">{label}</label>
      <textarea
        id={name}
        {...register(name)}
        {...rest}
        cols={30}
        rows={5}
        placeholder={placeholder || name}
        className={`border resize-none pl-3 py-2 rounded-md border-accent ${errors[name] && "placeholder:text-red-400"} focus:outline-none`}
      ></textarea>
      {errors[name] && <p className="text-red-500 text-sm">{(errors[name])?.message as string}</p>}
    </div>
  );
}


export { TextInput, TextInput2 };
