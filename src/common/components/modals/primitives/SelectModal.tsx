import { FlatList, Modal, ModalProps, Pressable, View } from "react-native";
import { style } from "../../../utils/style-utils";
import { useTheme } from "@react-navigation/native";
import ThemedText from "../../text/ThemedText";
import { AllIconNames } from "../../../types/IconName";
import IconedText from "../../text/IconedText";

export type SelectModalOption = {
  label: string;
  iconName?: AllIconNames;
};

export default function SelectModal({
  options,
  onSelect,
  alreadySelected,
  ...props
}: {
  options: SelectModalOption[];
  alreadySelected?: string;
  onSelect?: (label: string) => void;
} & ModalProps) {
  const theme = useTheme();

  return (
    <Modal animationType="fade" transparent {...props}>
      <Pressable
        style={[
          style.flexCol,
          style.justifyCenter,
          style.itemsCenter,
          { flex: 1, backgroundColor: "rgba(0, 0, 0, 0.5)" },
        ]}
        onPress={(evt) => {
          props.onRequestClose && props.onRequestClose(evt);
        }}
      >
        <View
          style={[
            style.border,
            style.rounded,
            {
              backgroundColor: theme.colors.card,
              borderColor: theme.colors.background,
              width: 250,
            },
          ]}
        >
          <FlatList
            data={options}
            style={{ flex: 0 }}
            contentContainerStyle={[{ flex: 0 }]}
            keyExtractor={(_, index) => `select-modal-option-${index}`}
            ItemSeparatorComponent={() => (
              <View style={[{ paddingHorizontal: 20 }]}>
                <View
                  style={[
                    style.border,
                    {
                      height: 1,
                      width: "100%",
                      borderBottomWidth: 0,
                      borderColor: theme.colors.border,
                    },
                  ]}
                ></View>
              </View>
            )}
            renderItem={({ item }) => (
              <Pressable
                style={[
                  {
                    width: "100%",
                    padding: 20,
                    flex: 0,
                    opacity: alreadySelected === item.label ? 0.5 : 1,
                  },
                ]}
                onPress={(evt) => {
                  props.onRequestClose && props.onRequestClose(evt);
                  onSelect && onSelect(item.label);
                }}
              >
                {item.iconName ? (
                  <IconedText iconName={item.iconName}>
                    {" " + item.label}
                  </IconedText>
                ) : (
                  <ThemedText>{item.label}</ThemedText>
                )}
              </Pressable>
            )}
          ></FlatList>
        </View>
      </Pressable>
    </Modal>
  );
}
