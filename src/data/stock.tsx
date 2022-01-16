
import { dbStock } from "../types/data"

export class Stock {
    sName: string
    ticker: string
    score: number
    percentChange: number
    display: boolean
    
    constructor(sName: string, ticker: string, score: number, percentChange: number, display: boolean) {
        this.sName = sName
        this.ticker = ticker
        this.score = score
        this.percentChange = percentChange
        this.display = display
    } 

   

    setPercentChange(percentChange: number) {
        this.percentChange = percentChange
    }

    getScore() {

    }

    setScore(score: number) {
        this.score = score
    }

    

    



}