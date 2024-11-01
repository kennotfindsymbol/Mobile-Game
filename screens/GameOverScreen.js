import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  Button,
  Image,
  Dimensions,
  useWindowDimensions,
  ScrollView,
} from "react-native";

import MainButton from "../components/MainButton";

const GameOverScreen = (props) => {
  const { height, width } = useWindowDimensions();

  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.text}>GAME OVER! Took {props.gameRound} round</Text>
        <Text style={styles.text}>The number was {props.userNumber}</Text>
        <MainButton onPress={props.onRestart}>Again</MainButton>
        <Image
          style={{
            ...styles.gif,
            maxHeight: height > 500 ? height * 0.6 : height * 0.3,
          }}
          source={require("../assets/goofydance.gif")}
        />
      </View>
    </ScrollView>
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
    height: 500,
    aspectRatio: 9 / 16,
  },
});

export default GameOverScreen;
