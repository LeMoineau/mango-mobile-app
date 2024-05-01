import { useTheme } from "@react-navigation/native";
import { useWindowDimensions, View } from "react-native";
import CustomImage from "../../../common/components/image/CustomImage";
import LoadingText from "../../../common/components/text/LoadingText";
import { ParentlessStoredManga } from "../../../../../shared/src/types/basics/Manga";

export default function IntersiteMangaInfosBackground({
  manga,
  onLoadingImageError,
}: {
  manga?: ParentlessStoredManga;
  onLoadingImageError?: (manga: ParentlessStoredManga) => void;
}) {
  const theme = useTheme();
  const { width, height } = useWindowDimensions();
  return (
    <View
      style={[
        {
          position: "absolute",
          top: 0,
          left: 0,
          flex: 1,
          width: width,
          minHeight: height,
          backgroundColor: theme.colors.background,
        },
      ]}
    >
      {manga && manga.image ? (
        <CustomImage
          uri={manga.image}
          width={"100%"}
          height={400}
          onError={() => {
            onLoadingImageError && onLoadingImageError(manga);
          }}
        ></CustomImage>
      ) : (
        <LoadingText width={"100%"} height={400}></LoadingText>
      )}
    </View>
  );
}
