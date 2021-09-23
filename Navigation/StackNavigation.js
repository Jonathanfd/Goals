import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AppNavigation from "./AppNavigation";

const Stack = createNativeStackNavigator();
const StackNavigation = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="AppNavigation"
      component={AppNavigation}
      options={{ headerShown: false }}
    />
  </Stack.Navigator>
);

export default StackNavigation;
