import React from "react";
import { View, Text } from "react-native";
import OutlineButton from "./OutlineButton";
import Button from "./Button";

const GreetingsComponent = ({ takePicture, uploadFromGallery }) => {
  return (
    <View className="w-full h-full flex justify-center items-center ">
      <Text className="text-4xl font-bold text-foreground mb-1">
        Greetings, Puzzler!
      </Text>
      <Text className="text-foreground mb-4">
        Upload your Sudoku and let the magic unfold!
      </Text>
      <View>
        <OutlineButton title="Take Photo" onPress={takePicture} />
        <Button title="Upload from Gallery" onPress={uploadFromGallery} />
      </View>
    </View>
  );
};

export default GreetingsComponent;
