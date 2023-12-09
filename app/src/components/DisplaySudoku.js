import React from "react";
import { View, Text, Image } from "react-native";
import Button from "./Button";

const DisplaySudokuComponent = ({ data, onHomeButtonPressed }) => {
  return (
    <View className="w-full h-full flex justify-center items-center">
      <View>
        <Text className="text-foreground font-medium text-xl mb-2 ">
          Here is the solved sudoku
        </Text>
        <Image
          source={{
            uri: `data:${data.mime_type};base64,${data.solved_image64}`,
          }}
          style={{ width: 350, height: 380 }}
        />
        <View className="mt-4">
          <Button title="Solve Another" onPress={onHomeButtonPressed} />
        </View>
      </View>
    </View>
  );
};

export default DisplaySudokuComponent;
