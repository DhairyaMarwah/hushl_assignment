import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  Animated,
  PanResponder,
} from "react-native";
import React, { useState, useRef, useCallback } from "react";
import AppIcons from "../assets/AppIcons";
export default function Home() {
  const DatingProfiles = [
    {
      id: 1,
      name: "Henna Clint",
      age: 22,
      location: "London, UK",
      image: require("../assets/DatingProfiles/Profile1.png"),
      gender: "female",
      height: "5'4",
      education: "Bachelors in Computer Science",
      job: "Software Engineer",
      ethinity: "South Asian",
      matchPercentage: 92,
      liked: false,
      bio: "Looking for a reason to delete this app, and hopefully, you’re it!",
    },
    {
      id: 2,
      name: "Jenna Hose",
      age: 22,
      location: "Paris, Tokyo",
      image: require("../assets/DatingProfiles/Profile2.png"),
      gender: "female",
      height: "5'4",
      education: "Bachelors in Computer Science",
      job: "Software Engineer",
      ethinity: "South Asian",
      matchPercentage: 92,
      liked: true,
    },
  ];
  const [datingProfiles, setDatingProfiles] = useState(DatingProfiles);
  const swipe = useRef(new Animated.ValueXY()).current;
  const rotate = useRef(new Animated.Value(0)).current;
  const panResponser = PanResponder.create({
    onMoveShouldSetPanResponder: () => true,
    onPanResponderMove: (_, { dx, dy }) => {
      console.log("dx:" + dx + " dy:" + dy);
      swipe.setValue({ x: dx, y: dy });
    },

    onPanResponderRelease: (_, { dx, dy }) => {
      console.log("released:" + "dx:" + dx + " dy:" + dy);
      let direction = Math.sign(dx);
      let isActionActive = Math.abs(dx) > 200;
      if (isActionActive) {
        Animated.timing(swipe, {
          toValue: { x: 500 * dx, y: dy },
          useNativeDriver: true,
          duration: 500,
        }).start(removeCard);
      } else {
        Animated.spring(swipe, {
          toValue: { x: 0, y: 0 },
          useNativeDriver: true,
          friction: 5,
        }).start();
      }
    },
  });
  const removeCard = useCallback(() => {
    setDatingProfiles((prepState) => prepState.slice(1));
    swipe.setValue({ x: 0, y: 0 });
  }, [swipe]);

  const handelSelection = useCallback(
    (direction) => {
      Animated.timing(swipe, {
        toValue: { x: direction * 500, y: 0 },
        useNativeDriver: true,
        duration: 500,
      }).start(removeCard);
    },
    [removeCard]
  );
  return (
    <View style={{ flex: 1 }}>
      <View style={styles.ProfileLogo}>
        <AppIcons.Logo />
      </View>
      {datingProfiles.map((item, index) => {
        return (
          <View style={styles.profileCard}>
            <Image
              source={item.image}
              style={{ width: "100%", height: "100%" }}
            />
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
                        {/* <View style={styles.ProfileMatchIcon}>
                        <AppIcons.Percentage />
                      </View> */}
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
          </View>
        );
      })}

      <View style={styles.BottomBar}>
        <View style={styles.BottomBarContainer}>
          <View style={styles.BottomBarContainerLeft}>
            <View style={styles.BottomBarIcon}>
              <AppIcons.Like />
            </View>
            <View style={styles.BottomBarIcon}>
              <AppIcons.Dislike />
            </View>
            <View style={styles.BottomBarIcon}>
              <AppIcons.SuperLike />
            </View>
          </View>
          <View style={styles.BottomBarContainerRight}>
            <View style={styles.BottomBarIcon}>
              <AppIcons.Save />
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  BottomBar: {
    position: "absolute",
    bottom: 25,
    width: "100%",
    paddingHorizontal: 30,
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
  ProfileMatch: {
    flexDirection: "row",
  },
  ProfileMatchContainer: {
    transform: [{ translateY: 10 }],
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
  profileBioText: {
    color: "#C8C8C8",
    fontFamily: "aeonik-medium",
    fontSize: 16,
    marginTop: 13,
    lineHeight: 17,
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
  ProfileLogo: {
    position: "absolute",
    top: 60,
    left: 30,
    zIndex: 1000,
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
  ProfileMatchTextPercent: {
    transform: [{ translateY: 24 }],
  },
  profilePillText: {
    color: "#fff",
    fontFamily: "aeonik-medium",
    fontSize: 14,
  },

  profileCard: {
    position: "relative",
  },
  ProfileLocation: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  profileCardInfoNameFlexLeft: {
    width: "70%",
  },
  ProfileMatchIcon: {
    position: "relative",
    // top: -40,
    bottom: -30,
  },
  ProfileNameText: {
    color: "#fff",
    fontFamily: "aeonik-bold",
    fontSize: 48,
    lineHeight: 49,
    letterSpacing: -2,
  },
  ProfileMatchText: {
    color: "#fff",
    fontFamily: "aeonik-bold",
    fontSize: 64,
    lineHeight: 65,
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
  ProfileLocationIcon: {
    marginRight: 5,
  },

  profileCardInfo: {
    position: "absolute",
    bottom: 130,
    width: "100%",
    paddingHorizontal: 30,
  },
  termsContent: {
    marginTop: 20,
  },
  termsTextBold: {
    color: "#22272F",
    fontFamily: "Poppins_600SemiBold",
  },
  termsText: {
    fontSize: 14,
    fontFamily: "Poppins_400Regular",
    color: "#74797D",
    lineHeight: 20,
  },
  pageHeader: {
    textAlign: "center",
    color: "#22272F",
    fontSize: 19,
    letterSpacing: -0.5,
    fontFamily: "Poppins_600SemiBold",
    marginTop: 15,
  },
  Container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#FFF",
  },
  ScrollContainer: {
    width: "90%",
    marginHorizontal: "auto",
    textAlign: "center",
    alignContent: "center",
  },
});
