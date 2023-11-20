import React from "react";
import { Animated, StyleSheet, View, Text } from "react-native";
import { ACTION_OFFSET } from "../../utils/constants";
import { Container, Image, Like, Nope } from "./styles";
import AppIcons from "../../assets/AppIcons";

export default function ProfileCard({
  item,
  isFirst,
  swipe,
  tiltSign,
  ...rest
}) {
  //* Calculate rotation based on swipe position
  const rotate = Animated.multiply(swipe.x, tiltSign).interpolate({
    inputRange: [-ACTION_OFFSET, 0, ACTION_OFFSET],
    outputRange: ["8deg", "0deg", "-8deg"],
  });

  //* Calculate opacity for the "like" icon based on swipe position
  const likeOpacity = swipe.x.interpolate({
    inputRange: [10, ACTION_OFFSET],
    outputRange: [0, 1],
    extrapolate: "clamp",
  });

  //* Calculate opacity for the "nope" icon based on swipe position
  const nopeOpacity = swipe.x.interpolate({
    inputRange: [-ACTION_OFFSET, -10],
    outputRange: [1, 0],
    extrapolate: "clamp",
  });

  //* Apply styles to the card, including translation, rotation, and opacity
  const animatedCardStyle = {
    transform: [...swipe.getTranslateTransform(), { rotate: rotate }],
  };

  //* Render the profile card
  return (
    <Container
      as={Animated.View}
      style={isFirst && animatedCardStyle}
      {...rest}
    >
      <Image source={item.source} />
      <View style={styles.profileCardInfo}>
        <View style={styles.ProfileLocation}>
          <View style={styles.ProfileLocationIcon}>
            <AppIcons.Location />
          </View>
          <Text style={styles.ProfileLocationText}>{item.location}</Text>
        </View>
        <View style={styles.profileCardInfoNameFlex}>
          <View style={styles.profileCardInfoNameFlexLeft}>
            <View style={styles.ProfileName}>
              <Text style={styles.ProfileNameText}>{item.name}</Text>
            </View>
          </View>
          <View style={styles.profileCardInfoNameFlexRight}>
            <View style={styles.ProfileMatchContainer}>
              <View style={styles.ProfileMatch}>
                <Text style={styles.ProfileMatchText}>
                  {item.matchPercentage}
                </Text>
                <View style={styles.ProfileMatchTextPercent}>
                  <AppIcons.Percentage />
                </View>
              </View>
              <Text style={styles.ProfileMatchTextMatch}>match</Text>
            </View>
          </View>
        </View>
        <View style={styles.profilePills}>
          <View style={styles.profilePill}>
            <Text style={styles.profilePillText}> {item.gender}</Text>
          </View>
          <View style={styles.profilePill}>
            <Text style={styles.profilePillText}> {item.ethinity}</Text>
          </View>
          <View style={styles.profilePill}>
            <Text style={styles.profilePillText}>Ht. {item.height}</Text>
          </View>
          <View style={styles.profilePill}>
            <Text style={styles.profilePillText}>Age :{item.age}</Text>
          </View>
        </View>
        <View style={styles.profileBio}>
          <Text style={styles.profileBioText}>{item.bio}</Text>
        </View>
      </View>
      {isFirst && (
        <>
          <Like type="like" style={{ opacity: likeOpacity }} />
          <Nope type="nope" style={{ opacity: nopeOpacity }} />
        </>
      )}
    </Container>
  );
}
const styles = StyleSheet.create({
  profileCardInfo: {
    position: "absolute",
    bottom: 130,
    width: "100%",
    paddingHorizontal: 30,
  },
  ProfileLocation: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  ProfileLocationIcon: {
    marginRight: 5,
  },
  ProfileLocationText: {
    color: "#fff",
    fontFamily: "aeonik-medium",
    fontSize: 14,

    marginBottom: 10,
    flexDirection: "row",
    display: "flex",
    alignItems: "center",
    gap: 10,
  },
  profileCardInfoNameFlex: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  profileCardInfoNameFlexLeft: {
    width: "70%",
  },
  ProfileNameText: {
    color: "#fff",
    fontFamily: "aeonik-bold",
    fontSize: 48,
    lineHeight: 49,
    letterSpacing: -2,
  },
  ProfileMatchContainer: {
    transform: [{ translateY: 10 }],
  },
  ProfileMatch: {
    flexDirection: "row",
  },
  ProfileMatchText: {
    color: "#fff",
    fontFamily: "aeonik-bold",
    fontSize: 64,
    lineHeight: 65,
  },
  ProfileMatchTextPercent: {
    transform: [{ translateY: 24 }],
  },
  ProfileMatchTextMatch: {
    color: "#FCFCFC",
    transform: [
      { translateY: -14 },
      {
        translateX: 3,
      },
    ],
    fontFamily: "aeonik-medium",
    fontSize: 20,
  },
  profilePills: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    gap: 10,
    paddingTop: 15,
    borderTopColor: "rgba(255,255,255,0.1)",
    borderTopWidth: 1,
  },
  profilePill: {
    backgroundColor: "rgba(255,255,255,0.2)",
    paddingHorizontal: 10,
    paddingVertical: 3,
    paddingTop: 1,
    borderRadius: 15,
    borderColor: "#fff",
    borderWidth: 1,
  },
  profilePillText: {
    color: "#fff",
    fontFamily: "aeonik-medium",
    fontSize: 14,
  },
  profileBioText: {
    color: "#C8C8C8",
    fontFamily: "aeonik-medium",
    fontSize: 16,
    marginTop: 13,
    lineHeight: 17,
  },
});
