import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";

import useCachedResources from "./hooks/useCachedResources";
import useColorScheme from "./hooks/useColorScheme";
import Navigation from "./navigation";

export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  const [query, setQuery] = useState("");

  useEffect(() => {
    getLastComics();
  }, [query]);

  const getLastComics = async () => {
    //First we need to know, what is the last comic ID
    const response = await fetch(`https://xkcd.com/info.0.json`);
    const data = await response.json();
    const lastComics = data.num;
    const getLastEight = lastComics - 8;

    //Now we are getting last 8 comics
    let i: number = 0;
    for (i = lastComics; i > getLastEight; i--) {
      const response = await fetch(`https://xkcd.com/${i}/info.0.json`);
      const data = await response.json();
      console.log(data);
    }
  };

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <SafeAreaProvider>
        <Navigation colorScheme={colorScheme} />
        <StatusBar />
      </SafeAreaProvider>
    );
  }
}
