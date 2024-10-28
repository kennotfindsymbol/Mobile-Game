import React from "react";
import {
  Text,
  View,
  StyleSheet,
  Button,
  Image,
  Dimensions,
} from "react-native";

import MainButton from "../components/MainButton";

const GameOverScreen = (props) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>GAME OVER! Took {props.gameRound} round</Text>
      <Text style={styles.text}>The number was {props.userNumber}</Text>
      <MainButton onPress={props.onRestart}>Again</MainButton>
      <Image style={styles.gif} source={require("../assets/goofydance.gif")} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    alignItems: "center",
  },
  text: {
    fontFamily: "papyrus",
    fontSize: Dimensions.get("window").width > 400 ? 28 : 24,
    textAlign: "center,",
  },
  gif: {
    marginTop: 10,
    maxHeight: Dimensions.get("window").height * 0.5,
    height: 500,
    aspectRatio: 9 / 16,
  }
});

export default GameOverScreen;
