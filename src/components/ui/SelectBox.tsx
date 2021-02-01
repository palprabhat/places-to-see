import ReactSelect, {
  GroupTypeBase,
  OptionTypeBase,
  OptionsType,
  GroupedOptionsType,
  Props as SelectProps,
} from "react-select";
import { ErrorText } from "./ErrorText";
import { FieldError } from "react-hook-form";
import { FC, RefObject, useEffect, useState } from "react";

export interface ISelectBox extends SelectProps<OptionTypeBase> {
  register?:
    | string
    | RefObject<ReactSelect<any, false, GroupTypeBase<any>>>
    | ((instance: ReactSelect<any, false, GroupTypeBase<any>> | null) => void);
  name: string;
  id: string;
  error?: FieldError;
  value?: any;
  containerClassName?: string;
}

const getSelectedOption = ({
  value,
  options,
}: {
  value: any;
  options?:
    | GroupedOptionsType<OptionTypeBase, GroupTypeBase<OptionTypeBase>>
    | OptionsType<OptionTypeBase>;
}) => {
  if (value !== undefined || value !== null) {
    const selectedOption = options?.filter((option) => option.value === value);

    if (selectedOption && selectedOption.length > 0) {
      return selectedOption[0] as OptionTypeBase;
    } else {
      return null;
    }
  }
  return null;
};

export const SelectBox: FC<ISelectBox> = ({
  register,
  name,
  id,
  error,
  containerClassName,
  defaultValue,
  options,
  value,
  ...rest
}) => {
  const [selectedValue, setSelectedValue] = useState<OptionTypeBase | null>(
    defaultValue ?? getSelectedOption({ value, options })
  );

  useEffect(() => {
    if (value !== undefined || value !== null) {
      const selectedOption = getSelectedOption({ value, options });
      setSelectedValue(selectedOption);
    }
  }, [value]);

  return (
    <div className={`my-2 w-full text-gray-900 ${containerClassName}`}>
      <ReactSelect
        ref={register}
        name={name}
        instanceId={id}
        options={options}
        defaultValue={selectedValue}
        isClearable
        cacheOptions
        className={error ? "react-select-error" : ""}
        classNamePrefix="react-select"
        {...rest}
      />
      <ErrorText>{error && error.message}</ErrorText>
    </div>
  );
};
