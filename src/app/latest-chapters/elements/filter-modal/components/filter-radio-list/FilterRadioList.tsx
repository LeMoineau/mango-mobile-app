import { View } from "react-native";
import { style } from "../../../../../../common/utils/style-utils";
import ThemedText from "../../../../../../common/components/text/ThemedText";
import RoundedButton from "../../../../../../common/components/buttons/RoundedButton";
import { useTheme } from "@react-navigation/native";
import { AllIconNames } from "../../../../../../common/types/IconName";
import useFilterRadioList from "./useFilterRadioList";
import { DefaultValues } from "../../../../../../common/config/DefaultValues";

export default function FilterRadioList({
  title,
  options,
  defaultOptionsSelected,
  noAllOption,
  onSelectOption,
}: {
  title: string;
  options: { value: string; iconName?: AllIconNames }[];
  defaultOptionsSelected?: string[];
  noAllOption?: boolean;
  onSelectOption?: (optionsSelected: string[]) => void;
}) {
  const theme = useTheme();
  const { optionsSelected, toggleOption } = useFilterRadioList({
    options: [DefaultValues.ALL_OPTION_VALUE, ...options.map((o) => o.value)],
    defaultOptions: defaultOptionsSelected,
    noAllOption,
  });

  return (
    <>
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
          {(noAllOption
            ? options
            : [{ value: DefaultValues.ALL_OPTION_VALUE }, ...options]
          ).map((item, index) => (
            <RoundedButton
              key={`filter-radio-item-${title}-${index}`}
              onPress={() => {
                const newOptionsSelected = toggleOption(item.value);
                onSelectOption && onSelectOption(newOptionsSelected);
              }}
              prependIcon={item.iconName}
              prependIconStyle={[{ marginRight: 5 }]}
              content={item.value}
              color={
                optionsSelected.includes(item.value)
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
                  backgroundColor: !optionsSelected.includes(item.value)
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
    </>
  );
}
