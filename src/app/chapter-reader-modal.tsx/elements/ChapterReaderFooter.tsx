import { ActivityIndicator } from "react-native";

export default function ChapterReaderFooter({
  chapterFullyLoaded,
}: {
  chapterFullyLoaded?: boolean;
}) {
  return (
    <>
      {!chapterFullyLoaded && (
        <ActivityIndicator size={"large"}></ActivityIndicator>
      )}
    </>
  );
}
