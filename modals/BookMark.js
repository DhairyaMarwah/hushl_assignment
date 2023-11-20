import {
  View,
  Text,
  StyleSheet,
  Modal,
  Image,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import React from "react";
import AppIcons from "../assets/AppIcons";

export default function BookMark({ isVisible, toggleModal, img,name }) {
  const navigation = useNavigation();

  return (
    <Modal
      visible={isVisible}
      animationType="slide"
      transparent={true}
      onRequestClose={toggleModal}
    >
      <View style={styles.modalBackground}>
        <View style={styles.modalContainer}>
          <View style={styles.modalWrap}>
            <View style={styles.modalFlex}>
              <Image source={img} style={styles.BookMarkImg} />
              <Text style={styles.BookMarkText}>
                Successfully saved {name?.split(" ")[0]} Profile {"\n"}
                in your Bookmarks
              </Text>
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.2)", // Background layer color
  },
  modalFlex: {
    display: "flex",
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 10,
  },
  BookMarkText: {
    fontSize: 18,
    fontFamily: "aeonik-medium",
    color: "#000",
    letterSpacing: -0.5,
    marginTop: 3,
  },
  BookMarkImg: {
    width: 60,
    height: 60,
    resizeMode: "contain",
  },
  modalContainer: {
    justifyContent: "center",
    width: "100%",
    textAlign: "center",
    position: "absolute",
    bottom: 22,
    alignItems: "center",
  },
  modalWrap: {
    backgroundColor: "white",
    width: "92%",
    padding: 5,
    borderRadius: 14,
  },
});
