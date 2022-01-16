import React from "react";
import {View,Text, TouchableOpacity, Keyboard} from 'react-native'

import {useNavigation} from '@react-navigation/native'

import normalize from "../utils/normalize";
import { dStock } from "../types/data";
import { Stock } from "../data/stock";
import Constants from "../utils/constants";
import GlobalStyles from "../utils/GlobalStyles";

//Component that is displayed when user searches a stock
function SearchContainer({stock} : dStock) {

    //Not in navigation container, so must use useNavigation prop
    const navigation = useNavigation()

    return(

        //Wrap in touchable opacity so user can click whole component
        <TouchableOpacity
        onPress = {
            () => {
                Keyboard.dismiss()
            //Navigate to stock display page
                navigation.navigate("StockDisplay", {
                    stock: stock
                })
            }
        }>
            {/**
             * Container for text/ border
             */}
            <View 
            style = {
            [GlobalStyles.stockContainer, 
                {
                    backgroundColor: 'black', 
                    borderRadius: 0, 
                    borderBottomColor: 'rgba(256,256,256,0.3)', 
                    borderBottomWidth: normalize.setNormalize(1)
                }
            ]
            }>

                <View>
                    <Text 
                    style = {
                        {
                            fontSize: 12,
                            fontWeight:'800', 
                            color: Constants.THEME_COLOR.green, 
                            flexWrap: 'wrap'
                        }
                    }>
                            {stock.sName}

                    </Text>

                    <Text 
                    style = {
                        {
                            color: Constants.STOCK_NAME_FONT.tickerColor, 
                            fontSize: Constants.STOCK_NAME_FONT.tickerSize
                        }
                    }>
                        {stock.ticker}
                    </Text>

                </View>
                
            </View>



        </TouchableOpacity>
    )
}

export default SearchContainer;