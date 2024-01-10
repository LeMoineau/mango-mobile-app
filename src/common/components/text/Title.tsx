import React from "react";
import { Text, View } from "react-native";
import { style } from "../../types/primitives/Styles";
import { useTheme } from "@react-navigation/native";

export default function Title({
  children,
  hasDivider,
}: {
  children: React.ReactNode | string;
  hasDivider?: boolean;
}) {
  const theme = useTheme();
  return (
    <>
      <Text
        style={[style.textLg, { marginVertical: 10, color: theme.colors.text }]}
      >
        {children}
      </Text>
      {hasDivider && (
        <View
          style={[
            style.borderBottom,
            style.wFull,
            {
              height: 1,
              borderColor: theme.colors.border,
              marginBottom: 10,
            },
          ]}
        ></View>
      )}
    </>
  );
}
