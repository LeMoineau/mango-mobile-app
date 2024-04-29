import { Pressable, StyleProp, ViewStyle } from "react-native";
import CustomImage from "../../../common/components/image/CustomImage";
import { style } from "../../../common/utils/style-utils";
import { IntersiteManga } from "../../../../../shared/src/types/IntersiteManga";
import { useNavigation, useTheme } from "@react-navigation/native";
import LoadingText from "../../../common/components/text/LoadingText";
import { useNavigationType } from "../../../common/types/navigation/NavigationTypes";
import { useEffect } from "react";
import useTrustedManga from "../../hooks/use-trusted-manga";

export default function IntersiteMangaAvatar({
  size,
  intersiteManga,
  onIntersiteMangaUnfind,
  style: styleProp,
}: {
  size: number;
  intersiteManga?: IntersiteManga;
  onIntersiteMangaUnfind?: () => void;
  style?: StyleProp<ViewStyle>;
}) {
  const theme = useTheme();
  const navigator: useNavigationType = useNavigation();
  const { manga, setIntersiteManga } = useTrustedManga();

  useEffect(() => {
    if (intersiteManga) {
      setIntersiteManga(intersiteManga);
    }
  }, [intersiteManga]);

  return (
    <>
      <Pressable
        style={[
          style.flexRow,
          style.justifyCenter,
          style.itemsCenter,
          style.roundedSm,
          style.overflowHidden,
          {
            width: size,
            height: size,
            backgroundColor: theme.colors.border,
          },
          styleProp,
        ]}
        onPress={() => {
          if (!intersiteManga) return;
          navigator.navigate("IntersiteMangaInfo", {
            intersiteMangaId: intersiteManga.id,
          });
        }}
      >
        {manga && manga.image ? (
          <CustomImage
            uri={manga.image}
            width="100%"
            height="100%"
            onError={() => onIntersiteMangaUnfind && onIntersiteMangaUnfind()}
          ></CustomImage>
        ) : (
          <LoadingText width="100%" height="100%"></LoadingText>
        )}
      </Pressable>
    </>
  );
}
