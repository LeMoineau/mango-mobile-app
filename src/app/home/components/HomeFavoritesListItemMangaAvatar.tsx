import { View } from "react-native";
import { UUID } from "../../../../../shared/src/types/primitives/Identifiers";
import CustomImage from "../../../common/components/image/CustomImage";
import { useCacheStore } from "../../../common/store/cache.store";
import { style } from "../../../common/utils/style-utils";

export default function HomeFavoritesListItemMangaAvatar({
  size,
  intersiteMangaId,
}: {
  size: number;
  intersiteMangaId: UUID;
}) {
  const { getCachedManga } = useCacheStore();
  return (
    <>
      <View
        style={[
          style.roundedSm,
          { width: size, height: size, backgroundColor: "red" },
        ]}
      >
        {<CustomImage uri="a" width="100%" height="100%"></CustomImage>}
      </View>
    </>
  );
}
