import * as Progress from "react-native-progress";
import { Platform, View, Text } from "react-native";
import React, { useEffect, useState } from "react";

const SolvingComponent = () => {
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
    <View className="w-full h-full flex justify-center items-center">
      <View>
        <Text className="text-foreground font-medium text-xl mb-2 ">
          Solving...
        </Text>
        {Platform.OS === "android" ? (
          <Progress.Bar progress={progress} color="#fff" width={300} />
        ) : (
          <Progress.ProgressViewIOS progress={progress} />
        )}
      </View>
    </View>
  );
};

export default SolvingComponent;
