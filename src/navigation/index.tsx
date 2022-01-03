/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
 import { FontAwesome } from '@expo/vector-icons';
 import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
 import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
 import { createNativeStackNavigator } from '@react-navigation/native-stack';
 import * as React from 'react';
 import { ColorSchemeName, Pressable } from 'react-native';

 //Screens
import Library from '../screens/Library';
import Stocks from '../screens/Stocks';
import StockDisplay from '../screens/StockDisplay';
import Loading from '../screens/Loading';
import LoginAndRegister from '../screens/LoginRegister';
import Welcome from '../screens/Welcome';


 import {RootStackParamList, RootTabParamList, RootTabScreenProps} from '../navigation/types'

 import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';


 
 export default function Navigation() {
   return (
     <NavigationContainer
    //  theme={
    //   {
    //     colors:{
    //       background: "black"
    //     }
    //   }
    //  }  
    >
       <RootNavigator />
     </NavigationContainer>
   );
 }
 
 /**
  * A root stack navigator is often used for displaying modals on top of all other content.
  * https://reactnavigation.org/docs/modal
  */
 const Stack = createNativeStackNavigator<RootStackParamList>();
 
 function RootNavigator() {
   return (
     <Stack.Navigator
     screenOptions={{headerShown: false}}
     >
       <Stack.Screen
       name = "Loading"
       component = {Loading}
       />

       <Stack.Screen
       name = "Welcome"
       component = {Welcome}
       />

       <Stack.Screen
       name = "LoginRegister"
       component = {LoginAndRegister}
       />

       <Stack.Screen
       name = "TabStack"
       component = {TabStackNavigator}
       />
      
     </Stack.Navigator>
   );
 }
 
 /**
  * A bottom tab navigator displays tab buttons on the bottom of the display to switch screens.
  * https://reactnavigation.org/docs/bottom-tab-navigator
  */

 const Tab = createMaterialTopTabNavigator<RootTabParamList>();

 function TabStackNavigator() {
   return(
     <Tab.Navigator>

      <Tab.Screen
       name = "Stocks"
       component = {Stocks}
       />

       <Tab.Screen
       name = "Library"
       component = {Library}
       />

      
       
     </Tab.Navigator>
   )
 }
 
//  function BottomTabNavigator() {
//    const colorScheme = useColorScheme();
 
//    return (
//      <BottomTab.Navigator
//        initialRouteName="TabOne"
//        screenOptions={{
//          tabBarActiveTintColor: Colors[colorScheme].tint,
//        }}>
//        <BottomTab.Screen
//          name="TabOne"
//          component={TabOneScreen}
//          options={({ navigation }: RootTabScreenProps<'TabOne'>) => ({
//            title: 'Tab One',
//            tabBarIcon: ({ color }) => <TabBarIcon name="code" color={color} />,
//            headerRight: () => (
//              <Pressable
//                onPress={() => navigation.navigate('Modal')}
//                style={({ pressed }) => ({
//                  opacity: pressed ? 0.5 : 1,
//                })}>
//                <FontAwesome
//                  name="info-circle"
//                  size={25}
//                  color={Colors[colorScheme].text}
//                  style={{ marginRight: 15 }}
//                />
//              </Pressable>
//            ),
//          })}
//        />
//        <BottomTab.Screen
//          name="TabTwo"
//          component={TabTwoScreen}
//          options={{
//            title: 'Tab Two',
//            tabBarIcon: ({ color }) => <TabBarIcon name="code" color={color} />,
//          }}
//        />
//      </BottomTab.Navigator>
//    );
//  }
 
//  /**
//   * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
//   */
//  function TabBarIcon(props: {
//    name: React.ComponentProps<typeof FontAwesome>['name'];
//    color: string;
//  }) {
//    return <FontAwesome size={30} style={{ marginBottom: -3 }} {...props} />;
//  }
 