import { DimensionValue, Pressable, Text, View } from "react-native";
import { StoredManga } from "../../../shared/src/types/basics/Manga";
import { style } from "../../utils/style-utils";
import { useTheme } from "@react-navigation/native";
import CustomImage from "../image/CustomImage";
import Gradient, { GradientDirection } from "../image/Gradient";
import ThemedText from "../text/ThemedText";
import LoadingText from "../text/LoadingText";
import RoundedButton from "../buttons/RoundedButton";

export default function MangaItem({
  manga,
  height,
  hasDotsBtn,
  onPress,
  onDotsBtnPress,
  onImageLoadingError,
}: {
  manga: StoredManga;
  height?: DimensionValue;
  hasDotsBtn?: boolean;
  onPress?: () => void;
  onDotsBtnPress?: () => void;
  onImageLoadingError?: (manga: StoredManga) => void;
}) {
  const theme = useTheme();

  return (
    <Pressable
      onPress={() => {
        onPress && onPress();
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
              <ThemedText style={[{ fontWeight: "500" }]}>
                {manga.title}
              </ThemedText>
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
  );
}
