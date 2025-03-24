import { Linking, Pressable, Text, View } from "react-native";
import Gradient, {
  GradientDirection,
} from "../../../common/components/image/Gradient";
import Title from "../../../common/components/text/Title";
import { useTheme } from "@react-navigation/native";
import { style } from "../../../common/utils/style-utils";
import LoadingText from "../../../common/components/text/LoadingText";
import { ParentlessStoredManga } from "../../../shared/src/types/basics/Manga";
import IconedText from "../../../common/components/text/IconedText";
import RoundedButton from "../../../common/components/buttons/RoundedButton";
import LikeButton from "./LikeButton";
import {
  SourceName,
  UUID,
} from "../../../shared/src/types/primitives/Identifiers";
import SelectSourceModal from "../../../common/components/modals/intersite-manga/SelectSourceModal";
import useModals from "../../../shared/src/hooks/use-modals";
import ThemedText from "../../../common/components/text/ThemedText";
import { LanguagesUtils } from "../../../common/utils/languages-utils";

export default function IntersiteMangaInfosHeader({
  manga,
  loading,
  intersiteMangaId,
  availablesSources,
  onDotsButtonPress,
  onChangeSource,
}: {
  manga?: ParentlessStoredManga;
  loading: boolean;
  intersiteMangaId?: UUID;
  availablesSources?: SourceName[];
  onDotsButtonPress?: () => void;
  onChangeSource?: (src: SourceName) => void;
}) {
  const theme = useTheme();
  const { isVisible, show, hide } = useModals<"change-src">();

  return (
    <>
      <Gradient
        width={"100%"}
        height={loading || (manga && manga.image) ? 300 : 70}
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
        {manga ? (
          <View
            style={[
              style.flexRow,
              style.flexWrap,
              {
                marginTop: 5,
                alignItems: "center",
                columnGap: 10,
                rowGap: 7,
                opacity: 0.8,
              },
            ]}
          >
            {manga.author && (
              <IconedText iconName="people-alt" fontSize={14}>
                {manga.author}
              </IconedText>
            )}
            <Pressable
              onPress={() => {
                show("change-src");
              }}
            >
              <IconedText iconName="source-branch" fontSize={14}>
                {manga.src}
              </IconedText>
            </Pressable>
            <IconedText iconName="language">
              {`${
                LanguagesUtils.getFlagAndNameForLang(manga.lang) ?? "Unknown"
              }`}
            </IconedText>
            <ThemedText style={{ fontSize: 15 }}>{}</ThemedText>
          </View>
        ) : (
          <LoadingText width={100} height={20}></LoadingText>
        )}
        <View
          style={[
            style.flexRow,
            style.itemsCenter,
            style.justifyBetween,
            { paddingTop: 25 },
          ]}
        >
          <View style={[style.flexRow, {}]}>
            <RoundedButton
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
            ></RoundedButton>
            <View style={[{ width: 10 }]}></View>
            <LikeButton intersiteMangaId={intersiteMangaId}></LikeButton>
          </View>
          <RoundedButton
            appendIcon="dots-horizontal"
            styleProp={[
              {
                backgroundColor: theme.colors.border,
              },
            ]}
            onPress={onDotsButtonPress}
          ></RoundedButton>
        </View>
        <Title styleProps={[{ fontSize: 15, marginTop: 30 }]}>Chapters</Title>
      </View>
      {manga && availablesSources && (
        <SelectSourceModal
          availablesSources={availablesSources}
          currentSource={manga.src}
          visible={isVisible("change-src")}
          onRequestClose={() => hide("change-src")}
          onSelect={(src) => onChangeSource && onChangeSource(src)}
        ></SelectSourceModal>
      )}
    </>
  );
}
