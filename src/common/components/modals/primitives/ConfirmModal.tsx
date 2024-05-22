import { Modal, ModalProps, Pressable, View } from "react-native";
import { style } from "../../../utils/style-utils";
import { useTheme } from "@react-navigation/native";
import ThemedText from "../../text/ThemedText";
import RoundedButton from "../../buttons/RoundedButton";
import { colors } from "../../../../../../shared/src/config/enums/Colors";

export default function ConfirmModal({
  label,
  onConfirm,
  onCancel,
  ...props
}: {
  label?: string;
  onConfirm?: () => void;
  onCancel?: () => void;
} & ModalProps) {
  const theme = useTheme();

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
            style.flexCol,
            {
              backgroundColor: theme.colors.card,
              padding: 20,
              paddingBottom: 0,
              borderColor: theme.colors.background,
              maxWidth: 300,
            },
          ]}
        >
          {label && (
            <>
              <ThemedText
                style={[
                  {
                    fontSize: 12,
                    textAlign: "center",
                  },
                ]}
              >
                {label}
              </ThemedText>
            </>
          )}
          <View
            style={[
              style.flexRow,
              style.justifyBetween,
              { paddingTop: 10, paddingBottom: 5 },
            ]}
          >
            <RoundedButton
              content="CANCEL"
              contentStyle={[{ fontWeight: "500", opacity: 0.7 }]}
              onPress={() => {
                onCancel && onCancel();
                props.onRequestClose && props.onRequestClose({} as any);
              }}
            ></RoundedButton>
            <RoundedButton
              content="CONFIRM"
              contentStyle={[{ fontWeight: "500", color: colors.green[400] }]}
              onPress={() => {
                onConfirm && onConfirm();
                props.onRequestClose && props.onRequestClose({} as any);
              }}
            ></RoundedButton>
          </View>
        </View>
      </Pressable>
    </Modal>
  );
}
