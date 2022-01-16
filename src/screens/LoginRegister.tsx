import React, { FC, useEffect, useState } from "react";
import {View, Text, TouchableOpacity, ScrollView, StyleSheet, TextInput} from 'react-native'
import { RootStackParamList, RootStackScreenProps, RootTabScreenProps } from "../types/navigation";
import { handleRegister } from "../hooks/handleRegister";
// import Entry from "../components/Entry";
import normalize from "../utils/normalize";
import Constants from "../utils/constants";
import { EntryTypes } from "../types/components";
import { SafeAreaView } from "react-native-safe-area-context";
import Graphic from "../components/Graphic";
import { Ionicons } from '@expo/vector-icons';
import Entry from "../components/Entry";



function LoginAndRegister({route, navigation} : RootStackScreenProps<'LoginRegister'>) {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    // const [text, setText] = useState(
    //     ""
    // )

    // const setText = (auth : TextChange) => {

    //     auth.setText(auth.text)
       

    // }

    // const Entry = (props : EntryTypes) => {
    //     const [text, setText] = useState("")

    //     useEffect(() => {
    //         return( () => {
    //             setEmail(text)
    //             console.log("in useEefec")
    //             console.log(email)
    //         }
                
    //         )
    //     }, [])
    //     return(
    //         <View style={entryStyles.inputContainer}>

    //             <Text style={entryStyles.textInputHeader}>
    //                 {props.title}
    //             </Text>
    //             <TextInput
    //             style={entryStyles.textInput}
    //             secureTextEntry = {props.secureTextEntry}
    //             placeholder = {props.placeHolder}
    //             placeholderTextColor = "white"
    //             keyboardType= {props.keyboardType}
    //             autoCapitalize="none"
    //             autoCorrect = {false}

    //             onChangeText={text => setText(text)}
              
                

    //             />

    //     </View>
    //     )
    // }

    // const handleChange = (value: string) => {
    //     setEmail(value)
    // }
    // useEffect(() => {
    //     console.log("hi")
    // }, [])

//     const LoginReg = () => {
//         if(route.params.action == "register") {
//             return(
//             <ScrollView style={{flex:1}}
//             keyboardDismissMode="interactive"
//             contentContainerStyle = {{justifyContent:'center', alignItems: 'center' }}
//             >
//                 {/* <Text style={{color:'white'}}>
//                     Ha reg biotch
//                 </Text>
                

//                 <TouchableOpacity style={{width: 50, height: 50, backgroundColor: 'red'}}
//                 onPress={() => handleRegister('brevin@gmail.com', 'asdfasdf', 'asdfasdf')}
//                 >

//                 </TouchableOpacity> */}

//                 <Entry
//                 title = "enter"
//                 placeHolder = "enter email"
//                 keyboardType = "email-address"
//                 secureTextEntry = {false}

//                 // onChange = {handleChange}

//                 />

//                 <TouchableOpacity style={{width: 50, height: 50, backgroundColor: 'red'}}
//                 onPress={() => handleRegister('brevin@gmail.com', 'asdfasdf', 'asdfasdf')}
//                 >

//                 </TouchableOpacity>

// {/* <Entry
//                 title = "enter"
//                 placeHolder = "enter email"
//                 keyboardType = "email-address"
//                 secureTextEntry = {false}

//                 onChange = {handleChange}

//                 /> */}

//                 <View style={{width: '100%', justifyContent: 'center', alignItems: 'center'}}>
//                     <Text style={{fontSize: 30, color: 'white'}}>
//                         {email}
//                     </Text>
//                 </View>

//             </ScrollView>)
//         } else {
//             return(<View style={{justifyContent:'center', alignItems: 'center', flex:1}}>
//                 <Text style={{color:'white'}}>
//                     Ha login biotch
//                 </Text>

//                 <TouchableOpacity style={{width: 50, height: 50, backgroundColor: 'green'}}>

//                 </TouchableOpacity>
//             </View>)
//         }
//     }

    const bruv = (value : string, input : string) => {

        if(input == "email") {

            console.log("SET EMAIL")
            

            setEmail(value)


        } else if (input == "password") {

            console.log("SET PASS")

            setPassword(value)
            
        } else {

            console.log("Confirm pass")
            setConfirmPassword(value)
        }

    }

    // useEffect(() => {
    //     console.log("WTF")
    //     return(() => {
    //         console.log("EMali")
    //         console.log(email)
    //         console.log("pas")
    //         console.log(password)
    //         console.log("confi")
    //         console.log(confirmPassword)

    //     })
    // }, [])

    const confirmPass = () => {
        if(route.params.action == "Register") {
            return (
                <Entry
                title = "confirm password"
                placeHolder = "re-enter password"
                keyboardType = "visible-password"
                secureTextEntry = {true}
                callBack={bruv}
                
                />
            )
        } else {
            return 
        }
    }
    
    return(
        <SafeAreaView style={{flex:1}}>

            <ScrollView style={{flex:1}}
            keyboardDismissMode="interactive"
            contentContainerStyle = {{justifyContent:'center', alignItems: 'center' }}
            >
                {/* <Text style={{color:'white'}}>
                    Ha reg biotch
                </Text>
                

                <TouchableOpacity style={{width: 50, height: 50, backgroundColor: 'red'}}
                onPress={() => handleRegister('brevin@gmail.com', 'asdfasdf', 'asdfasdf')}
                >

                </TouchableOpacity> */}
                <TouchableOpacity style={{width: '100%', flexDirection: 'row', alignItems: 'center'}}
                onPress={() => {
                    navigation.goBack()
                }}
                >
                    <Ionicons 
                    name="chevron-back-outline" 
                    size={normalize.setNormalize(30)} 
                    color="white" 
                    />
                    <Text style={{fontSize: normalize.setNormalize(20), color: 'white', fontWeight: '700'}}>
                        {route.params.action}
                    </Text>

                </TouchableOpacity>
            
                <View style={{height: normalize.setNormalize(55), width: '100%', paddingTop: normalize.setNormalize(50)}}>

                    <Graphic
                    scale = {0.3}

                />
                </View>

                <View style={entryStyles.entryContainer}>
                <Entry
                title = "email"
                placeHolder = "enter email"
                keyboardType = "email-address"
                secureTextEntry = {false}
                callBack={bruv}

                // onChange = {handleChange}

                />
                <Entry
                title = "password"
                placeHolder = "enter password"
                keyboardType = "default"
                secureTextEntry = {true}
                callBack={bruv}

                // callBack={setEmail()}


                />

                {confirmPass()}

                </View>

               

                <TouchableOpacity style={{width: 50, height: 50, backgroundColor: 'red'}}
                onPress={() => 
                    {
                        if(route.params.action == "Register") {
                            handleRegister(email, password, confirmPassword)
                        
                        } else {

                        }
                    }
                }
                >

                </TouchableOpacity>

{/* <Entry
                title = "enter"
                placeHolder = "enter email"
                keyboardType = "email-address"
                secureTextEntry = {false}

                onChange = {handleChange}

                /> */}

                <View style={{width: '100%', justifyContent: 'center', alignItems: 'center'}}>
                    <Text style={{fontSize: 30, color: 'white'}}>
                        {email}
                    </Text>
                </View>

            </ScrollView>

        </SafeAreaView>
    )
}

export default LoginAndRegister;

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
    entryContainer: {
        width: '100%',
        paddingTop: normalize.setNormalize(45),
        justifyContent: 'center',
        alignItems: 'center'
    },

   
})