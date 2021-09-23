import React from "react";
import { View, StyleSheet, TextInput } from "react-native";

function AppTextInput({ height = 30, otherStyles, ...otherProps }) {
  return (
    <View style={styles.container}>
      <TextInput
        style={{ height, marginLeft: 10, color: "grey", ...otherStyles }}
        autoCorrect={false}
        {...otherProps}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    borderColor: "grey",
    borderRadius: 8,
    backgroundColor: "#fff",
    marginBottom: 10,
  },
});
export default AppTextInput;
