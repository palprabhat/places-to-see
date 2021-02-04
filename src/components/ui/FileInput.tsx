import { FC, RefObject } from "react";
import { FieldError } from "react-hook-form";
import { ErrorText } from "./ErrorText";

interface IFileInput
  extends React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  register?:
    | string
    | ((instance: HTMLInputElement | null) => void)
    | RefObject<HTMLInputElement>
    | null;
  error?: FieldError;
  className?: string;
  label: string;
  name: string;
  containerClassName?: string;
}

export const FileInput: FC<IFileInput> = ({
  register,
  name,
  error,
  className,
  label,
  containerClassName,
  ...rest
}) => {
  return (
    <div className={`mt-2 w-full ${containerClassName}`}>
      <label
        htmlFor={name}
        className={`w-full p-5 border-dashed border-4 block cursor-pointer rounded-md ${
          error && error.message ? "border-red-600" : "border-gray-700"
        } ${className}`}
      >
        {label}
      </label>
      <input
        ref={register}
        id={name}
        name={name}
        type="file"
        accept="image/*"
        className="hidden"
        {...rest}
      />
      <ErrorText>{error && error.message}</ErrorText>
    </div>
  );
};
