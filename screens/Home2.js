import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  Animated,
  PanResponder,
  StyleSheet,
  View,
  TouchableOpacity,
} from "react-native";
import { ACTION_OFFSET, CARD } from "../utils/constants";
import { datingProfiles as datingProfilesObj } from "./data";
import { Container } from "./styles";
import Card from "../components/Card";
import AppIcons from "../assets/AppIcons";
import BookMark from "../modals/BookMark";

export default function Home2() {
  const swipe = useRef(new Animated.ValueXY()).current;
  const tiltSign = useRef(new Animated.Value(1)).current;
  const [datingProfiles, setdatingProfiles] = useState(datingProfilesObj);
  const [currentProfileIndex, setCurrentProfileIndex] = useState(0);

  useEffect(() => {
    if (datingProfiles.length === 0) {
      setdatingProfiles(datingProfilesObj);
    }
  }, [datingProfiles]);

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: (e, { dx, dy, y0 }) => {
        // 1: sentido horário | -1: sentido anti-horário
        tiltSign.setValue(y0 > CARD.CARD_HEIGHT / 2 ? 1 : -1);
        swipe.setValue({ x: dx, y: dy });
      },
      onPanResponderRelease: (e, { dx, dy }) => {
        const direction = Math.sign(dx);
        const userAction = Math.abs(dx) > ACTION_OFFSET;

        if (userAction) {
          Animated.timing(swipe, {
            duration: 200,
            toValue: {
              x: direction * CARD.CARD_OUT_WIDTH,
              y: dy,
            },
            useNativeDriver: true,
          }).start(transitionNext);
        } else {
          Animated.spring(swipe, {
            friction: 5,
            toValue: {
              x: 0,
              y: 0,
            },
            useNativeDriver: true,
          }).start();
        }
      },
    })
  ).current;

  const transitionNext = useCallback(() => {
    setdatingProfiles((prevState) => {
      setCurrentProfileIndex((prevIndex) => prevIndex + 1);
      return prevState.slice(1);
    });
    swipe.setValue({ x: 0, y: 0 });
  }, [swipe]);

  const handleChoise = useCallback(
    (sign) => {
      Animated.timing(swipe.x, {
        duration: 500,
        toValue: sign * CARD.CARD_OUT_WIDTH,
        useNativeDriver: true,
      }).start(transitionNext);
    },
    [swipe.x, transitionNext]
  );

  const handleSave = () => {
    setModalVisible(true);
  };
  const [isModalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };
  useEffect(() => {
    if (isModalVisible) {
      setTimeout(() => {
        setModalVisible(false);
      }, 3000);
    }
  }, [isModalVisible]);

  console.log(
    "currentProfileIndex",
    currentProfileIndex,
    datingProfilesObj[currentProfileIndex]
  );
  return (
    <View
      style={{
        flex: 1,
        width: "100%",
        height: "100%",
        position: "relative",
        backgroundColor: "#fff",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <BookMark
        isVisible={isModalVisible}
        toggleModal={toggleModal}
        img={datingProfilesObj[currentProfileIndex]?.bookmark}
        name={datingProfilesObj[currentProfileIndex]?.name}
        // data={datingProfiles[currentProfileIndex]}
      />
      <View style={styles.ProfileLogo}>
        <AppIcons.Logo />
      </View>
      <Container>
        {datingProfiles
          .map((item, index) => {
            const isFirst = index === 0;
            const panHandlers = isFirst ? panResponder.panHandlers : {};

            return (
              <Card
                key={item.id}
                item={item}
                isFirst={isFirst}
                swipe={swipe}
                tiltSign={tiltSign}
                {...panHandlers}
              />
            );
          })
          .reverse()}
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
      </Container>
    </View>
  );
}

const styles = StyleSheet.create({
  ProfileLogo: {
    position: "absolute",
    top: 60,
    left: 30,
    zIndex: 1000,
  },
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
