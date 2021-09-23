import React, { useEffect, useRef, useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  useWindowDimensions,
  TouchableOpacity,
  FlatList,
  Animated,
} from "react-native";
import AppTextInput from "../Components/AppTextInput";
import useFetchedGoals from "../Hooks/useFetchedGoals";
import CreateGoal from "./CreateGoal";
import Swipeable from "react-native-gesture-handler/Swipeable";
import { FontAwesome5 } from "@expo/vector-icons";
import useShowCreateNewGoal from "../Hooks/useShowCreateNewGoal";

const ActionIcon = Animated.createAnimatedComponent(FontAwesome5);

function Home({ navigation }) {
  const { width, height } = useWindowDimensions();
  const [createNewGoal, cancelCreateNewGoal, showCreateNewGoal] =
    useShowCreateNewGoal();
  const swipeRef = useRef();
  const closeSwipe = () => {
    swipeRef.current.close();
  };
  const {
    getPendingGoals,
    pendingGoals,
    setPendingGoals,
    deletePendingGoal,
    setGoalDone,
  } = useFetchedGoals();

  const segmentRef = useRef();
  const scrollSegmentToEnd = () => {
    segmentRef.current.scrollToEnd();
  };

  useEffect(() => {
    const unsuscribe = navigation.addListener("focus", () => {
      getPendingGoals();
    });
    return () => {
      setPendingGoals([]);
      setGoalDone([]);
      //   unsuscribe();
    };
  }, [navigation]);

  useEffect(() => {
    scrollSegmentToEnd();
  }, [showCreateNewGoal]);

  const editGoal = (item) => {
    closeSwipe();
    navigation.navigate("EditGoal", item);
  };

  const RightAction = ({ progress, dragX, onDelete, onDone, onEdit }) => {
    const scale = progress.interpolate({
      inputRange: [0, 0.5, 1],
      outputRange: [3, 1.5, 1],
      extrapolate: "clamp",
    });
    const opacity = progress.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 1],
      extrapolate: "clamp",
    });

    return (
      <Animated.View
        style={{
          backgroundColor: "rgba(0, 131, 253, 0.10)",
          flexDirection: "row",
          flex: 0.5,
          alignItems: "center",
          justifyContent: "center",
          opacity,
          borderRadius: 5,
          transform: [{ scale }],
          margin: 5,
        }}
      >
        <TouchableOpacity onPress={onDone}>
          <ActionIcon
            name="check-square"
            size={30}
            color="dodgerblue"
            style={{ marginRight: 15, transform: [{ scale }] }}
          />
        </TouchableOpacity>

        <TouchableOpacity onPress={onEdit}>
          <ActionIcon
            name="edit"
            size={30}
            color="dodgerblue"
            style={{ marginRight: 8, transform: [{ scale }] }}
          />
        </TouchableOpacity>

        <TouchableOpacity onPress={onDelete}>
          <ActionIcon
            name="window-close"
            size={30}
            color="dodgerblue"
            style={{ marginRight: 15, transform: [{ scale }] }}
          />
        </TouchableOpacity>
      </Animated.View>
    );
  };

  const renderPendingGoals = ({ item }) => {
    return (
      <Swipeable
        ref={swipeRef}
        renderRightActions={(progress) => (
          <RightAction
            progress={progress}
            onDelete={() => deletePendingGoal(item.id)}
            onDone={() => setGoalDone(item.id)}
            onEdit={() => editGoal(item)}
          />
        )}
      >
        <View style={styles.card}>
          <AppTextInput
            value={item.goalName}
            editable
            fontSize={25}
            fontWeight="600"
            color="dodgerblue"
            opacity={0.8}
          />
          <AppTextInput value={item.goalDescription} editable />
        </View>
      </Swipeable>
    );
  };

  return (
    <View style={styles.container}>
      {showCreateNewGoal && (
        <CreateGoal
          onCancelCreateNewGoal={cancelCreateNewGoal}
          pendingGoals={pendingGoals}
          setPendingGoals={setPendingGoals}
        />
      )}
      <FlatList
        data={pendingGoals}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderPendingGoals}
        extraData={pendingGoals}
        ref={segmentRef}
      />

      <TouchableOpacity
        style={[styles.newGoalButton, { top: height / 1.3, left: width / 1.3 }]}
        onPress={createNewGoal}
      >
        <Text style={{ fontSize: 30, color: "#fff" }}>+</Text>
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
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
  newGoalButton: {
    height: 60,
    width: 60,
    borderRadius: 30,
    backgroundColor: "dodgerblue",
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",

    shadowColor: "black",
    shadowOffset: { height: 2, width: 0 },
    shadowRadius: 5,
    shadowOpacity: 0.4,
  },
});
export default Home;
