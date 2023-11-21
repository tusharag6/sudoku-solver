import React from "react";
import { TouchableOpacity, Text } from "react-native";

const SecondaryButton = ({ onPress, title }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      className="h-10 px-4 py-2 bg-secondary inline-flex items-center justify-center rounded-md"
    >
      <Text className=" text-secondaryForeground text-lg font-medium">
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default SecondaryButton;
