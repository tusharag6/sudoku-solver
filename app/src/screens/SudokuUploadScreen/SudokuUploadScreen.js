import React, { useState, useEffect } from "react";
import { ImageBackground, Alert } from "react-native";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";
import { useNavigation } from "@react-navigation/native";
import DisplayImageComponent from "../../components/DisplayImage";
import GreetingsComponent from "../../components/Greetings";

const SudokuUploadScreen = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedImageBase64, setSelectedImageBase64] = useState(null);

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

  const saveImageToFolder = async (imageUri) => {
    const localUri = `${FileSystem.documentDirectory}yourImageFileName.jpg`;
    try {
      await FileSystem.copyAsync({
        from: imageUri,
        to: localUri,
      });
      console.log("Image saved to:", localUri);
      return localUri;
    } catch (error) {
      console.error("Error saving image:", error);
    }
  };

  const convertImageToBase64 = async (imageUri) => {
    try {
      const base64 = await FileSystem.readAsStringAsync(imageUri, {
        encoding: FileSystem.EncodingType.Base64,
      });
      return base64;
    } catch (error) {
      console.error("Error converting image to base64:", error);
    }
  };

  const selectImageFromGallery = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 1,
      });

      if (!result.canceled) {
        const savedImagePath = await saveImageToFolder(result.assets[0].uri);
        const base64 = await convertImageToBase64(savedImagePath);

        setSelectedImage(result.assets[0].uri);
        setSelectedImageBase64(base64);
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
        const savedImagePath = await saveImageToFolder(result.assets[0].uri);
        const base64 = await convertImageToBase64(result.assets[0].uri);

        setSelectedImage(result.assets[0].uri);
        setSelectedImageBase64(base64);
      }
    } catch (error) {
      console.error("Error taking image from camera:", error);
    }
  };

  const onSolveButtonPressed = async () => {
    if (selectedImageBase64) {
      navigation.navigate("ProgressBar", {
        imageBase64: selectedImageBase64,
      });
    } else {
      Alert.alert("Error", "No image selected");
    }
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
