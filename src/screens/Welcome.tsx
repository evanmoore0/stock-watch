import React from "react";
import {View, Text, TouchableOpacity} from 'react-native'
import {useNavigation} from '@react-navigation/native'
import {RootStackParamList} from '../navigation/types'
import {NativeStackNavigationProp} from '@react-navigation/native-stack'

type welcomeScreenProp = NativeStackNavigationProp<RootStackParamList, 'Welcome'>

function Welcome() {

    const navigation = useNavigation<welcomeScreenProp>()
    return(
        <View style={{flex:1, backgroundColor: 'blue', justifyContent:'center', alignItems: 'center'}}>

            <TouchableOpacity
            style={{width: 50, height: 50, backgroundColor: 'white'}}
            onPress={()=> {
                navigation.navigate('LoginRegister')
            }}
            >

            </TouchableOpacity>

        </View>
    )
}

export default Welcome