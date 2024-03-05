import { Text, View } from "react-native";
import { style } from "../../../common/utils/style-utils";
import { useTheme } from "@react-navigation/native";

export default function SettingSection({
  children,
  sectionName,
  description,
  dividerBetweenItems,
}: {
  children?: React.ReactNode;
  sectionName?: string;
  description?: string;
  dividerBetweenItems?: boolean;
}) {
  const theme = useTheme();
  return (
    <>
      {sectionName && (
        <Text
          style={[
            {
              color: theme.colors.text,
              marginTop: 10,
              fontSize: 12,
            },
          ]}
        >
          {sectionName}
        </Text>
      )}
      <View
        style={[
          style.rounded,
          style.border,
          {
            marginTop: 10,
            paddingHorizontal: 20,
            paddingVertical: 10,
            backgroundColor: theme.colors.card,
            borderColor: theme.colors.border,
          },
        ]}
      >
        {description && (
          <Text
            style={[
              {
                color: theme.colors.text,
                opacity: 0.7,
                marginTop: 5,
                fontSize: 10,
                marginBottom: 10,
              },
            ]}
          >
            {description}
          </Text>
        )}
        {children}
      </View>
    </>
  );
}
