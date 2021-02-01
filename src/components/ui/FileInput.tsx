import { DragEvent, FC, RefObject } from "react";
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
  const dragOverHandler = (e: DragEvent<HTMLLabelElement>) => {
    console.log("File(s) in drop zone");

    // Prevent default behavior (Prevent file from being opened)
    e.preventDefault();
  };

  const dropHandler = (e: DragEvent<HTMLLabelElement>) => {
    console.log("File(s) dropped");

    // Prevent default behavior (Prevent file from being opened)
    e.preventDefault();

    // if (e.dataTransfer.items) {
    //   // Use DataTransferItemList interface to access the file(s)
    //   for (let i = 0; i < e.dataTransfer.items.length; i++) {
    //     // If dropped items aren't files, reject them
    //     if (e.dataTransfer.items[i].kind === "file") {
    //       var file = e.dataTransfer.items[i].getAsFile();
    //       console.log("... file[" + i + "].name = " + file.name);
    //     }
    //   }
    // } else {
    //   // Use DataTransfer interface to access the file(s)
    //   for (let i = 0; i < e.dataTransfer.files.length; i++) {
    //     console.log(
    //       "... file[" + i + "].name = " + e.dataTransfer.files[i].name
    //     );
    //   }
    // }
  };

  return (
    <div className={`my-2 w-full ${containerClassName}`}>
      <label
        htmlFor={name}
        className={`w-full p-5 border-dashed border-4 block cursor-pointer rounded-md ${
          error && error.message ? "border-red-600" : "border-gray-700"
        } ${className}`}
        onDragOver={dragOverHandler}
        onDrop={dropHandler}
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
