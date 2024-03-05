// import { Modal, ModalProps, Text, View } from "react-native";
// import React from "react";
// import { style } from "../../utils/style-utils";

// export default function ConfirmModal({
//   children,
//   onConfirm,
//   onCancel,
//   confirmButton,
//   ...props
// }: {
//   children: React.ReactNode;
//   onConfirm?: () => void;
//   onCancel?: () => void;
//   confirmButton?: (
//     onPress?: (evt: GestureResponderEvent) => void
//   ) => React.ReactNode;
// } & ModalProps) {
//   return (
//     <Modal animationType="slide" transparent {...props}>
//       <View
//         style={[
//           style.justifyCenter,
//           style.itemsCenter,
//           { flex: 1, padding: 20 },
//         ]}
//       >
//         <View
//           style={[
//             style.rounded,
//             style.shadowMd,
//             style.wFull,
//             style.justifyCenter,
//             style.itemsCenter,
//             style.border,
//             { padding: 20, backgroundColor: colors.white },
//           ]}
//         >
//           <View style={{ paddingVertical: 20 }}>{children}</View>
//           <View
//             style={[
//               style.flexRow,
//               style.itemsCenter,
//               style.wFull,
//               { justifyContent: "space-around" },
//             ]}
//           >
//             {confirmButton ? (
//               confirmButton((evt) => {
//                 props.onRequestClose && props.onRequestClose(evt);
//                 onConfirm && onConfirm();
//               })
//             ) : (
//               <StandardButton
//                 style={{ paddingTop: 10 }}
//                 bgColor={colors.teal[400]}
//                 textColor={colors.white}
//                 onPress={(evt) => {
//                   props.onRequestClose && props.onRequestClose(evt);
//                   onConfirm && onConfirm();
//                 }}
//               >
//                 Confirm
//               </StandardButton>
//             )}

//             <StandardButton
//               style={{ paddingTop: 10 }}
//               bgColor={colors.red[400]}
//               textColor={colors.white}
//               onPress={(evt) => {
//                 props.onRequestClose && props.onRequestClose(evt);
//                 onCancel && onCancel();
//               }}
//             >
//               Cancel
//             </StandardButton>
//           </View>
//         </View>
//       </View>
//     </Modal>
//   );
// }
