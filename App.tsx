import React from "react";
import { HomeScreen } from "./src/screens/HomeScreen";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Provider as PaperProvider } from "react-native-paper";

export default function App() {
  return (
    <SafeAreaProvider>
      <PaperProvider>
        <HomeScreen />
      </PaperProvider>
    </SafeAreaProvider>
  );
}
