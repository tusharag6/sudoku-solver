import React, { useEffect, useState } from "react";
import { View, Text, Image, Platform } from "react-native";
import * as Progress from "react-native-progress";

const ProgressBarScreen = ({ route }) => {
  const { imageBase64 } = route.params;
  const [progress, setProgress] = useState(0);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prevProgress) => {
        const newProgress = prevProgress + 0.1;
        return newProgress >= 1 ? 0 : newProgress;
      });
    }, 500);

    return () => clearInterval(interval);
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

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#FFFFFF",
      }}
    >
      {loading ? (
        <View style={{ width: "100%", paddingLeft: 10, paddingBottom: 5 }}>
          <Text style={{ color: "#00f", fontSize: 20 }}>Solving...</Text>
        </View>
      ) : (
        <View style={{ width: "100%", paddingLeft: 10, paddingBottom: 5 }}>
          <Text style={{ color: "#00f", fontSize: 20 }}>Solved!</Text>
          <Image
            style={{
              // width: 300,
              height: 350,
              borderWidth: 2,
              borderColor: "black",
            }}
            source={{
              uri: `data:${data.mime_type};base64,${data.solved_image64}`,
            }}
          />
        </View>
      )}
      {/* {Platform.OS === "android" ? (
        <Progress.Bar progress={progress} color="#fff" width={300} />
      ) : (
        <Progress.ProgressViewIOS progress={progress} />
      )} */}
    </View>
  );
};

export default ProgressBarScreen;
