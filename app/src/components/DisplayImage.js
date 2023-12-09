import React from "react";
import { View, Text, Image } from "react-native";
import Button from "./Button";

const DisplayImageComponent = ({ selectedImage, onSolveButtonPressed }) => {
  return (
    <View className="w-full h-full flex justify-center items-center">
      <View>
        <Text className="text-foreground font-medium text-xl mb-2 ">
          Your selected sudoku image
        </Text>
        <Image
          source={{ uri: selectedImage }}
          style={{ width: 350, height: 380 }}
        />
        <View className="mt-4">
          <Button title="Solve" onPress={onSolveButtonPressed} />
        </View>
      </View>
    </View>
  );
};

export default DisplayImageComponent;
