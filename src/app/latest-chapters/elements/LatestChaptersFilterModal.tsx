import { ModalProps, View } from "react-native";
import { style } from "../../../common/utils/style-utils";
import { useTheme } from "@react-navigation/native";
import RoundedButton from "../../../common/components/buttons/RoundedButton";
import { colors } from "../../../shared/src/config/enums/Colors";
import { useSettingsStore } from "../../../common/store/settings.store";
import FilterRadioList from "../../../common/components/form/filter-radio-list/FilterRadioList";
import {
  Lang,
  SourceName,
} from "../../../shared/src/types/primitives/Identifiers";
import { useFavoritesStore } from "../../../common/store/favorites.store";
import { useRef } from "react";
import LatestChapterFilter, {
  LatestChapterDisplay,
} from "../../../common/types/filter/LatestChapterFilter";
import { DefaultValues } from "../../../common/config/DefaultValues";
import FilterModal from "../../../common/components/modals/filter/FilterModal";
import { LanguagesUtils } from "../../../common/utils/languages-utils";
import FilterSelectList from "../../../common/components/form/FilterSelectList";
import { AllIconNames } from "../../../common/types/IconName";

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

  const filter = useRef<LatestChapterFilter>({});
  const displayItems: {
    value: LatestChapterDisplay;
    label: string;
    icon: AllIconNames;
  }[] = [
    { value: "list", label: "List", icon: "list" },
    { value: "grid", label: "Grid", icon: "grid" },
    { value: "by src", label: "By src", icon: "git-branch" },
  ];

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
        onFilter && onFilter(tmp);
      }}
    >
      <FilterSelectList
        title="Display"
        options={displayItems.map((s) => ({
          label: s.label,
          value: s.value,
          iconName: s.icon,
        }))}
        defaultOptionSelected={filter.current.display}
        onSelectOption={(display) => {
          filter.current.display = display as LatestChapterDisplay;
        }}
      ></FilterSelectList>
      <View style={[{ height: 10 }]}></View>
      <FilterRadioList
        title="Languages"
        defaultOptionsSelected={filter.current.favoritesLists}
        options={((get("langs") as Lang[]) ?? []).map((l) => {
          const flag = LanguagesUtils.getFlagForLang(l);
          return {
            label: `${flag} (${l})`,
            value: l,
            iconName: flag ? undefined : "language",
          };
        })}
        onSelectOption={(optionsSelected) => {
          filter.current.langs = optionsSelected;
        }}
      ></FilterRadioList>
      <View style={[{ height: 10 }]}></View>
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
      <View style={[{ height: 10 }]}></View>
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
    </FilterModal>
  );
}
