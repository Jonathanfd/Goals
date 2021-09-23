import React, { useRef } from "react";
import { Animated } from "react-native";

function useCreateGoalAnimation() {
  const animatedView = useRef(new Animated.Value(0)).current;

  Animated.spring(animatedView, {
    toValue: 1,
    useNativeDriver: true,
    bounciness: 14,
  }).start();

  const scale = animatedView.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [1, 1.5, 1],
  });

  return scale;
}

export default useCreateGoalAnimation;
