import { Linking, Text, View } from "react-native";
import Gradient, {
  GradientDirection,
} from "../../../common/components/image/Gradient";
import Title from "../../../common/components/text/Title";
import { useTheme } from "@react-navigation/native";
import { style } from "../../../common/utils/style-utils";
import LoadingText from "../../../common/components/text/LoadingText";
import { ParentlessStoredManga } from "../../../../../shared/src/types/Manga";
import IconedText from "../../../common/components/text/IconedText";
import RounedButton from "../../../common/components/buttons/RoundedButton";

export default function IntersiteMangaInfosPageHeader({
  loading,
  manga,
}: {
  loading: boolean;
  manga?: ParentlessStoredManga;
}) {
  const theme = useTheme();
  return (
    <>
      <Gradient
        width={"100%"}
        height={loading || (manga && manga.image) ? 250 : 70}
        direction={GradientDirection.BOTTOM_TO_TOP}
      ></Gradient>
      <View
        style={[
          {
            paddingHorizontal: 10,
            marginTop: -2,
            backgroundColor: theme.colors.background,
          },
        ]}
      >
        <Title
          styleProps={[
            style.text2Xl,
            style.textBold,
            { marginVertical: 0, paddingHorizontal: 0 },
          ]}
        >
          {manga ? (
            manga.title
          ) : (
            <LoadingText height={35} width={250}></LoadingText>
          )}
        </Title>
        <Text style={[{ color: theme.colors.text, opacity: 0.9 }]}>
          {manga ? manga.author : <LoadingText></LoadingText>}
        </Text>
        {manga ? (
          <IconedText
            iconName="source-branch"
            fontSize={14}
            style={[{ marginTop: 5, opacity: 0.7 }]}
          >
            {manga?.src}
          </IconedText>
        ) : (
          <LoadingText width={100} height={20}></LoadingText>
        )}
        <View
          style={[
            style.flexRow,
            style.itemsCenter,
            style.justifyBetween,
            { paddingTop: 15 },
          ]}
        >
          <View style={[style.flexRow, {}]}>
            <RounedButton
              appendIcon="earth"
              content="OPEN IN BROWSER"
              contentStyle={[{ fontWeight: "500" }]}
              styleProp={[
                {
                  backgroundColor: theme.colors.border,
                },
              ]}
              onPress={() => {
                manga && Linking.openURL(manga?.url);
              }}
            ></RounedButton>
            <View style={[{ width: 10 }]}></View>
            <RounedButton
              appendIcon="heart"
              content="LIKE"
              contentStyle={[{ fontWeight: "700" }]}
              styleProp={[
                {
                  backgroundColor: theme.colors.border,
                },
              ]}
              onPress={() => {
                manga && Linking.openURL(manga?.url);
              }}
            ></RounedButton>
          </View>
          <RounedButton
            appendIcon="dots-horizontal"
            styleProp={[
              {
                backgroundColor: theme.colors.border,
              },
            ]}
            onPress={() => {}}
          ></RounedButton>
        </View>
        <Title styleProps={[{ fontSize: 15, marginTop: 30 }]}>Chapters</Title>
      </View>
    </>
  );
}
