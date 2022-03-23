import React, { FC, useEffect, useState } from "react";
import { TouchableOpacity, View, StyleSheet, ActivityIndicator} from "react-native";
import Graphic from "../components/Graphic";
import {VictoryBar, VictoryChart, VictoryLine, VictoryTheme} from 'victory-native'
import normalize from "../utils/normalize";
import { useLinkProps, useNavigation } from "@react-navigation/native";

import {auth} from '../../firebase-config'
import { onAuthStateChanged } from "firebase/auth";
import { VictoryBarProps } from "victory-bar";
import { VictoryCommonPrimitiveProps, VictoryDatableProps } from "victory-core";

import { BarProps } from "victory-bar";
import Navigation from "../navigation";


const Loading: FC = () => {

    const navigation = useNavigation()

    const [victoryBruv, setVictory] = useState<VictoryBarProps['data']>([{x:1, y:1}])

    const [loading,setLoading] = useState(true)


    const isAuth = () => {
       
        // console.log(auth.currentUser?.uid)
       
        console.log("USERS SL:DFJS")
        // console.log(getAuth())

        auth.onAuthStateChanged((user) => {
            if(user) {
                navigation.navigate("TabStack")
            } else {
                navigation.navigate("Welcome")
            }
         })
        }
    
    useEffect(() => {


        isAuth()
    }, [])



    return(
        <View style={{justifyContent: 'center', alignItems: 'center', flex:1}}>
            <ActivityIndicator
            size={'large'}
            color={'red'}
            >


            </ActivityIndicator>
        </View>
    )
}

export default Loading

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "#f5fcff"
    }
  });
