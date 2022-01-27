import React, { useEffect, useRef, useState } from "react";
import {View, Text, StyleSheet, Animated, Touchable, FlatList, ScrollView, RefreshControl, KeyboardAvoidingView, TouchableOpacity, Modal, TextInput, Keyboard  } from 'react-native'
import StockContainer from "../components/StockContainer";
import { Stock } from "../data/stock";
import apiConfig from "../../api.config";
// import { percentChange } from "../hooks/percentChange";
import { dStock } from "../types/data";
import { auth } from "../../firebase-config";
import normalize from "../utils/normalize";
import GlobalStyles from "../utils/GlobalStyles";
import GraphicUnderlay from "../components/GraphicUnderlay";
import { EvilIcons, Feather } from "@expo/vector-icons";
import Graphic from "../components/Graphic";
import SearchContainer from "../components/searchContainer";
import { Data } from "../data/data";
import Header from "../components/Header";

import {VictoryChart, VictoryLine} from 'victory-native'



//Text displayed when user presses info icon
const modalText = (text : string) => {
    return(
        <View 
        style = {
            {
                flexDirection: 'row', 
                justifyContent: 'center',
                paddingHorizontal: normalize.setNormalize(24),
                alignItems: 'flex-start'
            }
        }>
            <EvilIcons 
            name="eye" 
            size={normalize.setNormalize(25)} 
            color="white" />

            <Text 
            style = {[stockStyles.modalText]}>
                {text}
            </Text>

        </View>
        
    )
}

//Timer for refreshing
const wait = (timeout : number) => {
    return new Promise(resolve => setTimeout(resolve, timeout))
}

function Stocks() {

    //Hooks
    //Stock symbol that is inputed into search bar
    const [stockSymbol, setStockSymbol] = useState('');

    const [loading, setLoading] = useState(true)
    const [searchData, setSearchData] = useState<dStock[] | undefined>([])
    const [allSearchData,setAllSearchData] = useState<dStock[] | undefined>([])

     //Whether search bar components should be shown
     const [visible, setVisible] = useState(false);

      //Displaying info modal
      const [displayInfoOne, setDisplayInfoOne] = useState(false)

       //Whether the user tried refreshing the screen
    const [refreshing, setRefreshing] = useState(false)

    const [trendingData, setTrendingData] = useState<dStock[]>([])



      

    const animatedValue = useRef(new Animated.Value(99)).current

       //Called when user refreshes screen
       const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        // getTrending();
        wait(1000).then(() => setRefreshing(false))
    }, [])

    const onRender = (stock : dStock) => {

        if(!visible) {

            return (
                <StockContainer
                stock = {stock.stock}
                key = {stock.stock.sName}
                />
            )
        } 

        return (
            <SearchContainer
            stock={stock.stock}
            key = {stock.stock.sName}
            />
        )

        

    }


    const InfoModal = () => {
        return (
            <Modal
                visible = {displayInfoOne}
                presentationStyle = "overFullScreen"
                animationType = 'fade' 
                >
                    {/*
                    Allows user to press anywhere on the screen to dismiss the modal
                    */}
                    <View 
                    style = {
                        {
                            flex:1,
                            backgroundColor: 'black'
                        }
                    }
                   
                    >
                       <View 
                       style={stockStyles.modalScreenContainer}>
                            <View 
                            style = {
                                {
                                    flexDirection: 'row', 
                                    alignItems: 'center'
                                }
                            }>
                                <Text 
                                style={stockStyles.modalText}>
                                   {'Hello and welcome to   '}
                                </Text>

                                <Text 
                                style = {
                                    [stockStyles.modalText, 
                                    {fontWeight: '800', fontSize: normalize.setNormalize(20)}]
                                }>
                                    Stock Watch!
                                </Text>

                            </View>
                          

                            <View style={stockStyles.modalGraphicContainer}>

                                <Graphic
                                scale = {0.6}
                                />

                            </View>

                            <View 
                            style = {
                                {
                                    paddingTop: normalize.setNormalize(100), 
                                    flex:1, 
                                    justifyContent: 'center',
                                    marginHorizontal: normalize.setNormalize(80)
                                }
                            }>

                                {modalText('Keep track of the hottest stocks by visiting the Trending Page.')}
                                {modalText('The number under the stock ticker is the number of times a stock has been searched on the app.')}
                                {modalText('All data provided is real.')}
                                {modalText('Add stocks to your library by pressing the plus icon on the stock\'s display page!')}
                                {modalText('Remove stocks from your library by swiping left on the stock and pressing the red X')}

                                <TouchableOpacity
                                style={stockStyles.modalButtonContainer}
                                onPress = {
                                    () => {
                                        setDisplayInfoOne(false)
                                    }   
                                }>
                                    <Feather 
                                    name="thumbs-up" 
                                    size={normalize.setNormalize(24)} 
                                    color="white" 
                                    />

                                </TouchableOpacity>
                            </View>
                       </View>

                    </View>

                </Modal>
        )
    }

    

    

    useEffect(() => {
       Data.getTrending().then(response => 
            Data.percentGain(response, true).then(response => {
                if(response != undefined) {
                   setTrendingData(response)
                }
            })
        )

        Data.allStocks().then(response => 

           { setSearchData(response)
            setAllSearchData(response)}

        )
        
    }, [])

    //Shrinking animation
    const animate = () => {
        //Whether I should close the animation when the user leaves the screen
        Animated.timing(animatedValue, {
            toValue: 82,
            duration: 100,
            useNativeDriver: false
        }).start()
    }

    //Expanding animation
    const animateIncreaseWidth = () => {
        Animated.timing(animatedValue, {
            toValue: 99,
            duration: 100,
            useNativeDriver: false
        }).start()
    }

    //Width of the animated searchbox 
    const width = animatedValue.interpolate({
        inputRange: [0, 100],
        outputRange: ['0%', '100%'],
    })

    const stockComponents = () => {
        let data : dStock[] | undefined = []

        if(!visible) {

            data = trendingData

        } else {
            data = searchData
        }

        if(data != undefined)

        return(data.map(stock => {
            return onRender(stock)
        }))
    }

    const filterTickers = (searchData : dStock[] | undefined) => {
        if(searchData) {
            setSearchData(searchData.filter(value =>  value.stock.sName.replace(/Technologies|Technology/g, "").includes(stockSymbol)))

        }
    }

    useEffect(() => {

        filterTickers(allSearchData)

    }, [stockSymbol])

    return (

        //Container for whole screen
        //Allows user to view full list of data when keyboard is up
        <KeyboardAvoidingView 
        style = {GlobalStyles.homePageContainer}
        keyboardVerticalOffset = {10}
        behavior = 'padding'
        
        >
           
            
            {/*
            Graphic that is displayed under trending 
             */}
           
            <GraphicUnderlay
            top = {60}
            />
                
            {/*
            Scroll View for the whole page, allows trending title and info icon to scroll.
            StickyHeaderIndices - keeps the search bar at the top of the page when the user scrolls.
            KeyboardSouldPersistTaps - Allows user to press on button when the keyboard is up.
            KeyboardDismissMode - Dismisses keyboard when the user drags
             */}
            <ScrollView
            stickyHeaderIndices = {[2]}
            showsVerticalScrollIndicator = {false}
            keyboardShouldPersistTaps='always'
            keyboardDismissMode = 'on-drag'
            refreshControl = {
                <RefreshControl
                refreshing = {refreshing}
                onRefresh = {onRefresh}
                progressBackgroundColor = 'red'
                title = 'REFRESHING'
                titleColor = 'white'
                />
            }
            >

                {/*
                Information page
                */}
                <InfoModal/>
                

                {/*
                Trending title and info button container
                */}
               <Header
               title = "Trending"
               icon = "info-outline"
               onPress={() => {setDisplayInfoOne(true)}}
               />

                {/*
                Container for search bar and cancel button (without it sticky header indices messes up)
                */}
                <View>

                    {/*
                    Actual container for search bar and cancel button
                    */}
                    <View 
                    style = {
                        {
                            paddingTop: normalize.setNormalize(10),
                            paddingBottom: normalize.setNormalize(15), 
                            backgroundColor: 'rgba(0, 0, 0, 0.8)', 
                            flexDirection: 'row', 
                            alignItems: 'center'
                        }
                    }>
             
                        {/*
                        Allows me to shirnk/expand the search bar
                        */}
                        <Animated.View 
                        style = {
                            [GlobalStyles.searchBarContainer, 
                            { width: width }]
                        }>
                            
                            {/*
                            Search bar
                            */}
                            <TextInput
                            style = {
                                {
                                    backgroundColor: 'gray', 
                                    height: normalize.setNormalize(32), 
                                    width: '100%', 
                                    borderRadius: normalize.setNormalize(10), 
                                    paddingLeft: normalize.setNormalize(20), 
                                    fontSize: normalize.setNormalize(14), 
                                    fontWeight: 'bold',
                                    color: 'white'
                                }}

                            spellCheck = {false}
                            placeholderTextColor = 'white'
                            placeholder = {"Search"}
                            selectionColor = 'white'       
                            clearButtonMode = "always" 

                            value = {stockSymbol}
                            
                            //When the user clicks on the search bar, show the animation
                            onFocus = {() => {
                                animate()
                            }}

                            
                            
                            //Update the stock hook and show the stock page when the user types
                            onChangeText = {val => {
                                setStockSymbol(val)     
                                setVisible(true)
                            }}

                            
                            />

                        </Animated.View>

                        {/* 
                        Cancel button
                         */}
                        <TouchableOpacity

                        //When the cancel button is press display the trending page, expand animation, and dismiss the keyboard
                        onPress = {() => {
                        setVisible(false)
                        animateIncreaseWidth()
                        Keyboard.dismiss()
                        setStockSymbol('')
                        }}

                        style = {
                            { 
                                alignItems: 'flex-end', 
                                width: normalize.setNormalize(70)
                            }}>

                            <Text 
                            style = {
                                {
                                    color: 'gray', 
                                    fontSize: normalize.setNormalize(16)
                                }}>
                                    Cancel
                            </Text>

                        </TouchableOpacity>
                    </View>
                </View>
               
               {/*
               Either trending page or stock page
                */}
                {stockComponents()}

                </ScrollView>
            </KeyboardAvoidingView>
        )
    }

export default Stocks;

const stockStyles = StyleSheet.create({

    modalText: {
        color: 'white',
        textAlign: 'center',
        fontSize: normalize.setNormalize(14),
        paddingLeft: normalize.setNormalize(10)
    },

    modalButtonContainer: {
        justifyContent: 'space-evenly', 
        alignItems: 'center', 
        flexDirection: 'row', 
        backgroundColor: 'gray', 
        borderRadius: normalize.setNormalize(30), 
        padding: normalize.setNormalize(16)
    },

    modalScreenContainer: {
        flex:1, 
        alignItems: 'center', 
        marginTop: normalize.setNormalize(50), 
        marginHorizontal: normalize.setNormalize(16)
    },

    modalGraphicContainer: {
        height: normalize.setNormalize(200),
        width: '100%', 
        paddingTop: normalize.setNormalize(100)
    }
})
