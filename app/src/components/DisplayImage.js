import React from "react";
import { View, Text, Image } from "react-native";
import Button from "./Button";
import OutlineButton from "./OutlineButton";

const DisplayImageComponent = ({
  selectedImage,
  onSolveButtonPressed,
  onSolveAnotherPressed,
}) => {
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
        <View className="mt-4 flex flex-row justify-between items-center">
          <OutlineButton
            title="Solve Another"
            onPress={onSolveAnotherPressed}
          />
          <Button title="Solve" onPress={onSolveButtonPressed} />
        </View>
      </View>
    </View>
  );
};

export default DisplayImageComponent;
