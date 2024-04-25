import { View, TextInput, StyleProp, ViewStyle } from "react-native";
import ExpoIcon from "../icons/ExpoIcon";
import { useTheme } from "@react-navigation/native";
import { style } from "@/common/utils/style-utils";
import RounedButton from "../buttons/RoundedButton";

export default function SearchBar({
  hasFilterBtn,
  defaultValue,
  onFilterBtnPress,
  onChange,
  onSubmit,
  style: styleProp,
}: {
  hasFilterBtn?: boolean;
  defaultValue?: string;
  onFilterBtnPress?: () => void;
  onChange?: (text: string) => void;
  onSubmit?: (text: string) => void;
  style?: StyleProp<ViewStyle>;
}) {
  const theme = useTheme();

  return (
    <View
      style={[
        style.flexRow,
        style.itemsCenter,
        {
          flex: 1,
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
            padding: 10,
            height: 50,
          },
        ]}
      >
        <ExpoIcon name="search" color={theme.colors.text} size={17}></ExpoIcon>
        <TextInput
          style={[
            {
              flex: 1,
              color: theme.colors.text,
              fontSize: 17,
              paddingHorizontal: 10,
            },
          ]}
          value={defaultValue}
          placeholder="Search"
          placeholderTextColor={theme.colors.text}
          onChangeText={(text) => onChange && onChange(text)}
          onSubmitEditing={(evt) => onSubmit && onSubmit(evt.nativeEvent.text)}
        ></TextInput>
      </View>
      {hasFilterBtn && (
        <>
          <RounedButton
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
          ></RounedButton>
        </>
      )}
    </View>
  );
}
