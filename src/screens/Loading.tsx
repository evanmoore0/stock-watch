import React from "react";
import {View, Text, TouchableOpacity} from 'react-native'
import {useNavigation} from '@react-navigation/native'
import {RootStackParamList} from '../navigation/types'
import {NativeStackNavigationProp} from '@react-navigation/native-stack'

type loadingScreenProp = NativeStackNavigationProp<RootStackParamList, 'Loading'>

function Loading() {

    const navigation = useNavigation<loadingScreenProp>()
    return(
        <View style={{flex:1, backgroundColor: 'black', justifyContent:'center', alignItems: 'center'}}>

            <TouchableOpacity
            style={{width: 50, height: 50, backgroundColor: 'white'}}
            onPress={()=> {
                navigation.navigate('Welcome')
            }}
            >

            </TouchableOpacity>

        </View>
    )
}

export default Loading