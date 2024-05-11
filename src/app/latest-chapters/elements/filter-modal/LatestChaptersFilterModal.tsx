import { Modal, ModalProps, View } from "react-native";
import { style } from "../../../../common/utils/style-utils";
import { useTheme } from "@react-navigation/native";
import RoundedButton from "../../../../common/components/buttons/RoundedButton";
import { colors } from "../../../../shared/src/config/enums/Colors";
import CustomPageHeader from "../../../../common/components/navigation/CustomPageHeader";
import { useSettingsStore } from "../../../../common/store/settings.store";
import FilterRadioList from "./components/filter-radio-list/FilterRadioList";
import { SourceName } from "../../../../shared/src/types/primitives/Identifiers";
import { useFavoritesStore } from "../../../../common/store/favorites.store";
import { useRef } from "react";
import LatestChapterFilter from "../../../../common/types/filter/LatestChapterFilter";
import { DefaultValues } from "../../../../common/config/DefaultValues";

export default function LatestChaptersFilterModal({
  visible,
  onRequestClose,
  onFilter,
  ...props
}: {
  visible: boolean;
  onRequestClose?: () => void;
  onFilter?: (filter: LatestChapterFilter) => void;
} & ModalProps) {
  const theme = useTheme();
  const { get } = useSettingsStore();
  const { getAll } = useFavoritesStore();

  const filter = useRef<{ srcs?: string[]; favoritesLists?: string[] }>({});

  return (
    <Modal animationType="fade" visible={visible} {...props}>
      <View style={[{ flex: 1, backgroundColor: theme.colors.background }]}>
        <CustomPageHeader
          title="Latest Chapters Filters"
          goBackBtnPress={() => {
            onRequestClose && onRequestClose();
          }}
        ></CustomPageHeader>
        <View style={[{ height: 20 }]}></View>
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
        <View
          style={[
            style.flexRow,
            {
              paddingTop: 10,
              paddingBottom: 5,
              justifyContent: "space-evenly",
              marginTop: 30,
            },
          ]}
        >
          <RoundedButton
            styleProp={[{ backgroundColor: theme.colors.border }]}
            content="CANCEL"
            contentStyle={[{ fontWeight: "500", opacity: 0.7 }]}
            onPress={() => {
              onRequestClose && onRequestClose();
            }}
          ></RoundedButton>
          <RoundedButton
            styleProp={[
              {
                backgroundColor: colors.green[500],
              },
            ]}
            content="CONFIRM"
            contentStyle={[
              {
                fontWeight: "500",
                color: colors.white,
              },
            ]}
            onPress={() => {
              onRequestClose && onRequestClose();
              const tmp = { ...filter.current };
              if (
                tmp.srcs &&
                tmp.srcs.includes(DefaultValues.ALL_OPTION_VALUE)
              ) {
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
          ></RoundedButton>
        </View>
      </View>
    </Modal>
  );
}
