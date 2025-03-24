import { View, TextInput, StyleProp, ViewStyle } from "react-native";
import ExpoIcon from "../icons/ExpoIcon";
import { useTheme } from "@react-navigation/native";
import { style } from "./../../../common/utils/style-utils";
import RoundedButton from "../buttons/RoundedButton";
import { ReactNode, useRef } from "react";

export default function SearchBar({
  placeholder,
  defaultValue,
  submitOnClear,
  onChange,
  onSubmit,
  style: styleProp,
  actionsBtn,
  actionsBtns,
}: {
  placeholder?: string;
  defaultValue?: string;
  submitOnClear?: boolean;
  onChange?: (text: string) => void;
  onSubmit?: (text: string) => void;
  style?: StyleProp<ViewStyle>;
  actionsBtn?: ReactNode;
  actionsBtns?: ReactNode[];
}) {
  if (actionsBtn && actionsBtns) {
    throw new Error("actionsBtn and actonsBtns can't be both valued");
  }

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
      {(actionsBtn || actionsBtns) && (
        <View style={[{ paddingLeft: 10 }]}>
          {actionsBtns && <View style={[{}]}>{actionsBtns.map((b) => b)}</View>}
          {actionsBtn}
        </View>
      )}
    </View>
  );
}
