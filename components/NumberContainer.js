import React from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";

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
    marginVertical: Dimensions.get("window").height > 670 ? 30 : 5,
  },
  number: {
    textAlign: "center",
    fontSize: 48,
    fontFamily: "papyrus",
  },
});

export default NumberContainer;
