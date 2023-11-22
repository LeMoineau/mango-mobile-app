import { Text, View } from "react-native";
import { useMangoScraperApiStore } from "../common/store/mango-scraper-api.store";

export default function LatestChaptersPage() {
  const state = useMangoScraperApiStore();
  return (
    <View>
      <Text>coucou les amis</Text>
      {state.latestChapters.map((c, i) => {
        return <Text key={i}>{c.title["mangaplus"]}</Text>;
      })}
    </View>
  );
}
