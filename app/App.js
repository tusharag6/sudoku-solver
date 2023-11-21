import React from "react";
import { Text, View } from "react-native";
import Button from "./src/components/Button";
import OutlineButton from "./src/components/OutlineButton";
import SecondaryButton from "./src/components/SecondaryButton";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoadingScreen from "./src/screens/LoadingScreen/LoadingScreen";
import SudokuUploadScreen from "./src/screens/SudokuUploadScreen/SudokuUploadScreen";

export default function App() {
  const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="AppLoading"
        headerMode="none"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="AppLoading" component={LoadingScreen} />
        <Stack.Screen name="SudokuUpload" component={SudokuUploadScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
