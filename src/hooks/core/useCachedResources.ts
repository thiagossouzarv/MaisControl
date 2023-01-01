import { FontAwesome } from '@expo/vector-icons';
import * as Font from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useState } from 'react';

export const AppFonts = {
    roboto: "roboto",
    robotoBold: "roboto-bold",
    robotoCondensed: "roboto-condensed",
    robotoCondensedBold: "roboto-condensed-bold",
    openSans: "open-sans",
    openSansBold: "open-sans-bold",
    openSansSemiBold: "open-sans-semi-bold",
    spaceMono: "space-mono",
    latoBlack: "lato-black"
}

export default function useCachedResources() {
  const [isLoadingComplete, setLoadingComplete] = useState(false);

  // Load any resources or data that we need prior to rendering the app
  useEffect(() => {
    async function loadResourcesAndDataAsync() {
      try {
        SplashScreen.preventAutoHideAsync();

        // Load fonts
        await Font.loadAsync({
          ...FontAwesome.font,
          [AppFonts.roboto]: require('../../assets/fonts/Roboto-Regular.ttf'),
          [AppFonts.robotoBold]: require('../../assets/fonts/Roboto-Bold.ttf'),
          [AppFonts.robotoCondensed]: require('../../assets/fonts/RobotoCondensed-Regular.ttf'),
          [AppFonts.robotoCondensedBold]: require('../../assets/fonts/RobotoCondensed-Bold.ttf'),
          [AppFonts.openSans]: require('../../assets/fonts/OpenSans-Regular.ttf'),
          [AppFonts.openSansBold]: require('../../assets/fonts/OpenSans-Bold.ttf'),
          [AppFonts.openSansSemiBold]: require('../../assets/fonts/OpenSans-SemiBold.ttf'),
          [AppFonts.spaceMono]: require('../../assets/fonts/SpaceMono-Regular.ttf'),
          [AppFonts.latoBlack]: require('../../assets/fonts/Lato-Black.ttf'),
        });
      } catch (e) {
        // We might want to provide this error information to an error reporting service
        console.log(e);
      } finally {
        setLoadingComplete(true);
        //SplashScreen.hideAsync();
      }
    }

    loadResourcesAndDataAsync();
  }, []);

  return isLoadingComplete;
}
