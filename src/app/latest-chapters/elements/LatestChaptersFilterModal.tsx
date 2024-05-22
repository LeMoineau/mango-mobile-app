import { ModalProps, View } from "react-native";
import { style } from "../../../common/utils/style-utils";
import { useTheme } from "@react-navigation/native";
import RoundedButton from "../../../common/components/buttons/RoundedButton";
import { colors } from "../../../../../shared/src/config/enums/Colors";
import { useSettingsStore } from "../../../common/store/settings.store";
import FilterRadioList from "../../../common/components/form/filter-radio-list/FilterRadioList";
import { SourceName } from "../../../../../shared/src/types/primitives/Identifiers";
import { useFavoritesStore } from "../../../common/store/favorites.store";
import { useRef } from "react";
import LatestChapterFilter from "../../../common/types/filter/LatestChapterFilter";
import { DefaultValues } from "../../../common/config/DefaultValues";
import FilterModal from "../../../common/components/modals/filter/FilterModal";

export default function LatestChaptersFilterModal({
  visible,
  onRequestClose,
  onFilter,
}: {
  visible: boolean;
  onRequestClose?: () => void;
  onFilter?: (filter: LatestChapterFilter) => void;
} & ModalProps) {
  const { get } = useSettingsStore();
  const { getAll } = useFavoritesStore();

  const filter = useRef<{ srcs?: string[]; favoritesLists?: string[] }>({});

  return (
    <FilterModal
      visible={visible}
      onRequestClose={onRequestClose}
      title="Latest Chapters Filters"
      onSubmit={() => {
        const tmp = { ...filter.current };
        if (tmp.srcs && tmp.srcs.includes(DefaultValues.ALL_OPTION_VALUE)) {
          delete tmp.srcs;
        }
        if (
          tmp.favoritesLists &&
          tmp.favoritesLists.includes(DefaultValues.ALL_OPTION_VALUE)
        ) {
          delete tmp.favoritesLists;
        }
        onFilter &&
          onFilter({
            srcs: tmp.srcs as SourceName[],
            favoritesLists: tmp.favoritesLists,
          });
      }}
    >
      <FilterRadioList
        title="Sources"
        options={(get("srcs") as SourceName[]).map((s) => ({
          value: s,
          iconName: "source-branch",
        }))}
        defaultOptionsSelected={filter.current.srcs}
        onSelectOption={(optionsSelected) => {
          filter.current.srcs = optionsSelected;
        }}
      ></FilterRadioList>
      <View style={[{ height: 20 }]}></View>
      <FilterRadioList
        title="Favorites"
        defaultOptionsSelected={filter.current.favoritesLists}
        options={getAll().map((favList) => ({
          value: favList.name,
          iconName: "bookshelf",
        }))}
        onSelectOption={(optionsSelected) => {
          filter.current.favoritesLists = optionsSelected;
        }}
      ></FilterRadioList>
    </FilterModal>
  );
}
