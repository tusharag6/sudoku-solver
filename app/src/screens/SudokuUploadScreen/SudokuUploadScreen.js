import React, { useState, useEffect } from "react";
import { ImageBackground } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { useNavigation } from "@react-navigation/native";
import DisplayImageComponent from "../../components/DisplayImage";
import GreetingsComponent from "../../components/Greetings";

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
  console.log(selectedImage);
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
      {selectedImage ? (
        <DisplayImageComponent
          selectedImage={selectedImage}
          onSolveButtonPressed={onSolveButtonPressed}
        />
      ) : (
        <GreetingsComponent
          takePicture={takeImageFromCamera}
          uploadFromGallery={selectImageFromGallery}
        />
      )}
    </ImageBackground>
  );
};

export default SudokuUploadScreen;
