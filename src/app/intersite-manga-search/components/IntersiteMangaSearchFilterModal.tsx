import { useRef } from "react";
import { SourceName } from "../../../../../shared/src/types/primitives/Identifiers";
import FilterRadioList from "../../../common/components/form/filter-radio-list/FilterRadioList";
import FilterModal from "../../../common/components/modals/filter/FilterModal";
import Config from "../../../common/config/Config";
import { useSettingsStore } from "../../../common/store/settings.store";
import { View } from "react-native";
import FilterSelectList from "../../../common/components/form/FilterSelectList";
import IntersiteMangaSearchFilter, {
  IntersiteMangaSearchSorting,
} from "../../../common/types/filter/IntersiteMangaSearchFilter";
import { DefaultValues } from "../../../common/config/DefaultValues";

export default function IntersiteMangaSearchFilterModal({
  visible,
  onRequestClose,
  onFilter,
}: {
  visible: boolean;
  onRequestClose?: () => void;
  onFilter?: (filter: IntersiteMangaSearchFilter) => void;
}) {
  const { srcs, defaultSortingInSearch } = useSettingsStore();
  const filter = useRef<{
    srcs?: string[];
    sort?: IntersiteMangaSearchSorting;
  }>({
    sort: defaultSortingInSearch,
  });

  return (
    <FilterModal
      visible={visible}
      onRequestClose={onRequestClose}
      title="Search Filters"
      onSubmit={() => {
        const tmp = { ...filter.current };
        if (tmp.srcs && tmp.srcs.includes(DefaultValues.ALL_OPTION_VALUE)) {
          delete tmp.srcs;
        }
        onFilter &&
          onFilter({ srcs: tmp.srcs as SourceName[], sort: tmp.sort });
      }}
    >
      <FilterSelectList
        title="Sorting"
        options={["Group By Manga", "By Sources"].map((s) => ({
          value: s,
          iconName: "sort",
        }))}
        defaultOptionSelected={filter.current.sort}
        onSelectOption={(sorting) => {
          filter.current.sort = sorting as IntersiteMangaSearchSorting;
        }}
      ></FilterSelectList>
      <View style={[{ height: 20 }]}></View>
      <FilterRadioList
        title="Sources"
        options={srcs.map((s) => ({
          value: s,
          iconName: "source-branch",
        }))}
        defaultOptionsSelected={filter.current.srcs}
        onSelectOption={(optionsSelected) => {
          filter.current.srcs = optionsSelected;
        }}
      ></FilterRadioList>
    </FilterModal>
  );
}
