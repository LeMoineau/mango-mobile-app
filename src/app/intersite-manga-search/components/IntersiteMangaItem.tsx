import { Pressable, Text, View } from "react-native";
import { IntersiteManga } from "../../../../../shared/src/types/IntersiteManga";
import { style } from "../../../common/utils/style-utils";
import { useNavigation, useTheme } from "@react-navigation/native";
import useMoreTrustedValue from "../../../common/hooks/use-more-trusted-value";
import { useEffect } from "react";
import CustomImage from "../../../common/components/image/CustomImage";
import { LinearGradient } from "expo-linear-gradient";
import LoadingText from "../../../common/components/text/LoadingText";
import { useNavigationType } from "../../../common/types/navigation/NavigationTypes";

export default function IntersiteMangaItem({
  intersiteManga,
}: {
  intersiteManga: IntersiteManga;
}) {
  const theme = useTheme();
  const { moreTrustedValue: manga, setIntersiteValue } =
    useMoreTrustedValue<IntersiteManga>();

  const navigator: useNavigationType = useNavigation();

  useEffect(() => {
    setIntersiteValue(intersiteManga);
  }, []);

  return (
    <>
      <Pressable
        onPress={() => {
          navigator.navigate("IntersiteMangaInfo", {
            intersiteMangaFormattedName: intersiteManga.formattedName,
          });
        }}
        style={[{ paddingHorizontal: 10 }]}
      >
        <View
          style={[
            style.flexRow,
            style.border,
            style.wFull,
            style.roundedSm,
            {
              overflow: "hidden",
              marginBottom: 10,
              backgroundColor: theme.colors.card,
              borderColor: theme.colors.border,
              height: 100,
            },
          ]}
        >
          <View style={[]}>
            {manga && manga.image && (
              <CustomImage
                uri={manga.image}
                size={100}
                minimizeOnError
              ></CustomImage>
            )}
            <View
              style={[
                {
                  width: 100,
                  height: 100,
                  position: "absolute",
                  top: 0,
                  left: 0,
                },
              ]}
            >
              <LinearGradient
                colors={[theme.colors.card, "transparent"]}
                style={[{ width: "100%", height: "100%" }]}
                start={[1, 0.5]}
                end={[0, 0.5]}
                locations={[0, 1]}
              />
            </View>
          </View>
          <View
            style={[
              style.flexCol,
              style.justifyCenter,
              style.hFull,
              {
                paddingLeft: 8,
                flex: 3,
              },
            ]}
          >
            {manga ? (
              <Text style={{ fontWeight: "500", color: theme.colors.text }}>
                {manga.title}
              </Text>
            ) : (
              <LoadingText></LoadingText>
            )}

            {manga && manga.author && (
              <Text
                style={{ color: theme.colors.text, opacity: 0.7, fontSize: 12 }}
              >
                {manga.author}
              </Text>
            )}
          </View>
        </View>
      </Pressable>
    </>
  );
}
