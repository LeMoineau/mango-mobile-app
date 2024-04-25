import { View } from "react-native";
import LatestChaptersSearchBar from "./LatestChaptersSearchBar";
import Gradient, {
  GradientDirection,
} from "../../../common/components/image/Gradient";
import { useTheme } from "@react-navigation/native";

export default function LatestChaptersHeader({
  onSearch,
}: {
  onSearch?: (text: string) => void;
}) {
  const theme = useTheme();
  return (
    <>
      <View style={[{ marginBottom: 20 }]}>
        <View style={[{ backgroundColor: theme.colors.background }]}>
          <LatestChaptersSearchBar
            onSearch={onSearch}
          ></LatestChaptersSearchBar>
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
