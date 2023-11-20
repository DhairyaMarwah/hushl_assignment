import { StyleSheet, View, TouchableOpacity } from "react-native";
import React from "react";
import AppIcons from "../../assets/AppIcons";

export default function BottomBar({ handleChoise, handleSave }) {
  return (
    <View style={styles.BottomBar}>
      <View style={styles.BottomBarContainer}>
        <View style={styles.BottomBarContainerLeft}>
          <TouchableOpacity
            onPress={() => handleChoise(1)}
            style={styles.BottomBarIcon}
          >
            <AppIcons.Like />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => handleChoise(-1)}
            style={styles.BottomBarIcon}
          >
            <AppIcons.Dislike />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => handleChoise(1)}
            style={styles.BottomBarIcon}
          >
            <AppIcons.SuperLike />
          </TouchableOpacity>
        </View>
        <View style={styles.BottomBarContainerRight}>
          <TouchableOpacity
            onPress={() => handleSave()}
            style={styles.BottomBarIcon}
          >
            <AppIcons.Save />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  BottomBar: {
    position: "absolute",
    // top: 90,
    bottom: 25,
    width: "100%",
    paddingHorizontal: 30,
    zIndex: 1000,
  },
  BottomBarContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    gap: 10,
  },
  BottomBarContainerLeft: {
    borderRadius: 40,
    backgroundColor: "rgba(217, 217, 217, 0.25)",
    padding: 9,
    flexDirection: "row",
    justifyContent: "space-between",
    width: "77%",
  },
  BottomBarContainerRight: {
    borderRadius: 40,
    backgroundColor: "rgba(217, 217, 217, 0.25)",
    padding: 9,
    width: "23%",
  },
});
