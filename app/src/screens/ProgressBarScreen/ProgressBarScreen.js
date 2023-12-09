import React, { useEffect, useState } from "react";
import { ImageBackground, BackHandler } from "react-native";
import DisplaySudokuComponent from "../../components/DisplaySudoku";
import SolvingComponent from "../../components/Solving";
import { useNavigation } from "@react-navigation/native";

const ProgressBarScreen = ({ route }) => {
  const { imageBase64 } = route.params;
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);

  const navigation = useNavigation();

  // useEffect(() => {
  //   const backAction = () => {
  //     Alert.alert("Are you sure you want to go back?", [
  //       {
  //         text: "Cancel",
  //         onPress: () => null,
  //         style: "cancel",
  //       },
  //       { text: "YES", onPress: () => navigation.navigate("SudokuUpload") },
  //     ]);
  //     return true;
  //   };

  //   const backHandler = BackHandler.addEventListener(
  //     "hardwareBackPress",
  //     backAction
  //   );

  //   return () => backHandler.remove();
  // }, []);

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      () => true
    );
    return () => backHandler.remove();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "http://192.168.157.78:5000/process_image",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              image64: imageBase64,
            }),
          }
        );

        const responseData = await response.json();
        setData(responseData);
        setLoading(false);
      } catch (error) {
        console.error("Error:", error);
      }
    };
    fetchData();
  }, [imageBase64]);

  const onHomeButtonPressed = () => {
    navigation.navigate("SudokuUpload");
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
      {loading ? (
        <SolvingComponent />
      ) : (
        <DisplaySudokuComponent
          data={data}
          onHomeButtonPressed={onHomeButtonPressed}
        />
      )}
    </ImageBackground>
  );
};

export default ProgressBarScreen;
