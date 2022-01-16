import React, { FC, useEffect, useState } from "react";
import { TouchableOpacity, View, Text} from "react-native";
import Graphic from "../components/Graphic";
import {VictoryLine, VictoryChart} from 'victory-native'
import normalize from "../utils/normalize";
import { useLinkProps, useNavigation } from "@react-navigation/native";

import {auth} from '../../firebase-config'
import { onAuthStateChanged } from "firebase/auth";


const Loading: FC = () => {

    const navigation = useNavigation()


    // const isAuth = (user: any) => {
       
    //     // console.log(auth.currentUser?.uid)
       
    //     console.log("USERS SL:DFJS")
    //     // console.log(getAuth())

    //         if(user) {
    //             navigation.navigate("TabStack")
    //         } else {
    //             navigation.navigate("Welcome")
    //         }
    //     }
    
    useEffect(() => {

        // const subscribe = onAuthStateChanged(auth, isAuth)
        // return subscribe

    }, [])



    return(
        <View style={{flex:1}}>
            <VictoryChart>
                <VictoryLine/>
            </VictoryChart>
        </View>
    )
}

export default Loading
