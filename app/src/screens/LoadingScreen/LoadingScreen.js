import React, { useEffect } from "react";
import { View, Image, Text } from "react-native";

const LoadingScreen = ({ navigation }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.navigate("SudokuUpload");
    }, 1000);

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View className="flex-1 justify-center items-center bg-background">
      <Image
        source={require("../../../assets/logo.png")}
        className="h-full w-full mb-4"
        resizeMode="contain"
      />
    </View>
  );
};

export default LoadingScreen;
