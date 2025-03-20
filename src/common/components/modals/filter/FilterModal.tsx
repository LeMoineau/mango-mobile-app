import { Modal, ModalProps, View } from "react-native";
import CustomPageHeader from "../../navigation/CustomPageHeader";
import { useTheme } from "@react-navigation/native";
import React from "react";
import { style } from "../../../utils/style-utils";
import RoundedButton from "../../buttons/RoundedButton";
import { colors } from "../../../../shared/src/config/enums/Colors";

export default function FilterModal({
  children,
  title,
  visible,
  hideFooter,
  onRequestClose,
  onSubmit,
  ...props
}: {
  children?: React.ReactNode;
  title?: string;
  visible: boolean;
  hideFooter?: boolean;
  onRequestClose?: () => void;
  onSubmit?: () => void;
} & ModalProps) {
  const theme = useTheme();

  return (
    <Modal
      onRequestClose={onRequestClose}
      animationType="fade"
      visible={visible}
      {...props}
    >
      <View style={[{ flex: 1, backgroundColor: theme.colors.background }]}>
        {title && (
          <>
            <CustomPageHeader
              title={title}
              goBackBtnPress={() => {
                onRequestClose && onRequestClose();
              }}
            ></CustomPageHeader>
            <View style={[{ height: 20 }]}></View>
          </>
        )}
        {children}
        {!hideFooter && (
          <View
            style={[
              style.flexRow,
              {
                paddingTop: 10,
                paddingBottom: 5,
                justifyContent: "space-evenly",
                marginTop: 30,
              },
            ]}
          >
            <RoundedButton
              styleProp={[{ backgroundColor: theme.colors.border }]}
              content="CANCEL"
              contentStyle={[{ fontWeight: "500", opacity: 0.7 }]}
              onPress={() => {
                onRequestClose && onRequestClose();
              }}
            ></RoundedButton>
            <RoundedButton
              styleProp={[
                {
                  backgroundColor: colors.green[500],
                },
              ]}
              content="CONFIRM"
              contentStyle={[
                {
                  fontWeight: "500",
                  color: colors.white,
                },
              ]}
              onPress={() => {
                onRequestClose && onRequestClose();
                onSubmit && onSubmit();
              }}
            ></RoundedButton>
          </View>
        )}
      </View>
    </Modal>
  );
}
