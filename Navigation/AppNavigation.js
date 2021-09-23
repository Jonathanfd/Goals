import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import Done from "../screens.js/Done";
import HomeNavigation from "./HomeNavigation";

const Drawer = createDrawerNavigator();
const AppNavigation = () => (
  <Drawer.Navigator
    screenOptions={{
      swipeEdgeWidth: 30,
      headerStyle: { backgroundColor: "dodgerblue" },
      headerTintColor: "white",
    }}
  >
    <Drawer.Screen
      name="HomeNavigation"
      component={HomeNavigation}
      options={{
        title: "Pending Goals",
      }}
    />
    <Drawer.Screen
      name="Done"
      component={Done}
      listeners={{ focus: () => console.log("hola") }}
      options={{
        title: "Goals done",
      }}
    />
  </Drawer.Navigator>
);

export default AppNavigation;
