import { Text, View } from "react-native";
import Gradient, {
  GradientDirection,
} from "../../../common/components/image/Gradient";
import Title from "../../../common/components/text/Title";
import { useTheme } from "@react-navigation/native";
import { style } from "../../../common/utils/style-utils";
import LoadingText from "../../../common/components/text/LoadingText";
import { ParentlessStoredManga } from "../../../../../shared/src/types/Manga";

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
        {(loading || manga?.author) && (
          <Text style={[{ color: theme.colors.text }]}>
            {manga ? manga.author : <LoadingText></LoadingText>}
          </Text>
        )}
        <Title styleProps={[{ fontSize: 15, marginTop: 30 }]}>Chapters</Title>
      </View>
    </>
  );
}
