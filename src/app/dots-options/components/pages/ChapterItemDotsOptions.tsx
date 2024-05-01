import { Linking } from "react-native";
import DotsOptionsItem from "../DotsOptionsItem";
import { ChapterItemDotsParams } from "../../../../common/types/navigation/NavigationDotsParams";
import { useDownloaderStore } from "../../../../common/store/downloader.store";
import useChapterDownloader from "../../../../common/hooks/use-chapter-downloader";
import { useNavigationType } from "../../../../common/types/navigation/NavigationTypes";
import { useNavigation } from "@react-navigation/native";

export default function ChapterItemDotsOptions(params: ChapterItemDotsParams) {
  const navigator: useNavigationType = useNavigation();
  const { isDownloaded } = useDownloaderStore();
  const { download, eraseDownload } = useChapterDownloader(params.chapterId);

  return (
    <>
      <DotsOptionsItem iconName="book" label="READ"></DotsOptionsItem>
      <DotsOptionsItem
        iconName="earth"
        label="OPEN IN BROWSER"
        onPress={() => {
          Linking.openURL(params.url);
        }}
      ></DotsOptionsItem>
      {isDownloaded(params.chapterId) ? (
        <DotsOptionsItem
          iconName="trash"
          label="DELETE"
          onPress={() => {
            eraseDownload();
            navigator.goBack();
          }}
        ></DotsOptionsItem>
      ) : (
        <DotsOptionsItem
          iconName="file-download"
          label="DOWNLOAD"
          onPress={async () => {
            download(params.chapterSrc, params.chapterEndpoint);
            navigator.goBack();
          }}
        ></DotsOptionsItem>
      )}
    </>
  );
}
