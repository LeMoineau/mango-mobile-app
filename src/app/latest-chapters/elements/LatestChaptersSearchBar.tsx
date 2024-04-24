import SearchBar from "@/common/components/form/SearchBar";
import FilterBubble from "./FilterBubble";
import { useState } from "react";

export default function LatestChaptersSearchBar() {
  const [filterBubbleShown, setFilterBubbleShown] = useState(false);
  return (
    <>
      <SearchBar
        hasFilterBtn
        onFilterBtnPress={() => setFilterBubbleShown(!filterBubbleShown)}
      ></SearchBar>
      <FilterBubble isShown={filterBubbleShown}></FilterBubble>
    </>
  );
}
