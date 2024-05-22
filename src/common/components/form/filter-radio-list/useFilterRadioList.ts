import { useState } from "react";
import { ArrayUtils } from "../../../../../../shared/src/utils/array-utils";
import { DefaultValues } from "../../../config/DefaultValues";

const useFilterRadioList = ({
  options,
  defaultOptions,
  noAllOption,
}: {
  options: string[];
  defaultOptions?: string[];
  noAllOption?: boolean;
}) => {
  const [optionsSelected, setOptionsSelected] = useState<string[]>(
    defaultOptions ?? options
  );

  const _setAllOptionsTo = (val: boolean): string[] => {
    if (val) {
      setOptionsSelected(options);
      return options;
    }
    setOptionsSelected([]);
    return [];
  };

  const toggleOption = (value: string): string[] => {
    const newBoolVal = !optionsSelected.includes(value);
    if (value === DefaultValues.ALL_OPTION_VALUE) {
      return _setAllOptionsTo(newBoolVal);
    }
    let tmp = [...optionsSelected];
    if (tmp.includes(DefaultValues.ALL_OPTION_VALUE)) {
      tmp = [value];
    } else {
      if (newBoolVal) {
        tmp.push(value);
        if (tmp.length === options.length - (noAllOption ? 0 : 1)) {
          tmp.push(DefaultValues.ALL_OPTION_VALUE);
        }
      } else {
        if (tmp.includes(DefaultValues.ALL_OPTION_VALUE)) {
          tmp = ArrayUtils.removeFrom(
            tmp,
            (option) => option === DefaultValues.ALL_OPTION_VALUE
          );
        }
        tmp = ArrayUtils.removeFrom(tmp, (option) => option === value);
      }
    }
    setOptionsSelected(tmp);
    return tmp;
  };

  return {
    optionsSelected,
    toggleOption,
  };
};

export default useFilterRadioList;
