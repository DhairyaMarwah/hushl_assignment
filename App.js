import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React, { useEffect, useState } from "react";
import * as Font from "expo-font";
import Home from "./screens/screenRoutes/Home";
import CustomSplashScreen from "./screens/Splash/CustomSplashScreen";
import GetStarted from "./screens/screenRoutes/GetStarted";
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
  const [splashVisible, setSplashVisible] = useState(true);

  const loadFonts = async () => {
    await Font.loadAsync({
      "aeonik-bold": require("./assets/fonts/Aeonik-Bold.otf"),
      "aeonik-light": require("./assets/fonts/Aeonik-Light.otf"),
      "aeonik-medium": require("./assets/fonts/Aeonik-Medium.otf"),
      "aeonik-regular": require("./assets/fonts/Aeonik-Regular.otf"),
    });
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setSplashVisible(false);
    }, 3100);
    return () => clearTimeout(timer);
  }, []);
  useEffect(() => {
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
