import { Stock } from "../data/stock"

export type dbStock = {

    sName: string,
    ticker: string,
    percentChange: number | undefined,
    score: number,
    

}

export type dStock = {
    stock: Stock
}

export type percStock = {

    ticker: string
    todaysChangePerc: number
    
} 

export type allStockType = {
    Name : string
    Symbol: string
}