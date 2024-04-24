import ThemedText from "@/common/components/text/ThemedText";
import { style } from "@/common/utils/style-utils";
import { useTheme } from "@react-navigation/native";
import { useEffect, useRef } from "react";
import { Animated, View } from "react-native";
import Triangle from "react-native-triangle";

export default function FilterBubble({ isShown }: { isShown: boolean }) {
  const opacity = useRef(new Animated.Value(0)).current;
  const theme = useTheme();

  useEffect(() => {
    if (isShown) {
      Animated.timing(opacity, {
        toValue: 1,
        duration: 250,
        useNativeDriver: false,
      }).start();
    } else {
      Animated.timing(opacity, {
        toValue: 0,
        duration: 250,
        useNativeDriver: false,
      }).start();
    }
  }, [isShown]);

  return (
    <>
      <Animated.View
        style={[
          {
            position: "absolute",
            top: 70,
            left: 0,
            zIndex: 20,
            opacity,
            width: "100%",
            paddingHorizontal: 10,
            transform: [
              {
                translateY: opacity.interpolate({
                  inputRange: [0, 1],
                  outputRange: [20, 0],
                }),
              },
            ],
          },
        ]}
      >
        <View style={[{ flex: 1, flexDirection: "row-reverse" }]}>
          <View style={[{ width: 10 }]}></View>
          <Triangle
            width={30}
            height={20}
            color={theme.colors.border}
            direction={"up"}
          />
        </View>
        <View
          style={[
            style.rounded,
            { backgroundColor: theme.colors.border, padding: 20 },
          ]}
        >
          <ThemedText>coucou</ThemedText>
        </View>
      </Animated.View>
    </>
  );
}
