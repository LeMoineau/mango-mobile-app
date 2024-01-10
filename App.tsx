import { SafeAreaProvider } from "react-native-safe-area-context";
import Index from "./src/app/Index";

export default function App() {
  return (
    <SafeAreaProvider>
      <Index></Index>
    </SafeAreaProvider>
  );
}
