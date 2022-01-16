import React, { FC, useEffect, useState } from "react";
import {View, Text, TouchableOpacity} from 'react-native'
import { useNavigation } from "@react-navigation/native";
import {dStock} from '../types/data'
import Constants from "../utils/constants";
import normalize from "../utils/normalize";
import GlobalStyles from "../utils/GlobalStyles";

function StockContainer({stock}: dStock) {
    const navigation = useNavigation()
    const [percentColor, setPercentColor] = useState('white')

    const checkPercentGain = () => {
        if(stock.percentChange <= 0) {
            setPercentColor(Constants.THEME_COLOR.blue)
        } else {
            setPercentColor(Constants.THEME_COLOR.green)
        }
    }

    useEffect(() => {
        checkPercentGain()
    }, [])
    return (
        <TouchableOpacity
        style = {
            {
                paddingBottom: normalize.setNormalize(15)
            }
        }
        onPress = {
            () => {
            navigation.navigate("StockDisplay", {
                    stock:stock
                })
            }
        }>
            <View 
            style = {
                GlobalStyles.stockContainer
            }>
                <View>
                    <Text 
                    style = {
                        {
                            fontSize: Constants.STOCK_NAME_FONT.size,
                            fontWeight: "800", 
                            color: percentColor
                        }}>
                            {stock.sName}
                    </Text>

                    <Text style = {
                        {
                            color: Constants.STOCK_NAME_FONT.tickerColor, 
                            fontSize: Constants.STOCK_NAME_FONT.tickerSize,
                            paddingVertical: normalize.setNormalize(1)
                        }
                    }>
                        {stock.ticker}
                    </Text>

                    <Text style = {
                        {
                            color: 'white', 
                            fontSize: normalize.setNormalize(10)
                        }
                    }>
                        {stock.score}
                    </Text>

                </View>

                    <Text style = {
                        {
                            fontSize: Constants.STOCK_NAME_FONT.tickerSize, 
                            color: percentColor, 
                            fontWeight: "800"
                        }
                    }>
                        {stock.percentChange + " %"}
                    </Text>

                </View>

            </TouchableOpacity>
    )
}

export default StockContainer