import React, { useState, useEffect } from "react";
import { useNavigation } from '@react-navigation/core';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  KeyboardAvoidingView,
  TouchableOpacity,
} from "react-native";
import { auth } from "../Firebase";
import { sessionStorage } from "../localstorage";
import { db } from '../Firebase'

const LoginScreen = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigation = useNavigation()

    // const handleRegister = () => {
    //     auth
    //         .createUserWithEmailAndPassword(email, password)
    //         .then(userCredentials => {
    //             const user=userCredentials.user;
    //             console.log(user.email);
    //         })
    //         .catch(error => alert(error.message))
    // }   

    const handleLogin = () => {
        setEmail("");
        setPassword("");
        auth
            .signInWithEmailAndPassword(email, password)  
            .then(sessionStorage.setItem("email", email))
            .then(setExpenses())
            .then(initBudget())
            .then(() => navigation.navigate("Home"))
            .catch(error=> alert(error.message))
    }

    // get expenses
    function setExpenses() {
            let expenses;
            const user = db.collection('profiles')
                .doc(email)
                .get()
                .then((doc) => {
                    //console.log(email)
                    expenses = doc.data().expenses;
                    console.log(expenses)
                    sessionStorage.setItem('expenses', expenses);
                })
    }

    // init budget
    const initBudget =() => {
        let budget;
        const user = db.collection('profiles')
            .doc(email)
            .get()
            .then((doc) => {
                budget = doc.data().budget;
                //console.log(budget)
                startDate = new Date(doc.data().budgetStartDate);
                console.log(doc.data())
                endDate = new Date(doc.data().budgetEndDate);
                sessionStorage.setItem('budget', budget);
                sessionStorage.setItem('budgetStartDate', startDate);
                sessionStorage.setItem('budgetEndDate', endDate);
            })
    }


    useEffect(()=> {
        const unsubscribe = auth.onAuthStateChanged(auth, user => {
            if (user) {
                navigation.navigate("Home")
            }
        });
        return unsubscribe;
    }, [])

    return (
        <KeyboardAvoidingView
            style = {styles.container}
            behaviour="padding"
        >
            <Text style={styles.logoText}>MooLahz</Text>
            <View style={styles.inputContainer}>
                <TextInput 
                    placeholder="Email"
                    value = {email}
                    onChangeText = {text => setEmail(text)}
                    style={styles.input}                
                />
                <TextInput 
                    placeholder="Password"
                    value = {password}
                    onChangeText = {text => setPassword(text)}
                    style={styles.input}     
                    secureTextEntry           
                />
            </View>

            <View style={styles.buttonContainer}>
                <TouchableOpacity
                    onPress={handleLogin}
                    style={styles.button}
                >
                    <Text style={styles.buttonText}>Login</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => navigation.navigate("Register")}
                    style={[styles.button, styles.buttonOutline]}
                >
                    <Text style={styles.buttonOutlineText}>Register</Text>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    )
}

export default LoginScreen

const styles = StyleSheet.create({
    logoText: {
        fontWeight: 'bold',
        fontSize: 50,
        paddingBottom: 130,
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    inputContainer: {
        width: '80%'
    },
    input: {
        backgroundColor: "white",
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 10,
        marginTop:5,
    },
    buttonContainer: {
        width: '60%',
        justifyContent: 'center',
        alignItems:'center',
        marginTop: 40,
    },
    button: {
        backgroundColor: "#0782F9",
        width: '100%',
        padding: 15,
        borderRadius: 10,
        alignItems: "center",
    },
    buttonOutline: {
        backgroundColor: 'white',
        marginTop: 5,
        borderColor:  "#0782F9",
        borderWidth: 2,
    },
    buttonText: {
        color: "white",
        fontWeight: '700',
        fontSize: 16
    },
    buttonOutlineText: {
        color:  "#0782F9",
        fontWeight: "700",
        fontSize: 16,
    },
})