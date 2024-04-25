import { ActivityIndicator } from "react-native";

export default function StripePagesDisplayerFooter({
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
