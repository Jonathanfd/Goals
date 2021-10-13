import React, { useState } from "react";

import client from "../client";

function useFetchedGoals() {
  const [pendingGoals, setPendingGoals] = useState([]);
  const [goalsDone, setGoalsDone] = useState([]);

  const getPendingGoals = async () => {
    const data = await fetch(`${client}`);
    const goals = await data.json();
    setPendingGoals(goals.filter((goal) => goal.done === false));
  };

  const getGoalsDone = async () => {
    const data = await fetch(`${client}`);
    const goals = await data.json();
    setGoalsDone(goals.filter((goal) => goal.done === true));
  };

  const deletePendingGoal = async (id) => {
    await fetch(`${client}${id}`, {
      method: "DELETE",
    });
    setPendingGoals(pendingGoals.filter((goal) => goal.id !== id));
  };

  const setGoalDone = async (id) => {
    await fetch(`${client}${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ done: true }),
    });

    setPendingGoals(pendingGoals.filter((goal) => goal.done === false));
    getPendingGoals();
  };

  const editGoal = async (id, goalName, goalDescription) => {
    const dataEdited = {
      id,
      goalName,
      goalDescription,
      done: false,
    };

    await fetch(`${client}${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dataEdited),
    });

    // setPendingGoals(
    //   pendingGoals.map((goal) => (goal.id === id ? dataEdited : goal))
    // );
  };

  return {
    pendingGoals,
    setPendingGoals,
    deletePendingGoal,
    setGoalDone,
    goalsDone,
    setGoalsDone,
    getGoalsDone,
    editGoal,
    getPendingGoals,
  };
}

export default useFetchedGoals;
