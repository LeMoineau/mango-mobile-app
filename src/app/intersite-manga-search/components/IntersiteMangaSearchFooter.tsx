import { ActivityIndicator, View } from "react-native";

export default function IntersiteMangaSearchFooter({
  fullyLoaded,
  loading,
}: {
  fullyLoaded: boolean;
  loading: boolean;
}) {
  return (
    <>
      {!fullyLoaded && loading && <ActivityIndicator></ActivityIndicator>}
      <View style={{ height: 50 }}></View>
    </>
  );
}
