import { useTheme } from "@react-navigation/native";
import { colors } from "../../../shared/src/config/enums/Colors";
import RoundedButton from "./RoundedButton";
import { style } from "../../utils/style-utils";
import useChapterDownloader from "../../hooks/use-chapter-downloader";
import { useEffect } from "react";
import { IdentifiedChapter } from "../../../shared/src/types/basics/Chapter";
import { useDownloaderStore } from "../../store/downloader.store";

export default function ChapterDownloadButton({
  chapter,
  onProgress,
}: {
  chapter: IdentifiedChapter;
  onProgress?: (progress: number) => void;
}) {
  const theme = useTheme();
  const { downloadingChapter, download } = useChapterDownloader(chapter.id);
  const { isDownloaded } = useDownloaderStore();

  useEffect(() => {
    if (onProgress && downloadingChapter?.progress) {
      onProgress(downloadingChapter.progress);
    }
  }, [downloadingChapter?.progress]);

  return (
    <>
      {downloadingChapter ? (
        isDownloaded(chapter.id) ? (
          <RoundedButton
            content="DOWNLOADED"
            contentStyle={[style.textBold, { fontSize: 12 }]}
            appendIcon="check-circle"
            styleProp={[
              {
                marginRight: 10,
                backgroundColor: colors.green[600],
              },
            ]}
          ></RoundedButton>
        ) : !downloadingChapter.downloadState ? (
          <RoundedButton
            content="LOADING"
            contentStyle={[style.textBold, { fontSize: 12 }]}
            styleProp={[
              {
                marginRight: 10,
                backgroundColor: theme.colors.border,
                opacity: 0.5,
              },
            ]}
          ></RoundedButton>
        ) : downloadingChapter.downloadState === "pause" ? (
          <RoundedButton
            prependIcon="pause"
            content="PAUSED"
            contentStyle={[style.textBold, { fontSize: 12 }]}
            styleProp={[
              {
                marginRight: 10,
                backgroundColor: theme.colors.border,
              },
            ]}
          ></RoundedButton>
        ) : downloadingChapter.downloadState === "error" ? (
          <RoundedButton
            content="ERROR"
            contentStyle={[style.textBold, { fontSize: 12 }]}
            appendIcon="clear"
            color={colors.white}
            styleProp={[
              {
                marginRight: 10,
                backgroundColor: colors.red[400],
              },
            ]}
          ></RoundedButton>
        ) : (
          <RoundedButton
            content={`DOWNLOADING (${
              downloadingChapter.progress
                ? Math.floor(downloadingChapter.progress * 100)
                : 0
            }%)`}
            contentStyle={[style.textBold, { fontSize: 12 }]}
            styleProp={[
              {
                marginRight: 10,
                backgroundColor: theme.colors.border,
              },
            ]}
          ></RoundedButton>
        )
      ) : (
        <RoundedButton
          content="DOWNLOAD"
          contentStyle={[{ fontSize: 12 }]}
          appendIcon="file-download"
          styleProp={[
            {
              backgroundColor: theme.colors.border,
            },
          ]}
          onPress={() => {
            download(chapter.src, chapter.endpoint);
          }}
        ></RoundedButton>
      )}
    </>
  );
}
