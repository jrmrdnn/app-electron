import { useEffect, useState } from "react";

export default function useDarkMode() {
  const [enabledState, setEnabledState] = useState();
  const [darkMode, setDarkMode] = useState();

  useEffect(() => {
    setDarkMode(window.matchMedia("(prefers-color-scheme: dark)").matches);

    function handle(e) {
      setDarkMode(e.matches);
    }

    window
      .matchMedia("(prefers-color-scheme: dark)")
      .addEventListener("change", handle);

    return () =>
      window
        .matchMedia("(prefers-color-scheme: dark)")
        .removeEventListener("change", handle);
  }, []);

  const enabled = typeof enabledState !== "undefined" ? enabledState : darkMode;

  return [enabled, setEnabledState];
}
