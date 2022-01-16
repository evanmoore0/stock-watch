import { useReducer } from 'react'
import {auth, db } from '../../firebase-config'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { doc, getDoc, setDoc } from 'firebase/firestore'


export function register(email: string, password: string) {
    console.log("WEHFSLJKDF")
    createUserWithEmailAndPassword(auth, email, password)
    .then(
        async function(authData) {
            await setDoc((doc(db, "users", authData.user.uid)), {email: email, stocks: []} )
        }
    ).catch(error => alert(error.message))

}
