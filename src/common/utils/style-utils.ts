import { StyleSheet } from "react-native";
import { colors } from "../../../../shared/src/config/enums/Colors";

export const style = StyleSheet.create({
  flexRow: {
    display: "flex",
    flexDirection: "row",
  },
  flexCol: {
    display: "flex",
    flexDirection: "column",
  },
  justifyCenter: {
    justifyContent: "center",
  },
  justifyBetween: {
    justifyContent: "space-between",
  },
  itemsCenter: {
    alignItems: "center",
  },
  flexWrap: {
    flexWrap: "wrap",
  },
  wFull: {
    width: "100%",
  },
  hFull: {
    height: "100%",
  },
  shadowMd: {
    shadowColor: "rgba(0, 0, 0, 0.25)",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
  },
  textSm: {
    fontSize: 12,
  },
  textMd: {
    fontSize: 20,
  },
  textLg: {
    fontSize: 25,
  },
  textXl: {
    fontSize: 30,
  },
  text2Xl: {
    fontSize: 35,
  },
  textBold: {
    fontWeight: "bold",
  },
  roundedSm: {
    borderRadius: 5,
  },
  rounded: {
    borderRadius: 10,
  },
  roundedLg: {
    borderRadius: 30,
  },
  roundedFull: {
    borderRadius: 9999,
  },
  overflowHidden: {
    overflow: "hidden",
  },
  textShadowMd: {
    textShadowColor: "black",
    textShadowRadius: 3,
  },
  textCenter: {
    textAlign: "center",
  },
  border: {
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: colors.gray[200],
  },
  borderTop: {
    borderTopWidth: 1,
    borderTopStyle: "solid",
    borderTopColor: colors.gray[200],
  },
  borderBottom: {
    borderBottomWidth: 1,
    borderBottomStyle: "solid",
    borderBottomColor: colors.gray[200],
  },
  borderLeft: {
    borderLeftWidth: 1,
    borderLeftStyle: "solid",
    borderLeftColor: colors.gray[200],
  },
  borderRight: {
    borderRightWidth: 1,
    borderRightStyle: "solid",
    borderRightColor: colors.gray[200],
  },
});
