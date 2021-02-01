import {
  GroupTypeBase,
  IndicatorProps,
  OptionTypeBase,
  components,
  OptionProps,
  OptionsType,
  GroupedOptionsType,
} from "react-select";
import { SelectBox, ISelectBox } from "./SelectBox";
import { ComponentType, FC } from "react";
import { FiSearch } from "react-icons/fi";

interface ISearchBox extends ISelectBox {}

export type OptionType =
  | OptionsType<OptionTypeBase>
  | GroupedOptionsType<OptionTypeBase, GroupTypeBase<any>>;

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

const DropdownIndicator: ComponentType<
  IndicatorProps<OptionTypeBase, false, GroupTypeBase<OptionTypeBase>>
> = (props) => {
  return (
    <components.DropdownIndicator {...props}>
      <FiSearch />
    </components.DropdownIndicator>
  );
};

export const SearchBox: FC<ISearchBox> = ({ ...rest }) => {
  return (
    <SelectBox
      components={{
        Option,
        DropdownIndicator,
      }}
      {...rest}
    />
  );
};
