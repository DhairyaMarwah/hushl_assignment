import React, { useCallback, useEffect, useRef, useState } from "react";
import { Animated, PanResponder, StyleSheet, View } from "react-native";
import { ACTION_OFFSET, CARD } from "../../utils/constants";
import { datingProfiles as datingProfilesObj } from "../../data/data";
import { Container } from "../../styles/styles";
import AppIcons from "../../assets/AppIcons";
import BookMark from "../../modals/BookMark";
import Match from "../../modals/Match";
import BottomBar from "../../components/BottomBar/BottomBar";
import ProfileCard from "../../components/ProfileCard";

export default function Home() {
  
  //* State variables
  const swipe = useRef(new Animated.ValueXY()).current;
  const tiltSign = useRef(new Animated.Value(1)).current;
  const [datingProfiles, setdatingProfiles] = useState(datingProfilesObj);
  const [currentProfileIndex, setCurrentProfileIndex] = useState(0);
  const [currentSwipe, setCurrentSwipe] = useState("");
  const [isModalVisible, setModalVisible] = useState(false);
  const [isMatchModalVisible, setMatchModalVisible] = useState(false);

  //* PanResponder to handle user gestures
  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: (e, { dx, dy, y0 }) => {
        // Set tilt sign based on card position
        tiltSign.setValue(y0 > CARD.CARD_HEIGHT / 2 ? 1 : -1);
        swipe.setValue({ x: dx, y: dy });
      },
      onPanResponderRelease: (e, { dx, dy }) =>
        handlePanResponderRelease(dx, dy),
    })
  ).current;

  //* Initial setup, ensuring there are dating profiles
  useEffect(() => {
    if (datingProfiles.length === 0) {
      setdatingProfiles(datingProfilesObj);
    }
  }, [datingProfiles]);

  //* Handle modal visibility timeout
  useEffect(() => {
    if (isModalVisible) {
      setTimeout(() => {
        setModalVisible(false);
      }, 3000);
    }
  }, [isModalVisible]);

  //* Check for a match and handle accordingly
  useEffect(() => {
    handleMatchCheck();
  }, [datingProfilesObj[currentProfileIndex]?.liked, currentSwipe]);

  //* Handle release of the gesture
  const handlePanResponderRelease = (dx, dy) => {
    const direction = Math.sign(dx);
    const userAction = Math.abs(dx) > ACTION_OFFSET;

    if (userAction) {
      //* Animate the card based on the user's swipe
      Animated.timing(swipe, {
        duration: 200,
        toValue: {
          x: direction * CARD.CARD_OUT_WIDTH,
          y: dy,
        },
        useNativeDriver: true,
      }).start(() => {
        //* Set currentSwipe based on the direction of the swipe
        setCurrentSwipe(direction === 1 ? "liked" : "notliked");
        transitionNext();
      });
    } else {
      //* If the swipe is not significant, spring back to the center
      Animated.spring(swipe, {
        friction: 5,
        toValue: {
          x: 0,
          y: 0,
        },
        useNativeDriver: true,
      }).start();
    }
  };

  //* Transition to the next card in the stack
  const transitionNext = useCallback(() => {
    setdatingProfiles((prevState) => {
      setCurrentProfileIndex((prevIndex) => prevIndex + 1);
      return prevState.slice(1);
    });
    swipe.setValue({ x: 0, y: 0 });
  }, [swipe]);

  //* Handle user's choice (like, dislike, super like)
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

  //* Save the current profile to bookmarks
  const handleSave = () => {
    setModalVisible(true);
  };

  //* Toggle match modal visibility
  const toggleMatchModal = () => {
    setMatchModalVisible(!isMatchModalVisible);
  };

  //* Toggle general modal visibility
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  //* Check if there is a match and show the match modal
  const handleMatchCheck = () => {
    const liked = datingProfilesObj[currentProfileIndex]?.liked;
    if (liked === true && currentSwipe === "liked") {
      console.log("match with " + datingProfilesObj[currentProfileIndex]?.name);
      setMatchModalVisible(true);
    }
    setCurrentSwipe("");
  };

  return (
    <View style={styles.HomeView}>
      {/* Bookmark modal */}
      <BookMark
        isVisible={isModalVisible}
        toggleModal={toggleModal}
        img={datingProfilesObj[currentProfileIndex]?.bookmark}
        name={datingProfilesObj[currentProfileIndex]?.name}
      />
      {/* Match modal */}
      {isMatchModalVisible && (
        <Match
          isVisible={isMatchModalVisible}
          toggleModal={toggleMatchModal}
          img={datingProfilesObj[currentProfileIndex - 1].bookmark}
        />
      )}
      {/* App logo */}
      <View style={styles.ProfileLogo}>
        <AppIcons.Logo />
      </View>
      {/* Container for profile cards and bottom bar   */}
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

        {/* Bottom navigation bar  */}
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
