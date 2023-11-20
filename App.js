import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React, { useEffect, useState } from "react";
import {
  useFonts,
  Poppins_300Light,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_600SemiBold,
  Poppins_700Bold,
} from "@expo-google-fonts/poppins";
import * as Font from "expo-font";
import Home from "./screens/Home";
import CustomSplashScreen from "./screens/CustomSplashScreen";
import GetStarted from "./screens/GetStarted";
const Stack = createNativeStackNavigator();

const screens = [
  {
    name: "GetStarted",
    component: GetStarted,
    options: { headerShown: false },
  },
  { name: "Home", component: Home, options: { headerShown: false } },
];

export default function App() {
  const [fontsLoaded] = useFonts({
    Poppins_300Light,
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_600SemiBold,
    Poppins_700Bold,
  });

  const loadFonts = async () => {
    await Font.loadAsync({
      "aeonik-bold": require("./assets/fonts/Aeonik-Bold.otf"),
      "aeonik-light": require("./assets/fonts/Aeonik-Light.otf"),
      "aeonik-medium": require("./assets/fonts/Aeonik-Medium.otf"),
      "aeonik-regular": require("./assets/fonts/Aeonik-Regular.otf"),
    });
  };
  const [splashVisible, setSplashVisible] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => {
      setSplashVisible(false);
    }, 3100);
    return () => clearTimeout(timer);
  }, []);
  useEffect(() => {
    // Load fonts when the component mounts
    loadFonts();
  }, []);

  if (splashVisible) {
    return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Splash"
            component={CustomSplashScreen}
            options={{
              headerShown: false,
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={"GetStarted"}>
        {screens.map((screen, index) => (
          <Stack.Screen key={index} {...screen} />
        ))}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
