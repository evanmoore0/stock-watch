import { Animated, StyleProp, ViewStyle } from "react-native"
import { KeyboardTypeOptions } from "react-native"

export type GraphicBarTypes = {
    height : number
    color : string
    padding : number
    scale : number
    delay : number
}


export type GraphicTypes = {
    scale : number
}

export type EntryTypes = {
    title : string
    placeHolder: string
    keyboardType : KeyboardTypeOptions
    secureTextEntry : boolean
    callBack : (value: string, input: string) => void
    // onChange : (value: string) => void

}

export type TextChange = {
    text: string, 
    setText: React.Dispatch<React.SetStateAction<string>>

}


export type HeaderTypes = {
    title: string,
    icon: "settings" | "info-outline",
    onPress: () => void
}


export type GraphicUnderlayTypes = {
    top: number
}




