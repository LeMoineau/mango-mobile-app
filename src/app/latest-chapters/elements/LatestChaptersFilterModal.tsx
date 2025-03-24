import { ModalProps, View } from "react-native";
import { useSettingsStore } from "../../../common/store/settings.store";
import FilterRadioList from "../../../common/components/form/filter-radio-list/FilterRadioList";
import {
  Lang,
  SourceName,
} from "../../../shared/src/types/primitives/Identifiers";
import { useFavoritesStore } from "../../../common/store/favorites.store";
import { useEffect, useRef, useState } from "react";
import LatestChapterFilter, {
  LatestChapterDisplay,
} from "../../../common/types/filter/LatestChapterFilter";
import { DefaultValues } from "../../../common/config/DefaultValues";
import FilterModal from "../../../common/components/modals/filter/FilterModal";
import { LanguagesUtils } from "../../../common/utils/languages-utils";
import FilterSelectList from "../../../common/components/form/FilterSelectList";
import { AllIconNames } from "../../../common/types/IconName";
import useLatestChaptersFilter from "../hooks/useLatestChaptersFilter";

const displayItems: {
  value: LatestChapterDisplay;
  label: string;
  icon: AllIconNames;
}[] = [
  { value: "list", label: "List", icon: "list" },
  { value: "grid", label: "Grid", icon: "grid" },
  // { value: "by src", label: "By src", icon: "git-branch" },
];

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

  const [filter, setFilter] = useState<LatestChapterFilter>({});
  const resetter = useRef(false);

  const { getFilter } = useLatestChaptersFilter();

  useEffect(() => {
    getFilter().then((res) => {
      if (!res) return;
      setFilter(res);
    });
  }, []);

  return (
    <FilterModal
      visible={visible}
      onRequestClose={onRequestClose}
      title="Latest Chapters Options"
      dontHaveCancelBtn
      hasResetBtn
      onSubmit={() => {
        const tmp = { ...filter };
        if (tmp.srcs?.includes(DefaultValues.ALL_OPTION_VALUE)) {
          delete tmp.srcs;
        }
        if (tmp.favoritesLists?.includes(DefaultValues.ALL_OPTION_VALUE)) {
          delete tmp.favoritesLists;
        }
        if (tmp.langs?.includes(DefaultValues.ALL_OPTION_VALUE)) {
          delete tmp.langs;
        }
        onFilter && onFilter(tmp);
      }}
      onReset={() => {
        setFilter({});
        resetter.current = !resetter.current;
      }}
    >
      <View style={{ rowGap: 20 }}>
        <FilterSelectList
          title="Display"
          options={displayItems.map((s) => ({
            label: s.label,
            value: s.value,
            iconName: s.icon,
          }))}
          defaultOptionSelected={filter.display ?? "list"}
          resetter={resetter.current}
          onSelectOption={(display) => {
            setFilter({ ...filter, display: display as LatestChapterDisplay });
          }}
        ></FilterSelectList>
        <FilterRadioList
          title="Languages"
          defaultOptionsSelected={filter.langs}
          options={((get("langs") as Lang[]) ?? []).map((l) => {
            const flag = LanguagesUtils.getFlagForLang(l);
            return {
              label: `${flag} ${LanguagesUtils.getNameForLang(l) ?? "Unknown"}`,
              value: l,
              iconName: flag ? undefined : "language",
            };
          })}
          resetter={resetter.current}
          onSelectOption={(optionsSelected) => {
            setFilter({ ...filter, langs: optionsSelected });
          }}
        ></FilterRadioList>
        <FilterRadioList
          title="Favorites"
          descriptions="Show only mangas from selected lists"
          defaultOptionsSelected={filter.favoritesLists}
          options={getAll().map((favList) => ({
            value: favList.name,
            iconName: "bookshelf",
          }))}
          resetter={resetter.current}
          onSelectOption={(optionsSelected) => {
            setFilter({ ...filter, favoritesLists: optionsSelected });
          }}
        ></FilterRadioList>
        <FilterRadioList
          title="Sources"
          options={(get("srcs") as SourceName[]).map((s) => ({
            value: s,
            iconName: "source-branch",
          }))}
          resetter={resetter.current}
          defaultOptionsSelected={filter.srcs}
          onSelectOption={(optionsSelected) => {
            setFilter({ ...filter, srcs: optionsSelected });
          }}
        ></FilterRadioList>
      </View>
    </FilterModal>
  );
}
