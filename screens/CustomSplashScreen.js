import React, { useEffect, useState, useCallback } from "react";
import { View, Text, Image, StyleSheet } from "react-native";
const CustomSplashScreen = () => { 

  return (
    <View style={styles.container}>
      <Image source={require("../assets/animation/splash.gif")} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFF",
  },
  animation: {
    flex: 1,
  },
});

export default CustomSplashScreen;
