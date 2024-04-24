import { View } from "react-native";
import { style } from "../../../common/utils/style-utils";
import RounedButton from "../../../common/components/buttons/RoundedButton";
import { useNavigation, useTheme } from "@react-navigation/native";
import { useNavigationType } from "../../../common/types/NavigationTypes";

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
          { paddingHorizontal: 10, paddingTop: 10 },
        ]}
      >
        <RounedButton
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
        ></RounedButton>
        <RounedButton
          prependIcon="dots-vertical"
          prependIconStyle={[{ fontSize: 23 }]}
          styleProp={[
            {
              backgroundColor: theme.colors.background,
            },
          ]}
          onPress={() => {}}
        ></RounedButton>
      </View>
    </>
  );
}
