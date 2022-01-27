import React, { FC, useEffect, useState } from "react";
import { TouchableOpacity, View, StyleSheet} from "react-native";
import Graphic from "../components/Graphic";
import {VictoryBar, VictoryChart, VictoryLine, VictoryTheme} from 'victory-native'
import normalize from "../utils/normalize";
import { useLinkProps, useNavigation } from "@react-navigation/native";

import {auth} from '../../firebase-config'
import { onAuthStateChanged } from "firebase/auth";
import { VictoryBarProps } from "victory-bar";
import { VictoryCommonPrimitiveProps, VictoryDatableProps } from "victory-core";

import { BarProps } from "victory-bar";


const Loading: FC = () => {

    const navigation = useNavigation()

    const [victoryBruv, setVictory] = useState<VictoryBarProps['data']>([{x:1, y:1}])

    const [loading,setLoading] = useState(true)


    // const isAuth = (user: any) => {
       
    //     // console.log(auth.currentUser?.uid)
       
    //     console.log("USERS SL:DFJS")
    //     // console.log(getAuth())

    //         if(user) {
    //             navigation.navigate("TabStack")
    //         } else {
    //             navigation.navigate("Welcome")
    //         }
    //     }
    
    useEffect(() => {

        setVictory( [
            { x: 1, y: 13000 },
            { x: 2, y: 16500 },
            { x: 3, y: 14250 },
            { x: 4, y: 19000 }
          ])          

          setLoading(false)




    }, [])

   

   
    // const data = [
    //     { quarter: 1, earnings: 13000 },
    //     { quarter: 2, earnings: 16500 },
    //     { quarter: 3, earnings: 14250 },
    //     { quarter: 4, earnings: 19000 }
    //   ];



    // const stock = () => {
    //     return(
    //         <View>
    //             <View style={styles.container}>
       
    //   </View>
    //         </View>
    //     )
    // }

    const Maybe = () => {

        return(
            <View>
                {loading == true ? <View></View> : <VictoryLine
                        style={{
                            data: { stroke: "#c43a31" },
     
                        }}
                        data={[
                        { x: 1, y: 2 },
                        { x: 2, y: 3 },
                        { x: 3, y: 5 },
                        { x: 4, y: 4 },
                        { x: 5, y: 7 }
                        ]}
                        {...undefined}
                        
                        
                    />}
            </View>
        )
        
    }



    return(
        <View>
            <Maybe/>
        </View>
    )
}

export default Loading

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "#f5fcff"
    }
  });
