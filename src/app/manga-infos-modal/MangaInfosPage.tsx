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
import { useSettingsStore } from "../../common/store/settings.store";
import Title from "../../common/components/text/Title";
import MangaChapterItem from "./elements/MangaChapterItem";
import { MangaId } from "@shared/types/primitives/id";
import { useEffect } from "react";
import useApi from "@shared/hooks/use-api";
import { IntersiteManga } from "@shared/types/intersite/IntersiteManga";
import Config from "@/common/config/Config";
import {
  useNavigationType,
  useRouteType,
} from "@/common/types/NavigationTypes";
import LoadingText from "@/common/components/text/LoadingText";
import Gradient, {
  GradientDirection,
} from "@/common/components/image/Gradient";

export default function MangaInfosPage() {
  const theme = useTheme();
  const { width, height } = useWindowDimensions();
  const navigation: useNavigationType = useNavigation();
  const route: useRouteType<"MangaInfo"> = useRoute();

  const { getMoreTrustedIn } = useSettingsStore();
  const { data: manga, fetch } = useApi<IntersiteManga>(
    Config.getEnv().MANGO_SCRAPER_API_ENDPOINT
  );

  useEffect(() => {
    const { formattedName } = route.params;
    if (formattedName) {
      fetch(`/mangas/${formattedName}`);
      return;
    }
    // if (src && mangaId) {
    //   fetch(`/srcs/${src}/mangas/${mangaId}`);
    //   return;
    // }
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
        {manga ? (
          <Image
            source={{
              uri: getMoreTrustedIn<string>(manga.image)[1],
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
        ListHeaderComponent={
          <>
            <Gradient
              width={"100%"}
              height={300}
              direction={GradientDirection.BOTTOM_TO_TOP}
            ></Gradient>
            <View
              style={[
                {
                  paddingHorizontal: 10,
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
                  getMoreTrustedIn<string>(manga.name)[1]
                ) : (
                  <LoadingText height={35} width={250}></LoadingText>
                )}
              </Title>
              <Text style={[{ color: theme.colors.text }]}>
                {manga ? (
                  getMoreTrustedIn<string>(manga.author)[1]
                ) : (
                  <LoadingText></LoadingText>
                )}
              </Text>
              <Title styleProps={[{ fontSize: 15, marginTop: 30 }]}>
                Chapters
              </Title>
            </View>
          </>
        }
        data={
          manga
            ? manga.chapters.sort(
                (a, b) => -Number(a.formattedNumber) + Number(b.formattedNumber)
              )
            : []
        }
        keyExtractor={(_, index) => `manga-chapter-item-${index}`}
        renderItem={({ item, index }) => (
          <View style={[{ backgroundColor: theme.colors.background }]}>
            <MangaChapterItem
              key={index}
              chapter={item}
              pressReadBtn={() => {
                const [src, id] = getMoreTrustedIn<MangaId>(item.id);
                if (!src || !id || !manga) return;
                navigation.navigate("ChapterReader", {
                  src,
                  mangaId: manga.id[src],
                  chapterId: id,
                });
              }}
            ></MangaChapterItem>
          </View>
        )}
        ListEmptyComponent={
          <>
            {/* <View style={[{ flex: 1, padding: 10, paddingTop: 0 }]}>
              <LoadingText width={"100%"} height={70}></LoadingText>
              <LoadingText
                width={"100%"}
                height={70}
                viewContainerStyle={[{ paddingTop: 10 }]}
              ></LoadingText>
            </View> */}
            <ActivityIndicator size={"large"}></ActivityIndicator>
          </>
        }
      ></FlatList>
    </>
  );
}
