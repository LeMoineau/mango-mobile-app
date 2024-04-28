import { useTheme } from "@react-navigation/native";
import { useFavoritesStore } from "../../store/favorites.store";
import RounedButton from "./RoundedButton";
import { colors } from "../../../../../shared/src/config/enums/Colors";
import { UUID } from "../../../../../shared/src/types/primitives/Identifiers";

export default function LikeButton({
  intersiteMangaId,
}: {
  intersiteMangaId?: UUID;
}) {
  const { intersiteMangaAlreadyLiked, like, unlike } = useFavoritesStore();
  const theme = useTheme();

  const alreadyLiked = (): boolean => {
    return (
      intersiteMangaId !== undefined &&
      intersiteMangaAlreadyLiked(intersiteMangaId)
    );
  };

  return (
    <RounedButton
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
      onPress={() => {
        if (!intersiteMangaId) return;
        if (alreadyLiked()) {
          unlike(intersiteMangaId);
        } else {
          like(intersiteMangaId);
        }
      }}
    ></RounedButton>
  );
}
