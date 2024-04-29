import { View } from "react-native";
import { style } from "../../utils/style-utils";
import ThemedText from "../text/ThemedText";
import RounedButton from "../buttons/RoundedButton";
import { useNavigation } from "@react-navigation/native";
import { useNavigationType } from "../../types/navigation/NavigationTypes";

export default function CustomPageHeader({
  title,
  goBackBtnHide,
}: {
  title: string;
  goBackBtnHide?: boolean;
}) {
  const navigator: useNavigationType = useNavigation();

  return (
    <>
      <View
        style={[
          style.flexRow,
          style.justifyCenter,
          style.itemsCenter,
          { padding: 10, width: "100%" },
        ]}
      >
        <ThemedText style={[{ fontWeight: "500", fontSize: 17 }]}>
          {title}
        </ThemedText>
        {!goBackBtnHide && (
          <RounedButton
            styleProp={[{ position: "absolute", left: 10, top: 0 }]}
            prependIcon="arrow-back"
            prependIconStyle={[{ fontSize: 25 }]}
            onPress={() => {
              navigator.goBack();
            }}
          ></RounedButton>
        )}
      </View>
    </>
  );
}
