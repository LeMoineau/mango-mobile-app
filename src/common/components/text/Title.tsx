import React from "react";
import { StyleProp, Text, TextStyle, View } from "react-native";
import { style } from "../../utils/style-utils";
import { useTheme } from "@react-navigation/native";

export default function Title({
  children,
  hasDivider,
  styleProps,
}: {
  children: React.ReactNode | string;
  hasDivider?: boolean;
  styleProps?: StyleProp<TextStyle>;
}) {
  const theme = useTheme();
  return (
    <>
      <Text
        style={[
          style.textLg,
          { marginVertical: 10, color: theme.colors.text },
          styleProps,
        ]}
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
