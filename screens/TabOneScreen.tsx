import React, { useState, useEffect } from "react";
import { StyleSheet, Image } from "react-native";
import Lightbox from "react-native-lightbox";

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

    //Now we are getting last x comics (x is equal value you picked above)
    let latestComics: any = [];
    let i: number = 0;
    for (i = lastComics; i > comicsNumber; i--) {
      const response = await fetch(`https://xkcd.com/${i}/info.0.json`);
      const data = await response.json();
      latestComics.push(data);
    }
    setComics(latestComics);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Last Comics</Text>
      <View style={styles.content}>
        {comics.map((comic) => (
          <View 
          key={comic.num +Math.random} 
          style={styles.comicContainer}>
            <View style={styles.comicInfo}>
              <Text style={styles.comicTitle}>{comic.title}</Text>
              <Text style={styles.comicDesc}>{comic.alt}</Text>
            </View>
            <Image
              style={styles.comicImage}
              source={{
                uri: comic.img,
              }}
            />
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  content: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    width: "100%",
    overflow: "auto",
    backgroundColor: "#ffffff"
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    display: "flex",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
  comicContainer: {
    width: "85%",
    display: "flex",
    margin: "10px",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "5px",
    boxShadow: "2px 2px 5px #dedede"
  },
  comicImage: {
    height: 150,
    width: "50%",
  },
  comicInfo: {
    width: "50%",
    padding: "20px"
  },
  comicTitle: {
    fontWeight: "bold",
    fontSize: "18px"
  },
  comicDesc: {
    
  },
});
