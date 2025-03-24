import { Pressable, Text, View } from "react-native";
import { style } from "../../../common/utils/style-utils";
import { useTheme } from "@react-navigation/native";
import ThemedText from "../../../common/components/text/ThemedText";
import ExpoIcon from "../../../common/components/icons/ExpoIcon";
import useAnimatedValue from "../../../common/hooks/use-animated-value";
import Divider from "../../../common/components/text/Divider";

export default function SettingSection({
  children,
  sectionName,
  description,
  defaultMinimize,
}: {
  children?: React.ReactNode;
  sectionName?: string;
  description?: string;
  defaultMinimize?: boolean;
}) {
  const theme = useTheme();
  const { enable, setEnabled } = useAnimatedValue({
    duration: 250,
    defaultState: defaultMinimize ? false : true,
  });

  return (
    <>
      <View
        style={[
          style.rounded,
          style.border,
          {
            paddingHorizontal: 20,
            paddingVertical: 10,
            backgroundColor: theme.colors.card,
            borderColor: theme.colors.border,
            marginTop: 10,
          },
        ]}
      >
        {sectionName && (
          <Pressable
            style={[
              style.flexRow,
              style.itemsCenter,
              style.justifyBetween,
              { flex: 1, paddingVertical: 10 },
            ]}
            onPress={() => {
              setEnabled(!enable);
            }}
          >
            <ThemedText
              style={[
                {
                  fontSize: 14,
                },
              ]}
            >
              {sectionName}
            </ThemedText>
            <ExpoIcon
              name={enable ? "angle-up" : "angle-down"}
              size={20}
              color={theme.colors.text}
              styleProps={[{}]}
            ></ExpoIcon>
          </Pressable>
        )}
        {enable && (
          <>
            <Divider
              style={[
                { paddingHorizontal: 0, paddingTop: 5, paddingBottom: 15 },
              ]}
            ></Divider>
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
          </>
        )}
      </View>
    </>
  );
}
