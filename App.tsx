import React from 'react';
import * as SplashScreen from 'expo-splash-screen';
import { ThemeProvider } from 'styled-components';

import {
  useFonts,
  Inter_400Regular,
  Inter_500Medium
} from '@expo-google-fonts/inter';
import {
  Archivo_400Regular,
  Archivo_500Medium,
  Archivo_600SemiBold
} from '@expo-google-fonts/archivo';

// import { Home } from './src/screens/Home';
// import { CarDetails } from './src/screens/CarDetails';
// import { Scheduling } from './src/screens/Scheduling';
import { SchedulingDetails } from './src/screens/SchedulingDetails';

import theme from './src/styles/theme';

SplashScreen.preventAutoHideAsync();
export default function App() {

  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Archivo_400Regular,
    Archivo_500Medium,
    Archivo_600SemiBold
  });
  if(fontsLoaded){
    SplashScreen.hideAsync();
  }
  if(!fontsLoaded){
    return null
  }
  return (
    <ThemeProvider theme={theme}>
      {/* <Home /> */}
      {/* <CarDetails /> */}
      {/* <Scheduling /> */}
      <SchedulingDetails />
    </ThemeProvider>
  );
}
