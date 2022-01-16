import React, { useState, useEffect } from "react";
import {View, Text, TextInput, StyleSheet} from 'react-native'
import normalize from "../utils/normalize";
import Constants from "../utils/constants";
import { EntryTypes } from "../types/components";



export default function Entry(props: EntryTypes) {

    // useEffect(() => {
    //     return(

    //         () => {props.callBack(text, props.title)
    //         console.log("in entry")
    //         }
    //     )
    // }, [])

    const [text, setText] = useState("")

    // const handleChange = (bro : string) => {
    //     props.onChange(bro)
    // }

    
    return(
        <View style={entryStyles.inputContainer}>

                <Text style={entryStyles.textInputHeader}>
                    {props.title}
                </Text>
                <TextInput
                style={entryStyles.textInput}
                secureTextEntry = {props.secureTextEntry}
                placeholder = {props.placeHolder}
                placeholderTextColor = "white"
                keyboardType= {props.keyboardType}
                autoCapitalize="none"
                autoCorrect = {false}

                onChangeText={text => setText(text)}
                // onBlur={() => {
                //     props.callBack(text, props.title)

                // }}
                onEndEditing={() => {
                    props.callBack(text, props.title)

                }}
                // onPressOut={() => {
                //     handleChange(text)
                // }}
                

                />

        </View>
    )
}

const entryStyles = StyleSheet.create({

    inputContainer: {
        paddingBottom: normalize.setNormalize(50)
    },

    textInputHeader: {

        color: Constants.THEME_COLOR.blue,
        paddingLeft: normalize.setNormalize(15),
        paddingBottom: normalize.setNormalize(5)

    },

    textInput: {
        backgroundColor: Constants.THEME_COLOR.green,
        borderRadius: normalize.setNormalize(50),
        borderWidth: normalize.setNormalize(4),
        borderColor: Constants.THEME_COLOR.blue,
        height: normalize.setNormalize(40),
        width: normalize.setNormalize(300),
        paddingLeft: normalize.setNormalize(15),
        fontSize: normalize.setNormalize(12),
        color: 'white'
    },

   
})