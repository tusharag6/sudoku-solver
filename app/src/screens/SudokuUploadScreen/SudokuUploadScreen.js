import React, { useState, useEffect } from "react";
import { View, Text, Image } from "react-native";
import * as ImagePicker from "expo-image-picker";
import Button from "../../components/Button";
import OutlineButton from "../../components/OutlineButton";
import { useNavigation } from "@react-navigation/native";
const SudokuUploadScreen = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  useEffect(() => {
    requestCameraPermission();
    requestGalleryPermission();
  }, []);
  const navigation = useNavigation();

  const requestCameraPermission = async () => {
    try {
      const { status } = await ImagePicker.requestCameraPermissionsAsync();
      if (status !== "granted") {
        Alert.alert(
          "Permission Denied",
          "Camera permission is required to take photos."
        );
      }
    } catch (error) {
      console.error("Error requesting camera permission:", error);
    }
  };

  const requestGalleryPermission = async () => {
    try {
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== "granted") {
        Alert.alert(
          "Permission Denied",
          "Gallery permission is required to access photos."
        );
      }
    } catch (error) {
      console.error("Error requesting gallery permission:", error);
    }
  };

  const selectImageFromGallery = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
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
        quality: 1,
      });

      if (!result.canceled) {
        setSelectedImage(result.assets[0].uri);
      }
    } catch (error) {
      console.error("Error taking image from camera:", error);
    }
  };

  const onSolveButtonPressed = () => {
    navigation.navigate("ProgressBar");
  };

  return (
    <View className="bg-background h-full flex flex-col items-center justify-between py-14">
      <View className="w-full p-10">
        <Text className="text-3xl font-bold text-foreground">
          Greetings, Puzzler!
        </Text>
        <Text className="text-mutedForeground">
          Upload your Sudoku and let the magic unfold!
        </Text>
      </View>
      <View className="flex flex-row px-10 justify-between w-full">
        <Button title="Upload from Gallery" onPress={selectImageFromGallery} />
        <OutlineButton title="Take Photo" onPress={takeImageFromCamera} />
      </View>
      <View className="ml-60 w-24">
        {selectedImage ? (
          // <Image
          //   source={{ uri: selectedImage }}
          //   className="h-200 w-200 mb-4"
          //   resizeMode="contain"
          // />
          <Button title="Solve" onPress={onSolveButtonPressed} />
        ) : (
          // <Text className="mt-4 text-foreground">No image selected</Text>
          ""
        )}
      </View>
    </View>
  );
};

export default SudokuUploadScreen;
