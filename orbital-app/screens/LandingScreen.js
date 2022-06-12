import React from "react";
import { Dimensions } from "react-native";
import { StyleSheet, Text, View, ImageBackground } from "react-native";

const LandingScreen = () => {
  const { width, height } = Dimensions.get("window");
  return (
    // <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
    <ImageBackground
      soruce={{
        uri: "https://upload.travelawaits.com/ta/uploads/2021/04/singapore-s-merlion-at-night51ccd9-1024x683.jpg",
      }}
      style={{
        height,
        width,
        resizeMode: "stretch",
        // resizeMode: "cover",
      }}
    ></ImageBackground>
  );
};

export default LandingScreen;

const styles = StyleSheet.create({});
