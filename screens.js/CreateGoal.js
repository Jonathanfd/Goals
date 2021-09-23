import React, { useState } from "react";
import {
  View,
  StyleSheet,
  useWindowDimensions,
  TouchableOpacity,
  Animated,
} from "react-native";
import client from "../client";
import AppButton from "../Components/AppButton";
import AppTextInput from "../Components/AppTextInput";
import useCreateGoalAnimation from "../Hooks/useCreateGoalAnimation";

function CreateGoal({ onCancelCreateNewGoal, pendingGoals, setPendingGoals }) {
  const { width, height } = useWindowDimensions();
  const scale = useCreateGoalAnimation();
  const [newGoal, setNewGoal] = useState("");
  const [newGoalDescription, setNewGoalDescription] = useState("");

  const addNewGoal = async () => {
    const newGoalToAdd = {
      id: Math.floor(Math.random() * 99),
      goalName: newGoal,
      goalDescription: newGoalDescription,
      done: false,
    };

    await fetch(`${client}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newGoalToAdd),
    });

    setPendingGoals([...pendingGoals, newGoalToAdd]);
    onCancelCreateNewGoal();
  };

  return (
    <View style={{ justifyContent: "center", alignItems: "center" }}>
      <TouchableOpacity
        style={[styles.container, { width, height: height }]}
        onPress={onCancelCreateNewGoal}
      />

      <Animated.View
        style={{
          height: 300,
          width: width - 10,
          padding: 20,
          backgroundColor: "dodgerblue",
          borderRadius: 10,
          position: "absolute",
          justifyContent: "space-evenly",
          transform: [
            {
              scale,
            },
          ],
        }}
      >
        <View>
          <AppTextInput
            placeholder="Goal..."
            autoFocus
            value={newGoal}
            onChangeText={(text) => setNewGoal(text)}
          />
          <AppTextInput
            placeholder="Description..."
            multiline
            height={100}
            value={newGoalDescription}
            onChangeText={(text) => setNewGoalDescription(text)}
          />
        </View>
        <AppButton text="Save" onPress={addNewGoal} />
      </Animated.View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: "black",
    opacity: 0.25,
  },
});
export default CreateGoal;
