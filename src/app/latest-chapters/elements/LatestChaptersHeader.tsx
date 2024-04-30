import { View } from "react-native";
import Gradient, {
  GradientDirection,
} from "../../../common/components/image/Gradient";
import { useTheme } from "@react-navigation/native";
import SearchBar from "../../../common/components/form/SearchBar";
import { style } from "../../../common/utils/style-utils";

export default function LatestChaptersHeader({
  onSearch,
}: {
  onSearch?: (text: string) => void;
}) {
  const theme = useTheme();
  return (
    <>
      <View
        style={[
          style.flexRow,
          {
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            zIndex: 15,
          },
        ]}
      >
        <SearchBar
          placeholder="Search Manga"
          hasFilterBtn
          onFilterBtnPress={() => {}}
          onSubmit={(text) => {
            onSearch && onSearch(text);
          }}
          style={[{ backgroundColor: theme.colors.background }]}
        ></SearchBar>
        <Gradient
          direction={GradientDirection.TOP_TO_BOTTOM}
          width={"100%"}
          height={40}
          style={[
            {
              position: "absolute",
              top: "100%",
              left: 0,
            },
          ]}
        ></Gradient>
      </View>
    </>
  );
}
