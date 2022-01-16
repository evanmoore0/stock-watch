
import { Alert } from "react-native";
import { register } from "./register";


export const handleRegister = (email: string, password: string, confirmPassword: string) => {

    if(!email) {
        Alert.alert("Email is required");
    } else if (!password) {
        Alert.alert("Password is required");
    } else if (!confirmPassword) {
        Alert.alert("Confirm password is required") 
    } else if (confirmPassword != password) {
        Alert.alert('Password does not match!')
    } else {
       register(email, password)
    }
}