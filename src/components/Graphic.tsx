import React, {FC} from "react";
import {View} from 'react-native';
import normalize from "../utils/normalize";
import { GraphicTypes } from "../types/components";
import Constants from "../utils/constants";
import GraphicBar from "./GraphicBar";

//Graph graphic displayed throughout the app
const Graphic : FC<GraphicTypes> = (props) => {

    return (
        <View 
        style = {
            {
                flexDirection: 'row', 
                flex:1, 
                justifyContent: 
                'space-between', 
                alignItems: 'center'
            }
        }>
            {/**
             * Each bar on the graphic
             */}
            <GraphicBar
            height = {normalize.setNormalize(62 * props.scale)}
            color = {Constants.THEME_COLOR.green}
            padding = {200 * props.scale}
            scale = {props.scale}
            delay = {0}
            />
            <GraphicBar
            height = {normalize.setNormalize(40 * props.scale)}
            color = {Constants.THEME_COLOR.green}
            padding = {142 * props.scale}
            scale = {props.scale}
            delay = {500}

            />
        <   GraphicBar
            height = {normalize.setNormalize(60 * props.scale)}
            color = {Constants.THEME_COLOR.green}
            padding = {120 * props.scale}
            scale = {props.scale}
            delay = {1000}

            />
            <GraphicBar
            height = {normalize.setNormalize(60 * props.scale)}
            color ={Constants.THEME_COLOR.blue}
            padding = {140 * props.scale}
            scale = {props.scale}
            delay = {1500}

            />
             <GraphicBar
            height = {normalize.setNormalize(60 * props.scale)}
            color = {Constants.THEME_COLOR.green}
            padding = {80 * props.scale}
            scale = {props.scale}
            delay = {2000}

            />
            <GraphicBar
            height = {normalize.setNormalize(30 * props.scale)}
            color ={Constants.THEME_COLOR.green}
            padding = {40 * props.scale}
            scale = {props.scale}
            delay = {2500}
            />
             <GraphicBar
            height = {normalize.setNormalize(70 * props.scale)}
            color = {Constants.THEME_COLOR.green}
            padding = {10 * props.scale}
            scale = {props.scale}
            delay = {3000}

            />
            <GraphicBar
            height = {normalize.setNormalize(80 * props.scale)}
            color ={Constants.THEME_COLOR.blue}
            padding = {60* props.scale}
            scale = {props.scale}
            delay = {3500}

            />
             <GraphicBar
            height = {normalize.setNormalize(32 * props.scale)}
            color = {Constants.THEME_COLOR.blue}
            padding = {90* props.scale}
            scale = {props.scale}
            delay = {4000}

            />
            <GraphicBar
            height = {normalize.setNormalize(50 * props.scale)}
            color ={Constants.THEME_COLOR.blue}
            padding = {110* props.scale}
            scale = {props.scale}
            delay = {4500}

            />
             <GraphicBar
            height = {normalize.setNormalize(80 * props.scale)}
            color = {Constants.THEME_COLOR.green}
            padding = {60* props.scale}
            scale = {props.scale}
            delay = {5000}

            />
            <GraphicBar
            height = {normalize.setNormalize(70 * props.scale)}
            color ={Constants.THEME_COLOR.green}
            padding = {10* props.scale}
            scale = {props.scale}
            delay = {5500}

            />
             <GraphicBar
            height = {normalize.setNormalize(30 * props.scale)}
            color = {Constants.THEME_COLOR.green}
            padding = {-30* props.scale}
            scale = {props.scale}
            delay = {6000}

            />
            <GraphicBar
            height = {normalize.setNormalize(40 * props.scale)}
            color ={Constants.THEME_COLOR.blue}
            padding = {0 * props.scale}
            scale = {props.scale}
            delay = {6500}

            />
             <GraphicBar
            height = {normalize.setNormalize(62 * props.scale)}
            color = {Constants.THEME_COLOR.blue}
            padding = {30* props.scale}
            scale = {props.scale}
            delay = {7000}

            />
            <GraphicBar
            height = {normalize.setNormalize(62 * props.scale)}
            color ={Constants.THEME_COLOR.green}
            padding = {-30* props.scale}
            scale = {props.scale}
            delay = {8000}

            />
             <GraphicBar
            height = {normalize.setNormalize(70 * props.scale)}
            color = {Constants.THEME_COLOR.green}
            padding = {-90* props.scale}
            scale = {props.scale}
            delay = {9000}

            />
            <GraphicBar
            height = {normalize.setNormalize(60 * props.scale)}
            color ={Constants.THEME_COLOR.green}
            padding = {-150* props.scale}
            scale = {props.scale}
            delay = {10000}

            />
             <GraphicBar
            height = {normalize.setNormalize(50 * props.scale)}
            color = {Constants.THEME_COLOR.green}
            padding = {-180* props.scale}
            scale = {props.scale}
            delay = {11000}

            />
            <GraphicBar
            height = {normalize.setNormalize(60 * props.scale)}
            color ={Constants.THEME_COLOR.green}
            padding = {-220* props.scale}
            scale = {props.scale}
            delay = {12000}

            />
        </View>
    )
    
}


export default Graphic;