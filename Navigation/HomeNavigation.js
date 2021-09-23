import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "../screens.js/Home";
import EditGoal from "../screens.js/EditGoal";
import CreateGoal from "../screens.js/CreateGoal";

const Stack = createNativeStackNavigator();
const StackNavigation = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="Home"
      component={Home}
      options={{ headerShown: false }}
    />
    <Stack.Screen name="EditGoal" component={EditGoal} />
    <Stack.Screen name="CreateGoal" component={CreateGoal} />
  </Stack.Navigator>
);

export default StackNavigation;
