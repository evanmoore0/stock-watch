import React from "react";
import {View} from 'react-native'
import { GraphicUnderlayTypes } from "../types/components";
import normalize from "../utils/normalize";

import Graphic from "./Graphic";
export default function GraphicUnderlay({top} : GraphicUnderlayTypes) {
    return (
        <View
        style = {
            {
                position: 'absolute', 
                top: normalize.setNormalize(top), 
                width: '100%', 
                height: normalize.setNormalize(800), 
                opacity: 0.06, 
                backgroundColor:'black',
                zIndex: 0
            }
        }>
            <Graphic
            scale = {1.4}
            />
        </View>
    )
}

