import { Ionicons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import {View, Text, TouchableOpacity, ScrollView, ActivityIndicator, Alert, FlatList, Linking, Image, StyleSheet} from 'react-native'
import { RootStackParamList, RootStackScreenProps, RootTabScreenProps } from "../types/navigation";
import Constants from "../utils/constants";
import normalize from "../utils/normalize";


import { VictoryVoronoiProps } from "victory-voronoi";
import { VictoryCursorContainerNativeProps } from "victory-native/src/components/victory-cursor-container";
import apiConfig from "../../api.config";

import {createContainer, VictoryLine} from 'victory-native'

// import {VictoryC} from 'victory-native'


function StockDisplay({route, navigation}: RootStackScreenProps<'StockDisplay'>) {

    //Background color of stock buttons
    const [color, setColor] = useState(['#6AB664', 'black', 'black', 'black', 'black'])

    const [loading, setLoading] = useState(true)

        //Data for the stock from polygon API
        const [infoData, setInfoData] = useState([])

    //Text color of stock buttons
    const [textColor, setTextColor] = useState(['white', '#6AB664', '#6AB664', '#6AB664', '#6AB664'])

      //Container cursor/voronoi container for graph
      const Container = createContainer<VictoryCursorContainerNativeProps, VictoryVoronoiProps>("voronoi", "cursor")

      const [open, setOpen] = useState(0)
    
    const [graphData, setGraphData] = useState<{x:number, y: number}[]>([])

    const [dayData, setDayData] = useState<{x:number, y: number}[]>([])
    const [weekData, setWeekData] = useState<{x:number, y: number}[]>([])
    const [monthData, setMonthData] = useState<{x:number, y: number}[]>([])
    const [yearData, setYearData] = useState<{x:number, y: number}[]>([])


    //Displays info data
    const infoDataDisplay = (label : string, index : number) => {
        return(
            <View style={stockDisplayStyles.infoDataContainer}>
                    <Text style={stockDisplayStyles.tableText}>{label + ":"}</Text>
                    <Text style={{color: 'white', fontSize: normalize.setNormalize(13)}}>{checkInfoData(infoData[index])}</Text>
            </View>
        )
    }

    //If missing data in info set the text to be No Data
    const checkInfoData = (result : string) => {
        if(result == undefined) {
            return "No Data"
        } else {
            return result
        }
    }


        //Sets the text color/ background color of a stock button
        const handleColor = (i : number) => {

            let tempColor = ['black', 'black', 'black', 'black', 'black']
            let tempTextColor = ['#6AB664', '#6AB664', '#6AB664', '#6AB664', '#6AB664']
    
            tempColor[i] = '#6AB664'
            tempTextColor[i] = 'white'
    
    
            setColor(tempColor)
            setTextColor(tempTextColor)
    
        }
        //Displays add button if supposed to
        const AddButton = () => {
            if(!route.params.stock.display) {
                return(<View>

                </View>)
            }

                return(
                    <TouchableOpacity
                    style = {{paddingRight: normalize.setNormalize(16)}}
                    onPress = {() => {      
                        //Update the score of the stock when someone adds it to their library
                        //Navigate to library page and pass it percent change, ticker, stock name
                        navigation.navigate('TabStack', {
                            screen: 'Library',
                            params: {stock: route.params.stock}
                        })
                    }}
                    >
        
                        <Ionicons 
                        name="add" 
                        size={normalize.setNormalize(30)} 
                        color="white" 
                        />
        
                    </TouchableOpacity>
                )
           
        }

        //Graph, while data is loading shows activity indicator
   
        //Get the graph data from the start date to the end date
    //timespan: timeperiod for which get data points 
    //multiplier: number of data points getting in the time span 
    // - example: timespan = "day" multiplier = "1" will get 1 day data point for each day from startDate to endDate
    //period: use to set hooks of day/week/month/year so don't have to make api call everytime user switches between them
    const getGraphData = async (startDate : string, endDate : string, timespan : string, multiplier : string, period : string) => {
        let tempGraphData: Array<{x:number, y: number}> = []

        try {
            await fetch('https://api.polygon.io/v2/aggs/ticker/' + route.params.stock.ticker + '/range/' + multiplier + '/'+ timespan + '/' + startDate + '/' + endDate + '?adjusted=true&sort=asc&limit=300&apiKey=' + apiConfig.POLYGON_API_KEY)
            .then(
                function(response) {
                    return response.json()
                }
            )
            .then(

                function(data) {
                    //Use the first opening price to calculate the percent change
                
                    

                    setOpen(data.results[0].h)

                    

                    // for(let date in data.results) {

                        
                    //     tempGraphData.push(
                    //         {
                    //             x: date,
                    //             y: data.results[date].h
                    //         }
                    //     )
                    // }

                    for(let i = 0; i < data.results.length; i++) {
                        tempGraphData.push({x:i, y: data.results[i].h})
                    }

                    
                    
                    setGraphData(tempGraphData)

                    if(period == "day") {
                        setDayData(tempGraphData)

                        console.log(tempGraphData[0])
                    } else if (period == "week") {
                        console.log("in week data get graph data")
                        setWeekData(tempGraphData)
                    } else if (period == "month") {
                        setMonthData(tempGraphData)
                    } else {
                        setYearData(tempGraphData)
                    }

                }

            )
        } catch (error) {

            console.log(error)
            //Set open and graph data so graph doesn't throw error when calculating percent change
            setOpen(0)
            setGraphData([{x:0, y:0}])

        } finally {
            setLoading(false)
        }
    }
    

    //Call this the first time user presses on week, month, year and the first time the app is loaded
    const getOtherGraphData = (i : number) => {
        //Get the current date
        let date = new Date()
        let startDay = date.getDate()
        let endDay = date.getDate()
        let startMonth = date.getMonth()
        let endMonth = date.getMonth()

        let year = date.getFullYear()

        //Month returns 0-11
        startMonth = startMonth + 1
        endMonth = endMonth + 1



        //If user presses on 1D button
        if(i == 0) {
            //Check to make sure I won't send 0 as day (if the date day is 1)
            //Set to be 28 because it is the least number of days a month can have
            //WILL UPDATE THIS LATER
            // Get utc -> subtract -> convert
            if(endDay == 1) {
                startMonth = startMonth - 1
                startDay = 28
             
            } else {
                startDay = startDay - 2
                endDay = endDay -1
            }

            

            getGraphData(year.toString() + "-0" + startMonth.toString() + "-" + startDay.toString(), 
            year.toString() + "-0" + endMonth.toString() + "-" + endDay.toString(), "minute", "1", "day")

        //If user presses on 1W button
        } else if (i == 1) {
            //Make sure not sending negative number or 0 to api
            if(endDay <= 7) {
                startDay = startDay - 7 + 28
                startMonth = startMonth - 1
            } else {
                startDay = startDay - 7
            }

            getGraphData(year.toString() + "-0" + startMonth.toString() + "-0" + startDay.toString(), 
            year.toString() + "-0" + endMonth.toString() + "-" + endDay.toString(), "minute", "1", "week")

        //If user presses 1M
        } else if(i==2){

            if(endMonth == 1) {
                startMonth = 12
                year = year - 1
            } else {
                startMonth = startMonth - 1
            }

            getGraphData(year.toString() + "-" + startMonth.toString() + "-" + startDay.toString(), 
            year.toString() + "-0" + endMonth.toString() + "-0" + endDay.toString(), "day", "1", "month")
        //User presses 1Y
        } else {

            getGraphData((year-1).toString() + "-0" + startMonth.toString() + "-" + startDay.toString(), 
            year.toString() + "-0" + endMonth.toString() + "-" + endDay.toString(), "week", "1", "year")

        }
    }

    const Graph = () => {
        if(loading) {
            console.log("LOADING")
            return(
             undefined
            )
          } 

          console.log("NOT LOADING")


        return(
            //Graph
            

            // events ={{}}
            // eventKey={{}}
            // interpolation={{}}
            // samples={{}}
            // sortKey={{}}
            // style={{}}
            
            // data = {graphData}
            
            // padding = {{top: normalize.setNormalize(40)}}
            //Sets color of line to be theme green
            // style = {{data: {stroke: Constants.THEME_COLOR.green, strokeWidth: 2}}}

            // containerComponent={
            //     <Container
            //     cursorComponent={<LineSegment  />}
            //     />
            // }
            // containerComponent={
              
            //         <Container
            //         //Line that displays percent change

            //         cursorComponent={<LineSegment style={{stroke:"white", strokeWidth: 1.5}}/>}
            //         //Calculates percent change
            //         // labels = {(point) => console.log(point)}
            //         // "% " + (Math.round((((point.datum.y-open)/open)*100)*100)/100).toString()
    
            //         cursorDimension = "x"
            //         // voronoiDimension = "x"
                      
            //         //Displays percent change
            //         labelComponent = {
            //             <VictoryTooltip
            //             style = {{fill:'white', fontFamily: 'system font', fontSize: normalize.setNormalize(13)}}
            //             flyoutStyle = {{fill: 'black', strokeWidth: 0}}
            //             center = {{x:normalize.setNormalize(30), y: normalize.setNormalize(10)}}
            //             pointerLength = {0}
                        
            //             />
            //         }/>
            //     }
            //     >      

            <VictoryLine>

            </VictoryLine>
           
          
        )
    }

        
     
    useEffect(() => {

        console.log("TOP")

        getOtherGraphData(0)

    }, [])

    return(
         //Container for page
         <View 
         style = {stockDisplayStyles.pageContainer}
         >
             {/*
             Allows page to scroll
             */}
             <ScrollView
             showsVerticalScrollIndicator = {false}
             stickyHeaderIndices={[1]}
             
             >
                 {/*
                 Container for back button and add button
                 */}
                 <View 
                 style = {stockDisplayStyles.headerContainer}>
                     {/* 
                     Back button
                     */}
                     <TouchableOpacity
                     style = {{flexDirection: 'row', alignItems: 'center'}}
                     onPress={() => {
                        navigation.replace('TabStack')
                     }}
                     >
 
                         <Ionicons 
                         name="chevron-back-outline" 
                         size={normalize.setNormalize(30)} 
                         color="white" 
                         />
 
                         <Text style={{fontSize: normalize.setNormalize(20), fontWeight: '800', color: 'gray'}}>
                             {"$" + route.params.stock.ticker}
                         </Text>
 
                     </TouchableOpacity>
 
                     {/* 
                     Add button
                     */}
                     <AddButton/>
                    
 
                 </View>
 
                 {/* 
                 Stock name and ticker
                 */}
                 <View 
                 style = {stockDisplayStyles.titleScoreContainer}>
 
                     <Text 
                     style = {
                         {
                             fontSize: normalize.setNormalize(35), 
                             color: 'white'
                         }
                     }>
                         {route.params.stock.sName}
                     </Text>
 
                     <Text
                     style = {
                         {
                             paddingTop: normalize.setNormalize(10),
                             color: Constants.THEME_COLOR.blue,
                             fontWeight: 'bold'
                         }
                     }>
                         {'Score: ' + route.params.stock.score}
                     </Text>
 
                     
 
                 </View>
 
                 {/**
                  * Graph
                  */}
                 <View style={{flex:1, justifyContent:'center', alignItems:'center', paddingTop: normalize.setNormalize(20)}}
                     >
                     {Graph()}
                 </View>
                        
                 {/* 
                 Graph buttons
                 */}
                 <View style={stockDisplayStyles.restOfPageContainer}>
                     <View 
                     style = {stockDisplayStyles.allGraphButtonsContainer}>
 
                     <TouchableOpacity
                     onPress= {()=>{
                         handleColor(0)
                         setGraphData(dayData)
                         
                         
                     }}
                     style={[stockDisplayStyles.buttonContainer, {backgroundColor: color[0]}]}
                     >
 
                         <Text style={[stockDisplayStyles.buttonText, {color: textColor[0]}]}>1D</Text>
 
                     </TouchableOpacity>
 
                     <TouchableOpacity
                      onPress= {()=>{
                         handleColor(1)
                         
                         if(weekData.length == 0) {
                             getOtherGraphData(1)
                         } else {
                             setGraphData(weekData)
                         }
                         
                     }}
                     style={[stockDisplayStyles.buttonContainer, {backgroundColor: color[1]}]}
                     >
                         <Text style={[stockDisplayStyles.buttonText, {color: textColor[1]}]}>1W</Text>
                     </TouchableOpacity>
 
                     <TouchableOpacity
                      onPress= {()=>{
                         handleColor(2)
                         if(monthData.length == 0) {
                             getOtherGraphData(2)
                         } else {
                             setGraphData(monthData)
                         }
                         
                     }}
                     style={[stockDisplayStyles.buttonContainer, {backgroundColor: color[2]}]}
                     
                     >
                         <Text style={[stockDisplayStyles.buttonText, {color: textColor[2]}]}>1M</Text>
                     </TouchableOpacity>
 
                     <TouchableOpacity
                      onPress= {()=>{
                         handleColor(3)
 
                         if(yearData.length == 0) {
                             getOtherGraphData(3)
                         } else {
                             
                             setGraphData(yearData)
                         }
                         
                         
                     }}
                     style={[stockDisplayStyles.buttonContainer, {backgroundColor: color[3]}]}
 
                     >
                         <Text style={[stockDisplayStyles.buttonText, {color: textColor[3]}]}>1Y</Text>
                     </TouchableOpacity>
 
                 </View>
                 
                 <View style={{paddingVertical: normalize.setNormalize(30)}}>
                     <View style={stockDisplayStyles.borderLine}></View>
 
                 </View>
 
 
                 {/* <View style={{padding: 20, width: '100%', justifyContent: 'center', alignItems: 'center'}}>
 
                     <TouchableOpacity
                     style={{backgroundColor: 'red', height: 30, width: 30}}
                     onPress={() => {
                         let temp = weekData
                         temp.push((Math.random() * 600)+800)
                         setWeekData(temp)
                     }}
                     >
                         <Text
                         style={{color: 'white'}}
                         >
 
                             Click me puss
 
                         </Text>
                     </TouchableOpacity>
 
                 </View> */}
 
                 {/**
                  * Tags
                  */}
                 <View style={{width: '100%', alignItems: 'center', paddingBottom: normalize.setNormalize(30), flexDirection: 'row', display: 'flex'}}>
                 
                     <FlatList
                     data = {infoData[2]}
                     horizontal         
                     showsHorizontalScrollIndicator = {false}           
                     renderItem={({item})=>(
                         <View style={{paddingHorizontal: 10}}>
                             <View style={{borderRadius: 30, backgroundColor: '#3B3939', paddingHorizontal: normalize.setNormalize(10), paddingVertical: normalize.setNormalize(5), justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: 'white'}}>
                                 <Text key={item} style={{color: 'white'}}>{item}</Text>
                             </View>
                         </View>
                     )}
                     />
                 </View>
 
                 <View style={{paddingBottom: normalize.setNormalize(30)}}>
                     <View style={stockDisplayStyles.borderLine}></View>
 
                 </View>
 
                 <Text style={stockDisplayStyles.title}>
                     {'About ' + route.params.stock.sName}
                 </Text>
 
                 <View style={stockDisplayStyles.descriptionContainer}>
                     <Text style={{color: 'white'}}>
                         {infoData[1]}
                     </Text>
                 </View>
 
                 {/**
                  * Displays infoData
                  */}
                 <View style={{flexDirection: 'row', width:'100%', paddingTop: normalize.setNormalize(20), paddingLeft: normalize.setNormalize(10), paddingBottom: normalize.setNormalize(20)}}>
                     <View style={{width: '50%'}}>
                       
                         {infoDataDisplay("CEO", 3)}
                         {infoDataDisplay("Employees", 7)}
                         {infoDataDisplay("Sector", 6)}
                         {infoDataDisplay("Phone Number", 10)}
             
                     </View>
 
                     <View style={{width: '50%'}}>
                         {infoDataDisplay("Market Cap", 5)}
                         {infoDataDisplay("Headquarters", 4)}
                         {infoDataDisplay("Exchange", 9)}
                         {infoDataDisplay("List Date", 11)}
                     </View>
 
                 </View>
 
                 <View style={{paddingVertical: normalize.setNormalize(30)}}>
                     <View style={stockDisplayStyles.borderLine}></View>
                 </View>
 
                 {/* <Text style={stockDisplayStyles.title}>
                     Similar Stocks
                 </Text>
 
                 <FlatList
                     data = {infoData[0]}
                     renderItem={({item})=>(
                         
                         <StockContainer
                         ticker = {item}
                         />
                     
                     )}
                 /> */}
 
                 {/* <View style={{paddingVertical: normalize.setNormalize(30)}}>
                     <View style={{width: '100%', backgroundColor: 'white', height: 0.5, opacity: 0.4}}></View>
                 </View> */}
 
             <Text style={stockDisplayStyles.title}>
                     News
             </Text>
 
             {/**
              * Flatlist to display news 
              */}
             
             
             </View>
 
             </ScrollView>
 
         </View>
             
             
     )
}

const stockDisplayStyles = StyleSheet.create({

    pageContainer: {
        justifyContent: 'center', 
        flex: 1, 
        marginTop: normalize.setNormalize(40), 
    },

    headerContainer: {
        width: '100%', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        flexDirection: 'row',
        paddingLeft: normalize.setNormalize(16)
    },

    titleScoreContainer: {
        width:'100%',
        paddingLeft: normalize.setNormalize(16),
        backgroundColor: 'rgba(0, 0, 0, 0.9)',
        paddingBottom: normalize.setNormalize(16)
    },

    tableText: {
        fontSize: normalize.setNormalize(13),
        color: 'gray',
        paddingVertical: normalize.setNormalize(10),

    },

    buttonContainer: {
        height: normalize.setNormalize(30),
        width: normalize.setNormalize(60),
        borderRadius: 50,
        justifyContent:'center',
        alignItems: 'center',
        borderColor: 'white'
    },

    buttonText: {
        color: 'white',
        fontSize: normalize.setNormalize(13)
    },

    title: {

        color: 'white', 
        fontSize: 20, 
        paddingBottom: normalize.setNormalize(20)

    },

    descriptionContainer: {
        width: '100%', 
        backgroundColor: '#3B3939', 
        borderRadius: normalize.setNormalize(10), 
        flex:1, 
        padding:normalize.setNormalize(15)
    },

    infoDataContainer: {
        paddingBottom: normalize.setNormalize(5)
    },

    restOfPageContainer: {
        flex:1, 
        justifyContent:'center', 
        marginHorizontal: normalize.setNormalize(30)
    },

    allGraphButtonsContainer: {
        width: '100%', 
        height: normalize.setNormalize(50), 
        paddingTop: normalize.setNormalize(20),
        flexDirection:'row', 
        justifyContent: 'space-between',
    },

    borderLine: {
        width: '100%', 
        borderWidth: normalize.setNormalize(1),
        borderColor: 'white',
        opacity: 0.1,
    }

})


export default StockDisplay;


