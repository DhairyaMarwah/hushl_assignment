import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  Animated,
  PanResponder,
  StyleSheet,
  View, 
} from "react-native";
import { ACTION_OFFSET, CARD } from "../../utils/constants";
import { datingProfiles as datingProfilesObj } from "../../data/data";
import { Container } from "../../styles/styles";
import AppIcons from "../../assets/AppIcons";
import BookMark from "../../modals/BookMark";
import Match from "../../modals/Match";
import BottomBar from "../../components/BottomBar/BottomBar";
import ProfileCard from "../../components/ProfileCard";

export default function Home() {
  const swipe = useRef(new Animated.ValueXY()).current;
  const [currentswipe, setCurrentswipe] = useState("");
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
          }).start(() => {
            if (direction === 1) {
              console.log("liked");
              setCurrentswipe("liked");
            } else {
              console.log("not liked");
              setCurrentswipe("notliked");
            }
            transitionNext();
          });
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
  const [isMatchModalVisible, setMatchModalVisible] = useState(false);

  const toggleMatchModal = () => {
    setMatchModalVisible(!isMatchModalVisible);
  };

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

  useEffect(() => {
    if (
      datingProfilesObj[currentProfileIndex]?.liked === true &&
      currentswipe === "liked"
    ) {
      setCurrentswipe("");
      console.log("match with " + datingProfilesObj[currentProfileIndex]?.name);
      setMatchModalVisible(true);
    } else {
      setCurrentswipe("");
    }
  }, [datingProfilesObj[currentProfileIndex]?.liked, currentswipe]);

  return (
    <View style={styles.HomeView}>
      <BookMark
        isVisible={isModalVisible}
        toggleModal={toggleModal}
        img={datingProfilesObj[currentProfileIndex]?.bookmark}
        name={datingProfilesObj[currentProfileIndex]?.name}
      />
      {isMatchModalVisible && (
        <Match
          isVisible={isMatchModalVisible}
          toggleModal={toggleMatchModal}
          img={datingProfilesObj[currentProfileIndex - 1].bookmark}
        />
      )}

      <View style={styles.ProfileLogo}>
        <AppIcons.Logo />
      </View>

      <Container>
        {datingProfiles
          .map((item, index) => {
            const isFirst = index === 0;
            const panHandlers = isFirst ? panResponder.panHandlers : {};

            return (
              <ProfileCard
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

        <BottomBar handleChoise={handleChoise} handleSave={handleSave} />
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
  HomeView: {
    flex: 1,
    width: "100%",
    height: "100%",
    position: "relative",
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
  },
});
