import React, { useEffect, useLayoutEffect } from "react";
import { View, StyleSheet, Text, FlatList } from "react-native";
import useFetchedGoals from "../Hooks/useFetchedGoals";

function Done({ navigation }) {
  const { goalsDone, getGoalsDone } = useFetchedGoals();

  useEffect(() => {
    const unsuscribe = navigation.addListener("focus", () => {
      getGoalsDone();
    });
    return unsuscribe;
  }, [navigation]);

  return (
    <View style={styles.container}>
      <FlatList
        data={goalsDone}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <Text>{item.goalName}</Text>}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {},
});
export default Done;
