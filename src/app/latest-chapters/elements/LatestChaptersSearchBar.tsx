import SearchBar from "@/common/components/form/SearchBar";
import FilterBubble from "./FilterBubble";
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
          hasFilterBtn
          onFilterBtnPress={() => setFilterBubbleShown(!filterBubbleShown)}
          onSubmit={(text) => onSearch && onSearch(text)}
        ></SearchBar>
        <FilterBubble isShown={filterBubbleShown}></FilterBubble>
      </View>
    </>
  );
}
