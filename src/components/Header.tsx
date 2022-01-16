import {View, Text, TouchableOpacity} from 'react-native'
import normalize from '../utils/normalize'
import React from 'react'
import { MaterialIcons } from '@expo/vector-icons'
import {HeaderTypes } from '../types/components'

const Header = ({title, icon, onPress} : HeaderTypes) => {
    return(
         <View 
            style = {
                {
                    width: '100%', 
                    flexDirection: 'row', 
                    justifyContent: 'space-between'
                }
            }>

                {/*
                Trending title
                */}
                <Text 
                style = {
                    {
                        color:'white', 
                        fontWeight: 'bold'
                    }
                }>
                    {title}
                </Text>

                {/*
                Info button
                */}
                <TouchableOpacity
                onPress = {onPress}>
                    <MaterialIcons 
                    name={icon}
                    size={normalize.setNormalize(24)} 
                    color="white" 
                    />
                </TouchableOpacity>
                
            </View>
    )
}

export default Header