import React from "react";
import { View, Text, StyleSheet, Platform } from "react-native";

import Colors from "../constants/colors";

const Header = (props) => {
  return (
    <View style={styles.header}>
      <Text style={styles.headerText}>{props.title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    width: "100%",
    height: 90,
    paddingTop: 48,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Platform.OS === "ios" ? "white" : Colors.primary,
    borderBottomWidth: Platform.OS === "ios" ? 1 : 0,
    borderBottomColor: Platform.OS === "ios" ? "#ccc" : "transparent",
  },
  headerText: {
    fontSize: 24,
    color: Platform.OS === "ios" ? Colors.primary : "white",
  },
});

export default Header;
