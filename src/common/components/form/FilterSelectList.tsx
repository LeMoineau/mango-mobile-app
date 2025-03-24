import { View } from "react-native";
import ThemedText from "../text/ThemedText";
import { style } from "../../utils/style-utils";
import RoundedButton from "../buttons/RoundedButton";
import { AllIconNames } from "../../types/IconName";
import { useTheme } from "@react-navigation/native";
import { useEffect, useState } from "react";

export default function FilterSelectList({
  title,
  options,
  defaultOptionSelected,
  resetter,
  onSelectOption,
}: {
  title: string;
  options: { label?: string; value: string; iconName?: AllIconNames }[];
  defaultOptionSelected?: string;
  resetter?: boolean;
  onSelectOption?: (optionSelected: string) => void;
}) {
  const theme = useTheme();
  const [optionSelected, setOptionSelected] = useState(
    defaultOptionSelected ?? options[0]
  );

  useEffect(() => {
    setOptionSelected(defaultOptionSelected ?? options[0]);
  }, [resetter]);

  return (
    <View style={[style.flexCol, { paddingHorizontal: 20 }]}>
      <ThemedText
        style={[
          {
            fontSize: 16,
          },
        ]}
      >
        {title}
      </ThemedText>
      <View style={[{ height: 0 }]}></View>
      <View
        style={[
          style.flexRow,
          style.itemsCenter,
          { flexWrap: "wrap", paddingTop: 10 },
        ]}
      >
        {options.map((item, index) => (
          <RoundedButton
            key={`filter-select-item-${title}-${index}`}
            onPress={() => {
              setOptionSelected(item.value);
              onSelectOption && onSelectOption(item.value);
            }}
            prependIcon={item.iconName}
            prependIconStyle={[{ marginRight: 5 }]}
            content={item.label ?? item.value}
            color={
              optionSelected === item.value
                ? theme.colors.background
                : theme.colors.text
            }
            contentStyle={[
              {
                fontWeight: "500",
                fontSize: 12,
              },
            ]}
            styleProp={[
              style.rounded,
              {
                backgroundColor: !(optionSelected === item.value)
                  ? theme.colors.border
                  : theme.colors.text,
                flex: 0,
                paddingHorizontal: 15,
                paddingVertical: 7,
                marginRight: 10,
                marginBottom: 10,
              },
            ]}
          ></RoundedButton>
        ))}
      </View>
    </View>
  );
}
