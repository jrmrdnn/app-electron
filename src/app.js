import React from "react";
import { Client as Styletron } from "styletron-engine-atomic";
import { Provider as StyletronProvider } from "styletron-react";
import { LightTheme, BaseProvider, DarkTheme } from "baseui";
import useDarkMode from "./useHooks/useDarkMode";

const engine = new Styletron();

export default function App() {
  // Mode dark
  const [darkMode] = useDarkMode();

  return (
    <StyletronProvider value={engine}>
      <BaseProvider theme={darkMode ? DarkTheme : LightTheme}>
        <h1>app-electron</h1>
      </BaseProvider>
    </StyletronProvider>
  );
}
