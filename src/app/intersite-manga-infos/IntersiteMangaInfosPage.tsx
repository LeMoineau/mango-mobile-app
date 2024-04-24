import {
  ActivityIndicator,
  FlatList,
  Image,
  Text,
  View,
  useWindowDimensions,
} from "react-native";
import { style } from "../../common/utils/style-utils";
import { useNavigation, useRoute, useTheme } from "@react-navigation/native";
import Title from "../../common/components/text/Title";
import MangaChapterItem from "./elements/IntersiteChapterItem";
import { useEffect } from "react";
import {
  useNavigationType,
  useRouteType,
} from "@/common/types/NavigationTypes";
import LoadingText from "@/common/components/text/LoadingText";
import Gradient, {
  GradientDirection,
} from "@/common/components/image/Gradient";
import RounedButton from "@/common/components/buttons/RoundedButton";
import useIntersiteMangaInfos from "./hooks/useIntersiteMangaInfos";
import { isParentlessIntersiteChapter } from "../../../../shared/src/types/IntersiteChapter";
import ThemedText from "../../common/components/text/ThemedText";

export default function IntersiteMangaInfosPage() {
  const route: useRouteType<"IntersiteMangaInfo"> = useRoute();
  const theme = useTheme();
  const { width, height } = useWindowDimensions();
  const navigation: useNavigationType = useNavigation();

  const {
    loading,
    manga,
    chapters,
    chaptersFullyLoaded,
    fetch,
    fetchIntersiteChapters,
  } = useIntersiteMangaInfos();

  useEffect(() => {
    fetch(route.params.intersiteMangaFormattedName);
  }, []);

  return (
    <>
      <View
        style={[
          {
            position: "absolute",
            top: 0,
            left: 0,
            flex: 1,
            width: width,
            minHeight: height,
            backgroundColor: theme.colors.background,
          },
        ]}
      >
        {!loading && manga ? (
          <Image
            source={{
              uri: manga.image,
            }}
            style={[
              {
                width: "100%",
                height: 300,
              },
            ]}
          ></Image>
        ) : (
          <LoadingText width={"100%"} height={300}></LoadingText>
        )}
      </View>
      <FlatList
        stickyHeaderIndices={[0]}
        ListHeaderComponent={
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
        }
        data={["header", ...chapters]}
        keyExtractor={(_, index) => `manga-chapter-item-${index}`}
        renderItem={({ item, index }) => {
          if (isParentlessIntersiteChapter(item)) {
            return (
              <View style={[{ backgroundColor: theme.colors.background }]}>
                <MangaChapterItem
                  key={index}
                  intersiteChapter={item}
                  pressReadBtn={(chapter) => {
                    if (!manga) return;
                    navigation.navigate("ChapterReader", {
                      src: manga.src,
                      endpoint: chapter.endpoint,
                      storedMangaId: manga.id,
                    });
                  }}
                ></MangaChapterItem>
              </View>
            );
          } else {
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
                  <Title styleProps={[{ fontSize: 15, marginTop: 30 }]}>
                    Chapters
                  </Title>
                </View>
              </>
            );
          }
        }}
        ListFooterComponent={
          <>
            {loading || !chaptersFullyLoaded ? (
              <ActivityIndicator size={"large"}></ActivityIndicator>
            ) : (
              <ThemedText>No more chapters to load</ThemedText>
            )}
            <View style={[{ height: 50 }]}></View>
          </>
        }
        onEndReached={() => {
          fetchIntersiteChapters();
        }}
      ></FlatList>
    </>
  );
}
