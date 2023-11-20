import {
  View,
  Text,
  StyleSheet,
  Modal,
  Image,
  TouchableOpacity,
} from "react-native";
import * as Animatable from "react-native-animatable";
import LottieView from "lottie-react-native";
import { useNavigation } from "@react-navigation/native";
import React, { useState, useCallback, useEffect } from "react";
import AppIcons from "../assets/AppIcons";

export default function Match({ isVisible, toggleModal }) {
  const navigation = useNavigation();
  const lottieRef = useCallback((node) => {
    if (node) {
      node.play();
    }
  }, []);
  const [swap, setSwap] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setSwap(true);
    }, 3000);
  }, []);
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
            {swap == false ? (
              <LottieView
                ref={lottieRef}
                source={require("../assets/animation/hearts.json")}
                autoPlay
                loop
                resizeMode="cover"
                style={styles.animation}
                speed={2}
                useHardwareAcceleration={true}
              />
            ) : (
              <View style={styles.matchContent}>
                <View style={styles.modalLogo}>
                  <AppIcons.Fav />
                </View>
                <View>
                  <Text style={styles.modalText}>
                    Congrats!{"\n"} Its a match
                  </Text>
                </View>
                <View style={styles.matchProfiles}>
                  <Animatable.View
                    style={styles.ImgAnimation}
                    animation="fadeInLeft"
                  >
                    <View style={styles.matchProfile1}>
                      <Image
                        source={require("../assets/DatingProfiles/Profile2Bookmark.png")}
                        style={styles.matchProfile}
                      />
                    </View>
                  </Animatable.View>
                  <Animatable.View
                    style={styles.ImgAnimation}
                    animation="fadeInRight"
                  >
                    <View style={styles.matchProfile2}>
                      <Image
                        source={require("../assets/DatingProfiles/Profile4Bookmark.png")}
                        style={styles.matchProfile}
                      />
                    </View>
                  </Animatable.View>
                </View>
                <View style={styles.ModalButtos}>
                  <TouchableOpacity
                    onPress={() => {
                      toggleModal();
                    }}
                    style={styles.ModalButton}
                  >
                    <Text style={styles.ModalButtonText}>
                      Send a message to Dhairya
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => {
                      toggleModal();
                    }}
                    style={[
                      styles.ModalButton,
                      {
                        backgroundColor: "#fff",
                        borderColor: "#1A1A1A",
                        borderWidth: 1.2,
                      },
                    ]}
                  >
                    <Text
                      style={[
                        styles.ModalButtonText,
                        {
                          color: "#1A1A1A",
                        },
                      ]}
                    >
                      Continue seeing other profiles
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  matchContent: {
    display: "flex",
    width: "100%",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 30,
  },
  matchProfile1: {
    transform: [
      { rotate: "-10deg" },
      {
        translateX: 10,
      },
    ],
    // shadow
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 10,
  },
  matchProfile2: {
    transform: [
      { rotate: "10deg" },
      {
        translateX: -10,
      },
    ],
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 10,
  },
  matchProfiles: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 30,
    marginBottom: 40,
  },
  modalText: {
    fontSize: 36,
    lineHeight: 33,
    marginTop: 14,
    fontFamily: "aeonik-bold",
    color: "#4B4B4B",
    letterSpacing: -0.5,
    textAlign: "center",
  },
  matchProfile: {
    borderColor: "#fff",
    borderRadius: 20,
    borderWidth: 2,
  },
  ModalButtos: {
    width: "100%",
    paddingHorizontal: 10,
  },
  ModalButtonText: {
    color: "#fff",
    fontSize: 18,
    fontFamily: "aeonik-medium",
    textAlign: "center",
    letterSpacing: -0.5,
  },
  ModalButton: {
    borderRadius: 12.595,
    backgroundColor: "#1A1A1A",
    width: "100%",
    marginTop: 10,
    marginHorizontal: "auto",
    paddingVertical: 11,
    paddingTop: 9,
    textAlign: "center",
    flexDirection: "row",
    justifyContent: "center",
  },
  modalBackground: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Background layer color
  },
  modalContainer: {
    justifyContent: "center",
    width: "100%",
    textAlign: "center",
    position: "absolute",
    bottom: 3,
    alignItems: "center",
  },
  modalWrap: {
    backgroundColor: "white",
    width: "100%",
    overflow: "hidden",
    paddingTop: 10,
    height: 540,
    padding: 15,
    paddingTop: 15,
    borderRadius: 34,
  },
});
