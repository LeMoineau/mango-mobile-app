import { Animated, Image, Pressable, Text, View } from "react-native";
import { style } from "../../../common/utils/style-utils";
import { useTheme } from "@react-navigation/native";
import { useSettingsStore } from "../../../common/store/settings.store";
import ExpoIcon from "../../../common/components/icons/ExpoIcon";
import { IntersiteChapterInfos } from "@shared/types/intersite/IntersiteChapter";
import { useEffect, useRef, useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { IntersiteUtils } from "../../../common/utils/intersite-utils";
import RounedButton from "../../../common/components/buttons/RoundedButton";
import { colors } from "./../../../shared/utils/color-utils";

export default function MangaChapterItem({
  chapter,
  pressReadBtn,
}: {
  chapter: IntersiteChapterInfos;
  pressReadBtn?: () => void;
}) {
  const theme = useTheme();

  const { getMoreTrustedIn } = useSettingsStore();

  const heightValue = useRef(new Animated.Value(0)).current;
  const [minimise, setMinimise] = useState(true);

  useEffect(() => {
    if (minimise) {
      Animated.timing(heightValue, {
        toValue: 0,
        duration: 250,
        useNativeDriver: false,
      }).start();
    } else {
      Animated.timing(heightValue, {
        toValue: 1,
        duration: 250,
        useNativeDriver: false,
      }).start();
    }
  }, [minimise]);

  return (
    <>
      <Animated.View
        style={[
          style.border,
          style.roundedSm,
          style.flexCol,
          style.overflowHidden,
          {
            marginBottom: 10,
            height: heightValue.interpolate({
              inputRange: [0, 1],
              outputRange: [70, 140],
            }),
            backgroundColor: theme.colors.card,
            borderColor: theme.colors.border,
          },
        ]}
      >
        <View>
          <View
            style={[
              {
                position: "absolute",
                top: 0,
                left: 0,
                height: 70,
                width: 70,
              },
            ]}
          >
            <Image
              source={{ uri: getMoreTrustedIn<string>(chapter.image)[1] }}
              style={[
                {
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                },
              ]}
            ></Image>
            <LinearGradient
              colors={[theme.colors.card, "transparent"]}
              style={[{ width: "100%", height: "100%" }]}
              start={[1, 0.5]}
              end={[0, 0.5]}
              locations={[0, 1]}
            />
            <Animated.View
              style={[
                {
                  position: "absolute",
                  top: 0,
                  left: 0,
                  opacity: heightValue,
                  width: "100%",
                  height: "100%",
                },
              ]}
            >
              <LinearGradient
                colors={[theme.colors.card, "transparent"]}
                style={[
                  {
                    width: "100%",
                    height: "100%",
                  },
                ]}
                start={[0.5, 1]}
                end={[0.5, 0]}
                locations={[0, 0.2]}
              />
            </Animated.View>
          </View>
          <Pressable
            style={[
              {
                paddingLeft: IntersiteUtils.hasSource(chapter.image) ? 70 : 0,
              },
            ]}
            onPress={() => setMinimise(!minimise)}
          >
            <View
              style={[
                style.flexRow,
                style.justifyBetween,
                style.itemsCenter,
                {
                  paddingHorizontal: 10,
                  paddingVertical: 10,
                  height: 70,
                },
              ]}
            >
              <View
                style={[
                  style.overflowHidden,
                  {
                    flex: 1,
                    paddingRight: 10,
                  },
                ]}
              >
                <Text style={[{ color: theme.colors.text, opacity: 0.7 }]}>
                  {getMoreTrustedIn<string>(chapter.title)[1]}
                </Text>
                {IntersiteUtils.hasSource(chapter.realeaseDate) ? (
                  <Text
                    style={[
                      {
                        color: theme.colors.text,
                        opacity: 0.5,
                        fontSize: 10,
                      },
                    ]}
                  >
                    {new Date(
                      getMoreTrustedIn(chapter.realeaseDate)[1]!
                    ).toDateString()}
                  </Text>
                ) : (
                  <></>
                )}
              </View>
              <View style={[style.flexRow, style.itemsCenter, {}]}>
                <ExpoIcon
                  name={minimise ? "angle-down" : "angle-up"}
                  color={theme.colors.text}
                  size={25}
                  styleProps={{ opacity: 0.7 }}
                ></ExpoIcon>
              </View>
            </View>
          </Pressable>
        </View>
        {
          <Animated.View
            style={[
              style.flexRow,
              style.itemsCenter,
              {
                flex: 1,
                justifyContent: "flex-end",
                paddingRight: 20,
                opacity: heightValue,
              },
            ]}
          >
            <View style={[style.flexRow, style.itemsCenter, {}]}>
              <RounedButton
                content="DOWNLOAD"
                contentStyle={[{ fontSize: 12 }]}
                appendIcon="file-download"
                styleProp={[
                  {
                    marginRight: 10,
                    backgroundColor: theme.colors.border,
                    opacity: 1,
                  },
                ]}
              ></RounedButton>
              {/* <RounedButton
                content="DOWNLOADED"
                contentStyle={[style.textBold, { fontSize: 12 }]}
                appendIcon="check-circle"
                styleProp={[
                  {
                    marginRight: 10,
                    backgroundColor: colors.green[600],
                    opacity: 1,
                  },
                ]}
              ></RounedButton> */}
              <RounedButton
                content="READ"
                contentStyle={[style.textBold, { color: colors.white }]}
                appendIcon="book"
                appendIconStyle={[{ color: colors.white }]}
                styleProp={[{ backgroundColor: theme.colors.primary }]}
                onPress={() => pressReadBtn && pressReadBtn()}
              ></RounedButton>
            </View>
          </Animated.View>
        }
      </Animated.View>
    </>
  );
}
