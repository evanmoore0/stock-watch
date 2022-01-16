import { allStockType, dbStock, dStock, percStock } from "../types/data";

import apiConfig from "../../api.config";
import { Alert } from "react-native";
import { collection, getDocs, limit, orderBy, query } from "firebase/firestore";
import { db } from "../../firebase-config";
import { Stock } from "./stock";


export class Data {

    static async getTrending () {
        console.log("TRENDING")

        try {


            let tempTrending : Array<dbStock> = []

            const trendingQuery = query(collection(db, 'stocks'), orderBy('score', "desc"), limit(10))
            const docSnap = await getDocs(trendingQuery)
    
            docSnap.forEach(snapshot => {
                tempTrending.push({sName: snapshot.data().sName, ticker: snapshot.data().ticker, score: snapshot.data().score, percentChange: snapshot.data().percentChange});
                })

            if(tempTrending) {
                return tempTrending
            } else {
                throw new Error("bro")
            }
                  
        } catch (error: any) {
            console.log(error)
        } finally {

        }
    }

    // static bootStrap(percData : Array<percStock>, dbData : Array<dbStock>[], display : boolean) {
    //     // let finalData : testStock[] = []

    //     dbData.forEach(dbStock => 
    //             percData.forEach(percStock => 
    //                     if( == percStock.ticker) {
    //                         let stock = new Stock(dbStock.sName, dbStock.ticker, dbStock.score, dbStock.percentChange, display)
    //                     }
    //                 )
    //         )


    // }
    

    static async percentGain(data : Array<dbStock> | undefined, display : boolean ) {

        let stocks = ""
        let temp: dStock[] = []

        if(data == undefined) {
            return undefined
        }
        data.forEach(stock => stocks = stocks + stock.ticker + ",")

        try {

            if(stocks == "") {
                throw new Error("uh oh")
            }

            await fetch('https://api.polygon.io/v2/snapshot/locale/us/markets/stocks/tickers?tickers=' + stocks +'&apiKey=' + apiConfig.POLYGON_API_KEY)
                .then(
                    function(response) {
                        return response.json()
                    }
                ).then(
                    function(response) {
                        data.forEach(dbStock => {
                            response.tickers.forEach((percStock: percStock) => {

                            
                                if(dbStock.ticker == percStock.ticker) {
                                    
                                    temp.push({stock : new Stock(dbStock.sName, dbStock.ticker, dbStock.score, percStock.todaysChangePerc, display)})
                                }
                            });
                        })
                    }
                )

                return temp
             
                
        } catch (error) {

            Alert.alert("oh no")
            
        }

    }

    static async allStocks (){
        let temp: dStock[] = []
        

        try {

            await fetch(apiConfig.TICKERS_API_URL)
        .then(
            function(response) {
                return response.json()
            }
        ).then(
            data => data.forEach((stock: allStockType) => {
                temp.push({stock : new Stock(stock.Name.replace(/Technologies|Technology/g, ""), stock.Symbol, 0, 0, true)})
            })
        )

    
        if(temp != undefined) {
            return temp
        } else {
            throw new Error("Uh oh")
        }

            
        } catch (error) {
            
        }
    }
}