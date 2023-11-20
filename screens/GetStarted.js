import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import AppIcons from "../assets/AppIcons";
import { useNavigation } from "@react-navigation/native";
import * as Animatable from "react-native-animatable";

export default function GetStarted() {
  const navigation = useNavigation();
  return (
    <LinearGradient
      style={styles.ContainerBg}
      colors={[
        "#654F44",
        "#60493F",
        "#5D4238",
        "#6F4532",
        "#7E4B35",
        "#472A26",
        "#361D1F",
      ]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
    >
      <View style={styles.Container}>
        <View style={styles.Logo}>
          <AppIcons.Logo />
        </View>
        <Text style={styles.GetStartedHeader}>
          Embark on a Journey of Love: Welcome to{" "}
          <Text style={styles.GetStartedHeaderWhite}> GlowUp Date</Text>
        </Text>
        <TouchableOpacity
          onPress={() => navigation.navigate("Home")}
          style={styles.getstartedbutton}
        >
          <Text style={styles.getstartedbuttonText}>Get Started</Text>
          <View style={styles.getstartedbuttonIcon}>
            <AppIcons.ButtonArrow />
          </View>
        </TouchableOpacity>
      </View>
      <Animatable.View
        style={styles.ImgAnimation}
        animation="fadeInUp"
        duration={1500}
        delay={500} // Adjust the delay as needed
      >
        <Image source={require("../assets/Backgrounds/ImgAnim.png")} />
      </Animatable.View>
    </LinearGradient>
  );
}
const styles = StyleSheet.create({
  Container: {
    paddingHorizontal: 30,
    paddingTop: 60,
  },
  ImgAnimation: {
    position: "absolute",
    bottom: -190,
    right: -150,
  },
  getstartedbutton: {
    backgroundColor: "#AF9386",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
    borderRadius: 30,
    width: 180,
    alignContent: "center",
    alignItems: "center",
    padding: 4,
    paddingLeft: 10,
  },
  getstartedbuttonText: {
    color: "#fff",
    fontSize: 20,
    fontFamily: "aeonik-medium",
    textAlign: "center",
    letterSpacing: -0.5,
  },
  getstartedbuttonIcon: {
    backgroundColor: "#fff",
    borderRadius: 16,
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  ContainerBg: {
    width: "100%",
    height: "100%",
    flex: 1,
  },
  GetStartedHeader: {
    color: "#C1AEA7",
    fontSize: 34,
    opacity: 1,
    letterSpacing: -0.5,
    fontFamily: "aeonik-bold",
    marginTop: 35,
  },
  GetStartedHeaderWhite: {
    color: "#fff",
    opacity: 1,
    fontFamily: "aeonik-bold",
  },
});
