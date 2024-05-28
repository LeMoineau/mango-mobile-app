import { useTheme } from "@react-navigation/native";
import { useFavoritesStore } from "../../../common/store/favorites.store";
import RoundedButton from "../../../common/components/buttons/RoundedButton";
import { colors } from "../../../shared/src/config/enums/Colors";
import { UUID } from "../../../shared/src/types/primitives/Identifiers";
import { useCacheStore } from "../../../common/store/cache.store";

export default function LikeButton({
  intersiteMangaId,
}: {
  intersiteMangaId?: UUID;
}) {
  const { intersiteMangaAlreadyLiked, like, unlike } = useFavoritesStore();
  const { saveCurrentIntersiteManga } = useCacheStore();
  const theme = useTheme();

  const alreadyLiked = (): boolean => {
    return (
      intersiteMangaId !== undefined &&
      intersiteMangaAlreadyLiked(intersiteMangaId)
    );
  };

  return (
    <RoundedButton
      appendIcon="heart"
      appendIconStyle={[
        {
          color: alreadyLiked() ? colors.white : theme.colors.text,
        },
      ]}
      content={alreadyLiked() ? "LIKED" : "LIKE"}
      contentStyle={[
        {
          fontWeight: "700",
          color: alreadyLiked() ? colors.white : theme.colors.text,
        },
      ]}
      styleProp={[
        {
          backgroundColor: alreadyLiked()
            ? colors.red[400]
            : theme.colors.border,
        },
      ]}
      onPress={async () => {
        if (!intersiteMangaId) return;
        if (alreadyLiked()) {
          unlike(intersiteMangaId);
        } else {
          like(intersiteMangaId);
          saveCurrentIntersiteManga();
        }
      }}
    ></RoundedButton>
  );
}
