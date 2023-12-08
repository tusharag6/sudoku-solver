import React, { useState, useEffect } from "react";
import { View, Text, Image, ImageBackground } from "react-native";
import * as ImagePicker from "expo-image-picker";
import Button from "../../components/Button";
import OutlineButton from "../../components/OutlineButton";
import { useNavigation } from "@react-navigation/native";
import { BlurView } from "@react-native-community/blur";

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
    <ImageBackground
      source={require("../../../assets/bgimg.jpg")}
      style={{
        flex: 1,
        justifyContent: "space-between",
        paddingVertical: 14,
        alignItems: "center",
      }}
    >
      <View className="h-full flex flex-col justify-center">
        <View className="w-full mb-4">
          <Text className="text-4xl font-bold text-foreground mb-1">
            Greetings, Puzzler!
          </Text>
          <Text className="text-foreground">
            Upload your Sudoku and let the magic unfold!
          </Text>
        </View>
        {!selectedImage ? (
          <View className="flex flex-col">
            <OutlineButton title="Take Photo" onPress={takeImageFromCamera} />
            <Button
              title="Upload from Gallery"
              onPress={selectImageFromGallery}
            />
          </View>
        ) : (
          <View>
            <Button title="Solve" onPress={onSolveButtonPressed} />
          </View>
        )}
      </View>
    </ImageBackground>
  );
};

export default SudokuUploadScreen;
