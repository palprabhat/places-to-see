import { DetailedHTMLProps, FC, InputHTMLAttributes, RefObject } from "react";
import { FieldError } from "react-hook-form";
import ErrorText from "./ErrorText";

interface IInputField
  extends DetailedHTMLProps<
    InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  register?:
    | string
    | ((instance: HTMLInputElement | null) => void)
    | RefObject<HTMLInputElement>;
  name: string;
  error?: FieldError;
  className?: string;
  containerClassName?: string;
}

export const InputField: FC<IInputField> = ({
  register,
  name,
  error,
  className,
  containerClassName,
  ...rest
}) => {
  return (
    <div className={`my-2 w-full ${containerClassName}`}>
      <input
        name={name}
        ref={register}
        {...rest}
        className={`border-2 ${
          error && error.message ? "border-red-600" : "border-gray-700"
        }  rounded-md w-full px-5 py-2 outline-none text-gray-900 ${className}`}
      />
      <ErrorText>{error && error.message}</ErrorText>
    </div>
  );
};
