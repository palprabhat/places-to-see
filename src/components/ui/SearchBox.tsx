import ReactSelect, {
  ActionMeta,
  GroupTypeBase,
  IndicatorProps,
  OptionTypeBase,
  OptionProps,
  components,
  Styles,
  OptionsType,
  GroupedOptionsType,
  Props as SelectProps,
} from "react-select";
import { NoticeProps } from "react-select/src/components/Menu";
import ErrorText from "./ErrorText";
import { FieldError } from "react-hook-form";
import { ComponentType, FC, ReactNode, RefObject } from "react";
import { FiSearch } from "react-icons/fi";

export type OptionType =
  | OptionsType<OptionTypeBase>
  | GroupedOptionsType<OptionTypeBase, GroupTypeBase<any>>;

interface ISearchBox extends SelectProps<OptionTypeBase> {
  register?:
    | string
    | RefObject<ReactSelect<any, false, GroupTypeBase<any>>>
    | ((instance: ReactSelect<any, false, GroupTypeBase<any>> | null) => void);
  name: string;
  id: string;
  error?: FieldError;
  containerClassName?: string;
  placeholder?: ReactNode;
  defaultValue?: OptionTypeBase;
  options?: OptionType;
  onChange?: (
    value: OptionTypeBase | null,
    action: ActionMeta<OptionTypeBase>
  ) => void;
}

const Option: ComponentType<
  OptionProps<OptionTypeBase, false, GroupTypeBase<OptionTypeBase>>
> = (props) => {
  const {
    structured_formatting: {
      main_text,
      secondary_text,
      main_text_matched_substrings,
    },
  } = props.data;

  const { offset, length } = main_text_matched_substrings[0];
  const mainTextLength = main_text.length;

  return (
    <components.Option {...props} className="flex justify-start item-center">
      <div>
        <strong>{main_text.substr(offset, length)}</strong>
        {main_text.substr(length, mainTextLength)} ,{secondary_text}
      </div>
    </components.Option>
  );
};

const NoOptionsMessage: ComponentType<
  NoticeProps<OptionTypeBase, false, GroupTypeBase<OptionTypeBase>>
> = (props) => {
  return (
    <components.NoOptionsMessage {...props}>
      Enter a city name
    </components.NoOptionsMessage>
  );
};

const DropdownIndicator: ComponentType<
  IndicatorProps<OptionTypeBase, false, GroupTypeBase<OptionTypeBase>>
> = (props) => {
  return (
    <components.DropdownIndicator {...props}>
      <FiSearch />
    </components.DropdownIndicator>
  );
};

const styles: Partial<
  Styles<OptionTypeBase, false, GroupTypeBase<OptionTypeBase>>
> = {
  container: (styles) => ({ ...styles, outline: "none" }),
  control: (styles) => ({
    ...styles,
    boxShadow: "none",
    backgroundColor: styles.backgroundColor,
    borderColor: styles.borderColor,
  }),
  input: (styles) => ({
    ...styles,
    color: styles.color,
  }),
  menu: (styles) => ({
    ...styles,
    backgroundColor: styles.backgroundColor,
    border: styles.border,
    borderColor: styles.borderColor,
  }),
  singleValue: (styles) => ({
    ...styles,
    color: styles.color,
  }),
};

const SearchBox: FC<ISearchBox> = ({
  register,
  name,
  id,
  error,
  containerClassName,
  defaultValue,
  placeholder,
  onChange,
  options,
  ...rest
}) => {
  return (
    <div className={`my-2 w-full text-gray-900 ${containerClassName}`}>
      <ReactSelect
        ref={register}
        placeholder={placeholder}
        name={name}
        instanceId={id}
        styles={styles}
        theme={(theme) => ({
          ...theme,
          colors: {
            ...theme.colors,
          },
        })}
        isClearable
        cacheOptions
        components={{
          Option,
          NoOptionsMessage,
          DropdownIndicator,
        }}
        options={options}
        defaultValue={defaultValue}
        onChange={onChange}
        {...rest}
      />
      <ErrorText>{error && error.message}</ErrorText>
    </div>
  );
};

export default SearchBox;
