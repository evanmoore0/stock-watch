
import { useEffect, useState } from "react"
import apiconfig from "../../api.config"
export default async function allStocks() {
    const [data, setData] = useState(0)
    // await fetch(apiconfig.TICKERS_API_URL)
    // .then(
    //     function(response) {
    //         return response.json()
    //     }
    // ).then(
    //     function(data) {

    //         setData(data.filter((value: { Name: string }) =>  value.Name.replace(/Technologies|Technology/g, "")))

    //     }
    // )

    console.log("IN all stocks")

    const bruh = () => {
        setData(10)
        console.log(data)

    }

    useEffect(() => {
        bruh()

        return(
            bruh()
        )
    })
   
}