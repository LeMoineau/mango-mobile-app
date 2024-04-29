import SearchBar from "@/common/components/form/SearchBar";
import { useState } from "react";
import { View } from "react-native";

export default function LatestChaptersSearchBar({
  onSearch,
}: {
  onSearch?: (text: string) => void;
}) {
  const [filterBubbleShown, setFilterBubbleShown] = useState(false);
  return (
    <>
      <View>
        <SearchBar
          placeholder="Search Manga"
          hasFilterBtn
          onFilterBtnPress={() => setFilterBubbleShown(!filterBubbleShown)}
          onSubmit={(text) => onSearch && onSearch(text)}
          style={[{}]}
        ></SearchBar>
      </View>
    </>
  );
}
