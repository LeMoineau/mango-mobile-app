import { useTheme } from "@react-navigation/native";
import { colors } from "../../../../../../shared/src/config/enums/Colors";
import RoundedButton from "../../../../common/components/buttons/RoundedButton";
import { style } from "../../../../common/utils/style-utils";
import useChapterDownloader from "../../../../common/hooks/use-chapter-downloader";
import { useEffect } from "react";
import { IdentifiedChapter } from "../../../../../../shared/src/types/Chapter";
import { isStoredDownloadedChapter } from "../../../../common/types/downloader/DownloadedChapter";

export default function IntersiteChapterDownloadButton({
  chapter,
  onProgress,
}: {
  chapter: IdentifiedChapter;
  onProgress?: (progress: number) => void;
}) {
  const theme = useTheme();
  const { downloadingChapter, download } = useChapterDownloader(chapter.id);

  useEffect(() => {
    if (onProgress && downloadingChapter?.progress) {
      onProgress(downloadingChapter.progress);
    }
  }, [downloadingChapter?.progress]);

  return (
    <>
      {downloadingChapter ? (
        isStoredDownloadedChapter(downloadingChapter) ? (
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
            content="DOWNLOADING"
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
            download(chapter);
          }}
        ></RoundedButton>
      )}
    </>
  );
}
