import React, { useCallback } from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import LottieView from "lottie-react-native";

export default function Match() {
  const lottieRef = useCallback((node) => {
    if (node) {
      node.play();
    }
  }, []);
  return (
    <View style={styles.container}>
      <LottieView
        ref={lottieRef}
        source={require("../assets/animation/match.json")}
        autoPlay
        loop
        resizeMode="cover"
        style={styles.animation}
        useHardwareAcceleration={true}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  animation: {
    flex: 1,
  },
});
