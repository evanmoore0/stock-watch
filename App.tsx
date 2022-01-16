// import { StatusBar } from 'expo-status-bar';
// import { SafeAreaProvider } from 'react-native-safe-area-context';
import {View, Text, AppState} from 'react-native'
import {VictoryBar} from 'victory-native'
import Navigation from './src/navigation'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { useEffect, useRef, useState } from 'react';
import { auth } from './firebase-config';

// import useCachedResources from './hooks/useCachedResources';
// import useColorScheme from './hooks/useColorScheme';
// import Navigation from './navigation';

export default function App() {
  
  return(
    <SafeAreaProvider>
      <Navigation/>
    </SafeAreaProvider>
  )
}
