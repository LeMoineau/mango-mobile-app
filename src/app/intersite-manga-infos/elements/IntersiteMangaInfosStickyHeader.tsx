import { View } from "react-native";
import { style } from "../../../common/utils/style-utils";
import RoundedButton from "../../../common/components/buttons/RoundedButton";
import { useNavigation, useTheme } from "@react-navigation/native";
import { useNavigationType } from "../../../common/types/navigation/NavigationTypes";

export default function IntersiteMangaInfosStickyHeader() {
  const theme = useTheme();
  const navigation: useNavigationType = useNavigation();

  return (
    <>
      <View
        style={[
          style.flexRow,
          style.justifyBetween,
          style.itemsCenter,
          {
            position: "absolute",
            zIndex: 15,
            top: 0,
            left: 0,
            width: "100%",
            paddingHorizontal: 10,
            paddingTop: 10,
          },
        ]}
      >
        <RoundedButton
          prependIcon="arrow-back"
          prependIconStyle={[{ fontSize: 23 }]}
          styleProp={[
            {
              backgroundColor: theme.colors.background,
            },
          ]}
          onPress={() => {
            navigation.goBack();
          }}
        ></RoundedButton>
        {/* <RoundedButton
          prependIcon="dots-vertical"
          prependIconStyle={[{ fontSize: 23 }]}
          styleProp={[
            {
              backgroundColor: theme.colors.background,
            },
          ]}
          onPress={() => {}}
        ></RoundedButton> */}
      </View>
    </>
  );
}
