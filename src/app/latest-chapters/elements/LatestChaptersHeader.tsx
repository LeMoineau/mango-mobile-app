import { View } from "react-native";
import Gradient, {
  GradientDirection,
} from "../../../common/components/image/Gradient";
import { useTheme } from "@react-navigation/native";
import SearchBar from "../../../common/components/form/SearchBar";

export default function LatestChaptersHeader({
  onSearch,
}: {
  onSearch?: (text: string) => void;
}) {
  const theme = useTheme();
  return (
    <>
      <View style={[{ marginBottom: 20 }]}>
        <View
          style={[{ backgroundColor: theme.colors.background, paddingTop: 10 }]}
        >
          <SearchBar
            placeholder="Search Manga"
            hasFilterBtn
            onFilterBtnPress={() => {}}
            onSubmit={(text) => {
              onSearch && onSearch(text);
            }}
            style={[{}]}
          ></SearchBar>
        </View>
        <Gradient
          direction={GradientDirection.TOP_TO_BOTTOM}
          width={"100%"}
          height={40}
          style={[{ position: "absolute", top: "100%", left: 0 }]}
        ></Gradient>
      </View>
    </>
  );
}
