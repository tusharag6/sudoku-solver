import React from "react";
import { Text, View } from "react-native";
import Button from "./src/components/Button";
import OutlineButton from "./src/components/OutlineButton";
import SecondaryButton from "./src/components/SecondaryButton";

export default function App() {
  return (
    <View className="flex-1 items-center justify-center bg-background">
      <Text className="text-foreground">
        Open up App.js to start working on your app!
      </Text>
      <Button title="Click me" onPress={() => alert("Hello world!")} />
      <SecondaryButton title="Click me" onPress={() => alert("Hello world!")} />
      <OutlineButton title="Click me" onPress={() => alert("Hello world!")} />
    </View>
  );
}
