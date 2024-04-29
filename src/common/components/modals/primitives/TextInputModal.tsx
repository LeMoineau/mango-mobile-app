import { Modal, ModalProps, Pressable, TextInput, View } from "react-native";
import { style } from "../../../utils/style-utils";
import { useTheme } from "@react-navigation/native";
import ThemedText from "../../text/ThemedText";
import RounedButton from "../../buttons/RoundedButton";
import { colors } from "../../../../../../shared/src/config/enums/Colors";
import { useRef } from "react";

export default function TextInputModal({
  label,
  onSubmit,
  ...props
}: {
  label?: string;
  onSubmit?: (text: string) => void;
} & ModalProps) {
  const theme = useTheme();
  const value = useRef<string>("");

  return (
    <Modal animationType="fade" transparent {...props}>
      <Pressable
        style={[
          style.flexCol,
          style.justifyCenter,
          style.itemsCenter,
          { flex: 1 },
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
              padding: 20,
              paddingBottom: 0,
              borderColor: theme.colors.background,
            },
          ]}
        >
          {label && (
            <>
              <ThemedText
                style={[{ fontSize: 12, textAlign: "left", width: "100%" }]}
              >
                {label}
              </ThemedText>
              <View style={[{ height: 10 }]}></View>
            </>
          )}
          <TextInput
            style={[
              style.roundedSm,
              {
                width: 250,
                paddingVertical: 12,
                paddingHorizontal: 25,
                color: theme.colors.text,
                backgroundColor: theme.colors.border,
              },
            ]}
            onChange={(evt) => {
              value.current = evt.nativeEvent.text;
            }}
            onSubmitEditing={(evt) => {
              onSubmit && onSubmit(evt.nativeEvent.text.trim());
              props.onRequestClose && props.onRequestClose({} as any);
            }}
            autoFocus
          ></TextInput>
          <View
            style={[
              style.flexRow,
              style.justifyBetween,
              { paddingTop: 10, paddingBottom: 5 },
            ]}
          >
            <RounedButton
              content="CANCEL"
              contentStyle={[{ fontWeight: "500", opacity: 0.7 }]}
              onPress={() => {
                props.onRequestClose && props.onRequestClose({} as any);
              }}
            ></RounedButton>
            <RounedButton
              content="CONFIRM"
              contentStyle={[{ fontWeight: "500", color: colors.green[400] }]}
              onPress={() => {
                onSubmit && onSubmit(value.current.trim());
                props.onRequestClose && props.onRequestClose({} as any);
              }}
            ></RounedButton>
          </View>
        </View>
      </Pressable>
    </Modal>
  );
}
