import React from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";

function AppButton({ text, onPress }) {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Text style={styles.button}>{text}</Text>
    </TouchableOpacity>
  );
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: "rgba(17, 222, 99, 0.77)",
    width: "100%",
    height: 50,
    borderRadius: 8,
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
  },
});
export default AppButton;
