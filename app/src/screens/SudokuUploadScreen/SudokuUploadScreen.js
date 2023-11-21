// src/screens/SudokuUploadScreen/SudokuUploadScreen.js
import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Alert,
  ImageBackground,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import Button from "../../components/Button";
import OutlineButton from "../../components/OutlineButton";
const SudokuUploadScreen = () => {
  const [selectedImage, setSelectedImage] = useState(null);

  const selectImageFromGallery = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.canceled) {
        setSelectedImage(result.assets[0].uri);
      }
    } catch (error) {
      console.error("Error selecting image from gallery:", error);
    }
  };

  const takeImageFromCamera = async () => {
    try {
      const result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.canceled) {
        setSelectedImage(result.assets[0].uri);
      }
    } catch (error) {
      console.error("Error taking image from camera:", error);
    }
  };

  return (
    <View className="bg-background h-full flex flex-col justify-center items-center">
      <View className="w-full p-10">
        <Text className="text-3xl font-bold mb-2 text-foreground">
          Greetings, Puzzler!
        </Text>
        <Text className="text-mutedForeground">
          Upload your Sudoku and let the magic unfold!
        </Text>
      </View>
      <View className="flex flex-row justify-evenly w-full mb-4 mt-32">
        <Button title="Upload from Gallery" onPress={selectImageFromGallery} />
        <OutlineButton title="Take Photo" onPress={takeImageFromCamera} />
      </View>
      {selectedImage ? (
        <ImageBackground
          source={{ uri: selectedImage }}
          className="h-200 w-200 mb-4"
          resizeMode="contain"
        />
      ) : (
        // <Text className="mb-4 text-foreground">No image selected</Text>
        ""
      )}
    </View>
  );
};

export default SudokuUploadScreen;
