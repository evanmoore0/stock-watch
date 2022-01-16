/**
 * Learn more about using TypeScript with React Navigation:
 * https://reactnavigation.org/docs/typescript/
 */

 import { CompositeScreenProps, NavigatorScreenParams } from '@react-navigation/native';
 import { NativeStackScreenProps } from '@react-navigation/native-stack';
 import { MaterialTopTabScreenProps} from '@react-navigation/material-top-tabs'
import { regAction } from './screens';
import {dStock} from './data'
 
 declare global {
   namespace ReactNavigation {
     interface RootParamList extends RootStackParamList {}
   }
 }
 
 export type RootStackParamList = {
   Loading: undefined;
   Welcome: undefined;
   LoginRegister: regAction;
   StockDisplay: dStock;
   TabStack: NavigatorScreenParams<RootTabParamList> | undefined;
 };
 
 export type RootStackScreenProps<Screen extends keyof RootStackParamList> = NativeStackScreenProps<
   RootStackParamList,
   Screen
 >;
 
 export type RootTabParamList = {
   Stocks: undefined;
   Library: dStock;
   route: undefined
 };
 
 export type RootTabScreenProps<Screen extends keyof RootTabParamList> = CompositeScreenProps<
   MaterialTopTabScreenProps<RootTabParamList, Screen>,
   NativeStackScreenProps<RootStackParamList>
 >;
 