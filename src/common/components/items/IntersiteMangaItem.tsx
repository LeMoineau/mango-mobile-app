import { Pressable, Text, View } from "react-native";
import { IntersiteManga } from "../../../../../shared/src/types/basics/IntersiteManga";
import { style } from "../../utils/style-utils";
import { useNavigation, useTheme } from "@react-navigation/native";
import { useEffect } from "react";
import CustomImage from "../image/CustomImage";
import LoadingText from "../text/LoadingText";
import { useNavigationType } from "../../types/navigation/NavigationTypes";
import RoundedButton from "../buttons/RoundedButton";
import Gradient, { GradientDirection } from "../image/Gradient";
import useTrustedManga from "../../hooks/use-trusted-manga";
import { ParentlessStoredManga } from "../../../../../shared/src/types/basics/Manga";

export default function IntersiteMangaItem({
  height,
  hasDotsBtn,
  intersiteManga,
  onDotsBtnPress,
  onImageLoadingError,
  onImageNotFoundError,
}: {
  height?: number;
  hasDotsBtn?: boolean;
  intersiteManga: IntersiteManga;
  onDotsBtnPress?: () => void;
  onImageLoadingError?: (manga: ParentlessStoredManga) => void;
  onImageNotFoundError?: (manga: ParentlessStoredManga) => void;
}) {
  const theme = useTheme();
  const { manga, setIntersiteManga } = useTrustedManga();

  const navigator: useNavigationType = useNavigation();

  useEffect(() => {
    if (intersiteManga) {
      setIntersiteManga(intersiteManga);
    }
  }, [intersiteManga]);

  useEffect(() => {
    if (manga && (!manga.author || manga.image)) {
      onImageNotFoundError && onImageNotFoundError(manga);
    }
  }, [manga]);

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
            style.justifyBetween,
            style.itemsCenter,
            style.border,
            style.wFull,
            style.roundedSm,
            {
              overflow: "hidden",
              marginBottom: 10,
              backgroundColor: theme.colors.card,
              borderColor: theme.colors.border,
              height: height ?? 100,
            },
          ]}
        >
          <View style={[style.flexRow, style.itemsCenter, { flex: 1 }]}>
            {manga && manga.image && (
              <View style={[{ width: height ?? 100, height: height ?? 100 }]}>
                <CustomImage
                  uri={manga.image}
                  size={"100%"}
                  minimizeOnError
                  onError={() =>
                    onImageLoadingError && onImageLoadingError(manga)
                  }
                ></CustomImage>
                <Gradient
                  style={[
                    {
                      width: height ?? 100,
                      height: height ?? 100,
                      position: "absolute",
                      top: 0,
                      left: 0,
                    },
                  ]}
                  from={theme.colors.card}
                  direction={GradientDirection.RIGHT_TO_LEFT}
                ></Gradient>
              </View>
            )}
            <View
              style={[
                style.flexCol,
                style.hFull,
                {
                  paddingLeft: 8,
                  flex: 1,
                },
              ]}
            >
              {manga ? (
                <Text
                  style={{
                    fontWeight: "500",
                    color: theme.colors.text,
                  }}
                >
                  {manga.title}
                </Text>
              ) : (
                <LoadingText></LoadingText>
              )}

              {manga && manga.author && (
                <Text
                  style={{
                    color: theme.colors.text,
                    opacity: 0.7,
                    fontSize: 12,
                  }}
                >
                  {manga.author}
                </Text>
              )}
            </View>
          </View>
          {hasDotsBtn && (
            <View style={[{ width: height ? undefined : 50 }]}>
              <RoundedButton
                prependIcon="dots-vertical"
                onPress={() => onDotsBtnPress && onDotsBtnPress()}
              ></RoundedButton>
            </View>
          )}
        </View>
      </Pressable>
    </>
  );
}
