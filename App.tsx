// import { StatusBar } from 'expo-status-bar';
// import { SafeAreaProvider } from 'react-native-safe-area-context';
import {View, Text} from 'react-native'
import {VictoryBar} from 'victory-native'
import Navigation from './src/navigation'

// import useCachedResources from './hooks/useCachedResources';
// import useColorScheme from './hooks/useColorScheme';
// import Navigation from './navigation';

export default function App() {
  // const isLoadingComplete = useCachedResources();
  // const colorScheme = useColorScheme();

  // if (!isLoadingComplete) {
  //   return null;
  // } else {
  //   return (
  //     // <SafeAreaProvider>
  //     //   <Navigation colorScheme={colorScheme} />
  //     //   <StatusBar />
  //     // </SafeAreaProvider>
  //   );
  // }
  return(
    <Navigation/>
  )
}
