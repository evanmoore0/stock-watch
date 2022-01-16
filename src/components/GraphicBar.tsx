import React, { useState, useEffect, FC } from "react";
import {Animated, View, ViewStyle, } from 'react-native';
import normalize from "../utils/normalize";
import { GraphicBarTypes } from "../types/components";


//Graphic bar for graphic component
const GraphicBar : FC<GraphicBarTypes> = (props) => {

    //Animation values
    const fade = new Animated.Value(0)
    const [translation, setTranslation] = useState<Animated.AnimatedInterpolation>(fade)

    //Grow animation
    const handleAnimation = () => {
        fade.setValue(0)
        
        setTranslation(fade.interpolate({
            inputRange: [0, 1],
            outputRange: [1, 0]
        }))
        Animated.timing(
            fade,
            {
            toValue:1,
            duration: 3000,
            delay: props.delay,
            useNativeDriver: true
            }
        ).start(() => handleAnimationTwo())
    }

    //Shrink animation
   const handleAnimationTwo = () => {
       fade.setValue(0)
       setTranslation(fade.interpolate({
           inputRange: [0,1],
           outputRange: [0,1]
       }))
       Animated.timing(
           fade,
           {
               toValue:1,
               duration: 3000,
               useNativeDriver: true
           }
       ).start()
   }

   //Animate when component mounts
   useEffect(() => {
       handleAnimation()
   }, [])

const animatedCardStyle: Animated.Animated = {
    transform: [{scale: translation}]
    

};

   return(
    <Animated.View
        style={
           
           [animatedCardStyle
            

            ,{top: normalize.setNormalize(props.padding)}]
        }>

            <View 
            style={
                {
                    backgroundColor: props.color,
                    width: normalize.setNormalize(10) * props.scale, 
                    height: normalize.setNormalize(props.height),
                    borderRadius: normalize.setNormalize(40),
            }}>    
        </View>
    </Animated.View>
    )
}

export default GraphicBar;