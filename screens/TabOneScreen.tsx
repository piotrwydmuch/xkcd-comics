import React, { useState, useEffect } from "react";
import { StyleSheet, Image } from "react-native";

//import EditScreenInfo from "../components/EditScreenInfo";
import { Text, View } from "../components/Themed";

export default function TabOneScreen() {
  const [comics, setComics] = useState([{}]);

  useEffect(() => {
    getLastComics();
  }, [setComics]);

  const getLastComics = async () => {
    //First we need to know, what is the last comic ID
    const response = await fetch(`https://xkcd.com/info.0.json`);
    const data = await response.json();
    const lastComics = data.num;
    const howManyComics = 8; //You can choose number of comics
    const comicsNumber = lastComics - howManyComics;

    //Now we are getting last x comics
    let latestComics: any = [];
    let i: number = 0;
    for (i = lastComics; i > comicsNumber; i--) {
      const response = await fetch(`https://xkcd.com/${i}/info.0.json`);
      const data = await response.json();
      console.log(data);
      latestComics.push(data);
    }
    setComics(latestComics);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Last Comics</Text>
      <View
        style={styles.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />
      {comics.map((comic) => (
        <View key={comic.num} style={styles.comicContainer}>
          <Text>{comic.num}</Text>
          <Image
            style={styles.comicImage}
            source={{
              uri: comic.img,
            }}
          />
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
  comicImage: {
    height: 300,
    width: "100%",
  },
  comicContainer: {
    width: "100%",
  },
});
