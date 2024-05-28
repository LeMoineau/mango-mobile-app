import { colors } from "../../../shared/src/config/enums/Colors";
import { UUID } from "../../../shared/src/types/primitives/Identifiers";
import { useFavoritesStore } from "../../../common/store/favorites.store";
import DotsOptionsItem from "./DotsOptionsItem";

export default function LikeDotsOptionsItem({
  intersiteMangaId,
}: {
  intersiteMangaId: UUID;
}) {
  const { intersiteMangaAlreadyLiked, like, unlike } = useFavoritesStore();

  return (
    <>
      <DotsOptionsItem
        iconName="heart"
        iconColor={
          intersiteMangaAlreadyLiked(intersiteMangaId)
            ? colors.red[400]
            : undefined
        }
        label={intersiteMangaAlreadyLiked(intersiteMangaId) ? "LIKED" : "LIKE"}
        onPress={() => {
          if (intersiteMangaAlreadyLiked(intersiteMangaId)) {
            unlike(intersiteMangaId);
          } else {
            like(intersiteMangaId);
          }
        }}
      ></DotsOptionsItem>
    </>
  );
}
