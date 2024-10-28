import React from "react";
import { View, Text, StyleSheet } from "react-native";

import Card from "./Card";

const NumberContainer = (props) => {
  return (
    <View style={styles.numberContainer}>
      <Card>
        <Text style={styles.number}>{props.number}</Text>
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  numberContainer: {
    marginVertical: 50,
  },
  number: {
    textAlign: "center",
    fontSize: 48,
    fontFamily: "papyrus",
  },
});

export default NumberContainer;
