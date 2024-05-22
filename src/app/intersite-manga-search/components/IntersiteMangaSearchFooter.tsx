import { ActivityIndicator } from "react-native";

export default function IntersiteMangaSearchFooter({
  fullyLoaded,
  loading,
}: {
  fullyLoaded: boolean;
  loading: boolean;
}) {
  return (
    <>{!fullyLoaded && loading && <ActivityIndicator></ActivityIndicator>}</>
  );
}
