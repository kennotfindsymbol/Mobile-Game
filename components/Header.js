import React from "react";
import { View, Text, StyleSheet } from "react-native";

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
    backgroundColor: Colors.primary,
  },
  headerText: {
    fontSize: 24,
  },
});

export default Header;
