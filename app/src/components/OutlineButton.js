import React from "react";
import { TouchableOpacity, Text } from "react-native";

const OutlineButton = ({ onPress, title }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      className="h-10 px-4 py-2 my-2 bg-background border border-primary inline-flex items-center justify-center rounded-md "
    >
      <Text className="text-foreground text-lg font-medium">{title}</Text>
    </TouchableOpacity>
  );
};

export default OutlineButton;
