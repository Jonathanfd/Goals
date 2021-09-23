import React, { useState } from "react";
import { View, StyleSheet, Text, FlatList } from "react-native";
import AppButton from "../Components/AppButton";
import AppTextInput from "../Components/AppTextInput";
import useFetchedGoals from "../Hooks/useFetchedGoals";

function EditGoal({ navigation, route }) {
  const { id, goalName, goalDescription } = route.params;
  const [newGoalName, setNewGoalName] = useState(goalName);
  const [newGoalDescription, setNewGoalDescription] = useState(goalDescription);

  const { editGoal } = useFetchedGoals();
  return (
    <View style={styles.card}>
      <AppTextInput
        value={newGoalName}
        editable
        fontSize={25}
        fontWeight="600"
        color="dodgerblue"
        opacity={0.8}
        onChangeText={(text) => setNewGoalName(text)}
      />
      <AppTextInput
        value={newGoalDescription}
        onChangeText={(text) => setNewGoalDescription(text)}
      />

      <AppButton
        text="Edit"
        onPress={() => {
          editGoal(id, newGoalName, newGoalDescription);
          navigation.navigate("Home");
        }}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  card: {
    backgroundColor: "white",
    width: "95%",
    height: 100,
    alignSelf: "center",
    margin: 10,
    borderRadius: 5,
    padding: 10,
    elevation: 10,
    shadowColor: "grey",
    shadowOpacity: 0.3,
    shadowOffset: {
      width: 0,
      height: 3,
    },
  },
});
export default EditGoal;
