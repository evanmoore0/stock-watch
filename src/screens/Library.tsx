import React, { useEffect, useState } from "react";
import {View, Text} from 'react-native'
import { auth } from "../../firebase-config";
import {RootTabScreenProps} from '../types/navigation'

function Library({route, navigation} : RootTabScreenProps<'Library'>) {
    const [bruh, setBruh] = useState("")

    useEffect(() => {
        if(route.params != undefined) {
            setBruh(route.params.stock.sName)
        }
        
    }, [route])
    return(
        <View style={{flex:1, justifyContent:'center', alignItems: 'center', backgroundColor: 'blue'}}>

        <Text
        style={{fontSize: 25}}
        >
            {auth.currentUser?.uid}

        </Text>

    </View>
    )
}

export default Library;