import React, { useState, useEffect, useCallback } from "react";
import { StyleSheet, Text, View } from "react-native";
import * as Font from "expo-font"
import * as SplashScreen from "expo-splash-screen";

import Header from "./components/Header";
import StartGameScreen from "./screens/StartGameScreen";
import GameScreen from "./screens/GameScreen";
import GameOverScreen from "./screens/GameOverScreen";

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [selectedNumber, setSelectedNumber] = useState();
  const [guessRound, setGuessRound] = useState(0);
  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        // Pre-load fonts, make any API calls you need to do here
        await Font.loadAsync({
          "papyrus": require("./assets/fonts/papyrus.ttf")
        });
        // Artificially delay for two seconds to simulate a slow loading
        // experience. Please remove this if you copy and paste the code!
        await new Promise(resolve => setTimeout(resolve, 500));
      } catch (e) {
        console.warn(e);
      } finally {
        // Tell the application to render
        setAppIsReady(true);
      }
    }

    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      // This tells the splash screen to hide immediately! If we call this after
      // `setAppIsReady`, then we may see a blank screen while the app is
      // loading its initial state and rendering its first pixels. So instead,
      // we hide the splash screen once we know the root view has already
      // performed layout.
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }

  const restartGameHandler = () => {
    setSelectedNumber(null);
    setGuessRound(0);
  };

  const startGameHandler = (num) => {
    setSelectedNumber(num);
    setGuessRound(0);
  };

  const gameOverHandler = (rounds) => {
    setGuessRound(rounds);
  };

  return (
    <View style={styles.screen} onLayout={onLayoutRootView}>
      <Header title="Guess a Number"></Header>
      {!selectedNumber && <StartGameScreen onStartGame={startGameHandler} />}
      {selectedNumber && guessRound <= 0 && (
        <GameScreen userChoice={selectedNumber} onGameOver={gameOverHandler} />
      )}
      {selectedNumber && guessRound > 0 && (
        <GameOverScreen
          userNumber={selectedNumber}
          gameRound={guessRound}
          onRestart={restartGameHandler}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "white",
  },
});
