import { useWindowDimensions, View } from "react-native";
import { style } from "../../../common/utils/style-utils";
import RoundedButton from "../../../common/components/buttons/RoundedButton";
import SearchBar from "../../../common/components/form/SearchBar";
import { useNavigationType } from "../../../common/types/navigation/NavigationTypes";
import { useNavigation } from "@react-navigation/native";
import Gradient, {
  GradientDirection,
} from "../../../common/components/image/Gradient";

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
  const { width } = useWindowDimensions();

  return (
    <View style={[{ marginBottom: 10 }]}>
      <View
        style={[
          style.flexRow,
          style.itemsCenter,
          style.justifyCenter,
          { paddingTop: 10, paddingBottom: 0, paddingHorizontal: 10 },
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
      <Gradient
        direction={GradientDirection.TOP_TO_BOTTOM}
        style={[{ position: "absolute", bottom: -30, left: 0, zIndex: 15 }]}
        height={30}
        width={width}
      ></Gradient>
    </View>
  );
}
