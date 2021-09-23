import { useState } from "react";

export default function useShowCreateNewGoal() {
  const [showCreateNewGoal, setShowCreateNewGoal] = useState(false);

  const createNewGoal = () => {
    setShowCreateNewGoal(true);
  };

  const cancelCreateNewGoal = () => {
    setShowCreateNewGoal(false);
  };

  return [
    createNewGoal,
    cancelCreateNewGoal,
    showCreateNewGoal,
    setShowCreateNewGoal,
  ];
}
