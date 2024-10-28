import React, { useState, useRef, useEffect } from "react";
import {
  Button,
  View,
  Text,
  StyleSheet,
  Alert,
  ScrollView,
  FlatList,
  useWindowDimensions,
} from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";

import Card from "../components/Card";
import MainButton from "../components/MainButton";

const generateRandomBetween = (min, max, exclude) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  const ret = Math.floor(Math.random() * (max - min) + min);
  if (ret === exclude) {
    return generateRandomBetween(min, max, exclude);
  }
  return ret;
};

const renderListItem = (length, itemData) => (
  <View style={styles.listItem}>
    <Text style={styles.listItemText}>#{length - itemData.index}</Text>
    <Text style={styles.listItemText}>{itemData.item}</Text>
  </View>
);

const GameScreen = (props) => {
  const [currentGuess, setCurrentGuess] = useState(
    generateRandomBetween(1, 100, props.userChoice)
  );

  const [gameRound, setGameRound] = useState(0);
  const [prevGuesses, setPrevGuesses] = useState([]);
  const {height, width} = useWindowDimensions();

  const currentLow = useRef(1);
  const currentHigh = useRef(100);

  const { userChoice, onGameOver } = props;

  useEffect(() => {
    if (currentGuess === props.userChoice) {
      props.onGameOver(gameRound);
      setGameRound(0);
    }
  }, [currentGuess, userChoice, onGameOver]);

  const nextGuessHandler = (direction) => {
    // console.log(direction, currentGuess, props.userChoice)

    if (
      (direction === "lower" && currentGuess < props.userChoice) ||
      (direction === "higher" && currentGuess > props.userChoice)
    ) {
      Alert.alert("Don't cheat!", "I'm watching...", [
        { text: "My bad", style: "destructive" },
      ]);
      return;
    }
    if (direction === "lower") {
      currentHigh.current = currentGuess;
    } else if (direction == "higher") {
      currentLow.current = currentGuess;
    }
    const nextNumber = generateRandomBetween(
      currentLow.current,
      currentHigh.current,
      currentGuess
    );

    setCurrentGuess(nextNumber);
    setGameRound(gameRound + 1);
    setPrevGuesses((prevGuesses) => [nextNumber.toString(), ...prevGuesses]);
    console.log(prevGuesses);
  };

  if (height < 500) {
    return (
      <View style={styles.screen}>
        <Text style={styles.title}>Opponent's Guess</Text>
        <Card style={styles.buttonContainer}>
          <MainButton onPress={nextGuessHandler.bind(this, "lower")}>
            <AntDesign name="downcircleo" size={36} color="black" />
          </MainButton>
          <Text style={styles.number}>{currentGuess}</Text>
          <MainButton onPress={nextGuessHandler.bind(this, "higher")}>
            <AntDesign name="upcircleo" size={36} color="black" />
          </MainButton>
        </Card>
        <View style={styles.listContainer}>
          {/* <ScrollView contentContainerStyle={styles.list}>
            {prevGuesses.map((guess, index) =>
              renderListItem(guess, prevGuesses.length - index)
            )}
          </ScrollView> */}
          <FlatList
            keyExtractor={(item) => item}
            data={prevGuesses}
            renderItem={renderListItem.bind(this, prevGuesses.length)}
            contentContainerStyle={styles.list}
          />
        </View>
      </View>
    );
  }

  return (
    <View style={styles.screen}>
      <Text style={styles.title}>Opponent's Guess</Text>
      <Text style={styles.number}>{currentGuess}</Text>
      <Card style={styles.buttonContainer}>
        <MainButton onPress={nextGuessHandler.bind(this, "lower")}>
          <AntDesign name="downcircleo" size={36} color="black" />
        </MainButton>
        <MainButton onPress={nextGuessHandler.bind(this, "higher")}>
          <AntDesign name="upcircleo" size={36} color="black" />
        </MainButton>
      </Card>
      <View style={styles.listContainer}>
        {/* <ScrollView contentContainerStyle={styles.list}>
          {prevGuesses.map((guess, index) =>
            renderListItem(guess, prevGuesses.length - index)
          )}
        </ScrollView> */}
        <FlatList
          keyExtractor={(item) => item}
          data={prevGuesses}
          renderItem={renderListItem.bind(this, prevGuesses.length)}
          contentContainerStyle={styles.list}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 10,
    alignItems: "center",
    width: "100%",
  },
  title: {
    textAlign: "center",
    fontSize: 24,
  },
  number: {
    fontFamily: "papyrus",
    textAlign: "center",
    fontSize: "64",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 20,
  },
  listContainer: {
    flex: 1,
    // width: "100%",
    alignItems: "center",
    // backgroundColor: "red",
  },
  list: {
    flexGrow: 1,
    justifyContent: "center",
    marginTop: 20,
    alignItems: "center",
    gap: 40,
    // backgroundColor: "yellow",
  },
  listItem: {
    borderColor: "blue",
    borderWidth: 1,
    // width: "100%",
    // alignItems: "center",
  },
  listItemText: {
    textAlign: "center",
    fontSize: 36,
    fontFamily: "papyrus",
    width: 300,
  },
});

export default GameScreen;
