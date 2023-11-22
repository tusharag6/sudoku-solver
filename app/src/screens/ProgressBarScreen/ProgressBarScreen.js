import React, { useEffect, useState } from "react";
import { View, Text, ProgressViewIOS, Platform } from "react-native";
import * as Progress from "react-native-progress";

const ProgressBarScreen = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prevProgress) => {
        const newProgress = prevProgress + 0.1;
        return newProgress >= 1 ? 0 : newProgress;
      });
    }, 500);

    return () => clearInterval(interval);
  }, []);

  return (
    <View className="flex-1 justify-center items-center bg-background">
      <View className="w-full pl-10 pb-5">
        <Text className="text-accentForeground text-2xl">Solving...</Text>
      </View>
      {Platform.OS === "android" ? (
        <Progress.Bar progress={progress} color="white" width={300} />
      ) : (
        <ProgressViewIOS progress={progress} />
      )}
      <Text className="mt-2 text-lg text-accentForeground">{`${Math.round(
        progress * 100
      )}%`}</Text>
    </View>
  );
};

export default ProgressBarScreen;
