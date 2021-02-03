import {
  DetailedHTMLProps,
  FC,
  RefObject,
  TextareaHTMLAttributes,
} from "react";
import { FieldError } from "react-hook-form";
import { ErrorText } from "./ErrorText";

interface ITextArea
  extends DetailedHTMLProps<
    TextareaHTMLAttributes<HTMLTextAreaElement>,
    HTMLTextAreaElement
  > {
  register?:
    | string
    | ((instance: HTMLTextAreaElement | null) => void)
    | RefObject<HTMLTextAreaElement>;
  name: string;
  error?: FieldError;
  className?: string;
  containerClassName?: string;
}

export const TextArea: FC<ITextArea> = ({
  register,
  name,
  error,
  className,
  containerClassName,
  ...rest
}) => {
  return (
    <div className={`mt-2 w-full ${containerClassName}`}>
      <textarea
        name={name}
        ref={register}
        rows={4}
        {...rest}
        className={`border-2 border-solid placeholder-gray-400 ${
          error && error.message ? "border-red-600" : "border-gray-700"
        }  rounded-md w-full px-5 py-2 outline-none text-gray-900 ${className}`}
      />
      <ErrorText>{error && error.message}</ErrorText>
    </div>
  );
};
