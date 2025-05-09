import { View } from "react-native";
import Gradient, {
  GradientDirection,
} from "../../../common/components/image/Gradient";
import { useTheme } from "@react-navigation/native";
import SearchBar from "../../../common/components/form/SearchBar";
import { style } from "../../../common/utils/style-utils";
import LatestChaptersFilterModal from "./LatestChaptersFilterModal";
import useModals from "../../../shared/src/hooks/use-modals";
import LatestChapterFilter from "../../../common/types/filter/LatestChapterFilter";
import RoundedButton from "../../../common/components/buttons/RoundedButton";

export default function LatestChaptersHeader({
  onSearch,
  onFilter,
}: {
  onSearch?: (text: string) => void;
  onFilter?: (filter: LatestChapterFilter) => void;
}) {
  const theme = useTheme();
  const { isVisible, show, hide } = useModals<"filter">();

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
        <View
          style={[
            {
              flex: 1,
              backgroundColor: theme.colors.background,
              paddingVertical: 10,
            },
          ]}
        >
          <SearchBar
            placeholder="Search Manga"
            onSubmit={(text) => {
              onSearch && onSearch(text);
            }}
            actionsBtn={
              <RoundedButton
                themed
                appendIcon="options"
                styleProp={[
                  style.rounded,
                  {
                    width: 50,
                    height: 50,
                  },
                ]}
                onPress={() => show("filter")}
              ></RoundedButton>
            }
          ></SearchBar>
        </View>
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
      <LatestChaptersFilterModal
        visible={isVisible("filter")}
        onRequestClose={() => hide("filter")}
        onFilter={(filter) => {
          onFilter && onFilter(filter);
        }}
      ></LatestChaptersFilterModal>
    </>
  );
}
