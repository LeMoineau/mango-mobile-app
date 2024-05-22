import { View } from "react-native";
import { style } from "../../../common/utils/style-utils";
import RoundedButton from "../../../common/components/buttons/RoundedButton";
import SearchBar from "../../../common/components/form/SearchBar";
import { useNavigationType } from "../../../common/types/navigation/NavigationTypes";
import { useNavigation } from "@react-navigation/native";

export default function IntersiteMangaSearchHeader({
  defaultQuery,
  onSearchSubmit,
  onFilterBtnPress,
}: {
  defaultQuery: string;
  onSearchSubmit: (query: string) => void;
  onFilterBtnPress: () => void;
}) {
  const navigator: useNavigationType = useNavigation();

  return (
    <View
      style={[
        style.flexRow,
        style.itemsCenter,
        style.justifyCenter,
        { paddingTop: 10, paddingBottom: 20, paddingHorizontal: 10 },
      ]}
    >
      <RoundedButton
        prependIcon="arrow-back"
        onPress={() => navigator.goBack()}
      ></RoundedButton>
      <SearchBar
        defaultValue={defaultQuery}
        onSubmit={async (query) => {
          onSearchSubmit && onSearchSubmit(query);
        }}
        hasFilterBtn
        onFilterBtnPress={() => onFilterBtnPress && onFilterBtnPress()}
      ></SearchBar>
    </View>
  );
}
