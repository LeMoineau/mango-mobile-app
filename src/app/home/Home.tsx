import { View } from "react-native";
import WebView from "react-native-webview";

export default function Home() {
  return (
    <View style={[{ flex: 1, paddingHorizontal: 10 }]}>
      <WebView
        source={{ uri: "http://192.168.5.2:5173" }}
        style={[{ flex: 1, height: "100%", backgroundColor: "orange" }]}
      ></WebView>
    </View>
  );
}
