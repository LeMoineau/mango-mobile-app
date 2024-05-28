import { Pressable, Text, View } from "react-native";
import { style } from "../../../common/utils/style-utils";
import ExpoIcon from "../../../common/components/icons/ExpoIcon";
import ThemedText from "../../../common/components/text/ThemedText";
import { useTheme } from "@react-navigation/native";
import { AllIconNames } from "../../../common/types/IconName";
import SelectModal from "../../../common/components/modals/primitives/SelectModal";
import useModals from "../../../shared/src/hooks/use-modals";
import { useState } from "react";

export default function SelectSettingItem({
  title,
  icon,
  options,
  currentSelectedOption,
  onChange,
}: {
  title: string;
  icon?: AllIconNames;
  options: { label: string; iconName?: AllIconNames }[];
  currentSelectedOption: string;
  onChange?: (label: string) => void;
}) {
  const theme = useTheme();
  const { isVisible, show, hide } = useModals<"select">();
  const [selectedOption, SetSelectedOption] = useState(currentSelectedOption);

  return (
    <>
      <Pressable
        onPress={() => {
          show("select");
        }}
      >
        <View
          style={[
            style.flexRow,
            style.justifyBetween,
            style.itemsCenter,
            { paddingVertical: 10 },
          ]}
        >
          <View style={[style.flexRow, style.itemsCenter, { flex: 1 }]}>
            {icon && (
              <ExpoIcon
                styleProps={[{ marginRight: 10 }]}
                color={theme.colors.text}
                name={icon}
                size={32}
              />
            )}
            <ThemedText>{title}</ThemedText>
          </View>
          <View
            style={[
              style.flexRow,
              style.itemsCenter,
              style.border,
              {
                borderWidth: 0,
                borderBottomWidth: 0,
                backgroundColor: theme.colors.border,
                paddingHorizontal: 10,
                paddingVertical: 5,
                borderRadius: 5,
              },
            ]}
          >
            <ThemedText style={[{}]}>{selectedOption}</ThemedText>
            <View style={{ width: 7 }}></View>
            <ExpoIcon
              name="caret-down"
              size={15}
              color={theme.colors.text}
            ></ExpoIcon>
          </View>
        </View>
      </Pressable>
      <SelectModal
        visible={isVisible("select")}
        onRequestClose={() => hide("select")}
        options={options}
        alreadySelected={currentSelectedOption}
        onSelect={(label) => {
          SetSelectedOption(label);
          onChange && onChange(label);
        }}
      ></SelectModal>
    </>
  );
}
