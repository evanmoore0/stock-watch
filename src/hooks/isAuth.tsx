// import React, { useEffect, useState } from "react";
// import { useNavigation } from "@react-navigation/native";
// import { Alert } from "react-native";
// import { auth } from "../../firebase-config";
// import { onAuthStateChanged } from "firebase/auth";


// export default function isAuth() {
//     // const [auth, setAuth] = useState(false)
//     const navigation = useNavigation()



//     useEffect(() => {

//         function checkAuth() {
//             try {

//                 onAuthStateChanged(auth, user => {
//                     if(user != null) {

//                         navigation.navigate('TabStack')

                        

//                     } else {

//                         navigation.navigate('Welcome')

//                     }
//                 })





//             } catch(error) {

//                 console.log(error)

//             }
//         }

//         checkAuth()

//     }, [])

// }