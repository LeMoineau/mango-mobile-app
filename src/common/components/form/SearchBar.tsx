import { View, TextInput, StyleProp, ViewStyle } from "react-native";
import ExpoIcon from "../icons/ExpoIcon";
import { useTheme } from "@react-navigation/native";
import { style } from "./../../../common/utils/style-utils";
import RoundedButton from "../buttons/RoundedButton";
import { useRef } from "react";

export default function SearchBar({
  placeholder,
  hasFilterBtn,
  defaultValue,
  submitOnClear,
  onFilterBtnPress,
  onChange,
  onSubmit,
  style: styleProp,
}: {
  placeholder?: string;
  hasFilterBtn?: boolean;
  defaultValue?: string;
  submitOnClear?: boolean;
  onFilterBtnPress?: () => void;
  onChange?: (text: string) => void;
  onSubmit?: (text: string) => void;
  style?: StyleProp<ViewStyle>;
}) {
  const theme = useTheme();
  const textInputRef = useRef<TextInput>(null);

  return (
    <View
      style={[
        style.flexRow,
        style.itemsCenter,
        {
          flex: 1,
          height: 50,
        },
        styleProp,
      ]}
    >
      <View
        style={[
          style.flexRow,
          style.itemsCenter,
          style.rounded,
          {
            flex: 1,
            backgroundColor: theme.colors.border,
            paddingHorizontal: 10,
            height: 50,
          },
        ]}
      >
        <ExpoIcon name="search" color={theme.colors.text} size={17}></ExpoIcon>
        <TextInput
          ref={textInputRef}
          style={[
            {
              flex: 1,
              color: theme.colors.text,
              fontSize: 17,
              paddingHorizontal: 10,
            },
          ]}
          defaultValue={defaultValue}
          placeholder={placeholder ?? "Search"}
          placeholderTextColor={theme.colors.text}
          onChangeText={(text) => onChange && onChange(text)}
          onSubmitEditing={(evt) => onSubmit && onSubmit(evt.nativeEvent.text)}
        ></TextInput>
        <RoundedButton
          appendIcon="clear"
          styleProp={[
            {
              position: "absolute",
              right: 0,
              top: 0,
              height: 50,
              paddingHorizontal: 10,
            },
          ]}
          onPress={() => {
            textInputRef.current?.clear();
            onChange && onChange("");
            if (submitOnClear && onSubmit) onSubmit("");
          }}
        ></RoundedButton>
      </View>
      {hasFilterBtn && (
        <>
          <RoundedButton
            appendIcon="filter-variant"
            appendIconStyle={[{ fontSize: 20 }]}
            styleProp={[
              style.rounded,
              {
                marginLeft: 10,
                backgroundColor: theme.colors.border,
                height: 50,
                width: 50,
              },
            ]}
            onPress={onFilterBtnPress}
          ></RoundedButton>
        </>
      )}
    </View>
  );
}
