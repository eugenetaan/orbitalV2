import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, TextInput } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { sessionStorage } from '../localstorage'


var currentBudget = "120.00"

sessionStorage.setItem("currentBudget", currentBudget)


const BudgetScreen = () => {
    const [budget, setBudget] = useState("0.00")
    const [month, setMonth] = useState(new Date())
    

    const handleConfirm = () => {


        if (budget == "0.00") {
            alert("Budget Must Be Greater Than 0")
        } else {
            sessionStorage.setItem('currentBudget', budget)
            setBudget("0.00")
            alert('Successfully Changed Budget')
        }
    }

    const handleNumberPress = (buttonValue) => {
        if (budget==="0.00") {
            setBudget("0.0" + buttonValue)
        } else if (budget >= "1.00") {
            var beforeDecimalAmount = budget.slice(0,budget.length-3)
            setBudget(beforeDecimalAmount + budget[budget.length-2] + "." + budget[budget.length-1] +  buttonValue)
        } else if (budget >= "0.10") {
            setBudget(budget[2]+ "." + budget[3] + buttonValue)
        } else if (budget >= "0.01") {
            setBudget("0." + budget[3] + buttonValue)
        }
      };
    
    const handleDeletion = () => {
        if (budget.length > 4) {
            setBudget(budget.slice(0, budget.length - 4) + "." + budget[budget.length-4] + budget[budget.length-2]);
        } else if (budget > "0.99") {
            setBudget("0" + "." + budget[0] + budget[2]);
        }  else if (budget > "0.09") {
            setBudget('0.0' + budget[2])
        } else {
            setBudget("0.00")
        }
      };


    return (
    <View>
        <Text style={styles.title}>Set Your Budget for the Month!</Text>
        <View style={styles.displayBudget}>
            <Text style={{fontSize: 25, marginBottom: 10}}>Current Budget</Text>
            <Text style={{fontSize: 35, color:'green'}}>${sessionStorage.getItem('currentBudget')}</Text>
        </View>
        {/* <View style={styles.budgetInputContainer}>
            <TextInput
                placeholder="Budget"
                value = {budget}
                onChangeText = {text => setBudget(text)}
                style={styles.budgetInput}    
            /> 
        </View> */}
        <View style={styles.budgetInputView}>
                <Text style={styles.budgetText}>{budget}</Text>
        </View>
        <View style={styles.inputArea}>
            <View style={styles.numberRow}>
                <TouchableOpacity style={styles.numberButton} onPress={() => handleNumberPress("1")}><Text style={styles.numberButtonText}>1</Text></TouchableOpacity>
                <TouchableOpacity style={styles.numberButton} onPress={() => handleNumberPress("2")}><Text style={styles.numberButtonText}>2</Text></TouchableOpacity>
                <TouchableOpacity style={styles.numberButton} onPress={() => handleNumberPress("3")}><Text style={styles.numberButtonText}>3</Text></TouchableOpacity>
            </View>
            <View style={styles.numberRow}>
                <TouchableOpacity style={styles.numberButton} onPress={() => handleNumberPress("4")}><Text style={styles.numberButtonText}>4</Text></TouchableOpacity>
                <TouchableOpacity style={styles.numberButton} onPress={() => handleNumberPress("5")}><Text style={styles.numberButtonText}>5</Text></TouchableOpacity>
                <TouchableOpacity style={styles.numberButton} onPress={() => handleNumberPress("6")}><Text style={styles.numberButtonText}>6</Text></TouchableOpacity>
            </View>
            <View style={styles.numberRow}>
                <TouchableOpacity style={styles.numberButton} onPress={() => handleNumberPress("7")}><Text style={styles.numberButtonText}>7</Text></TouchableOpacity>
                <TouchableOpacity style={styles.numberButton} onPress={() => handleNumberPress("8")}><Text style={styles.numberButtonText}>8</Text></TouchableOpacity>
                <TouchableOpacity style={styles.numberButton} onPress={() => handleNumberPress("9")}><Text style={styles.numberButtonText}>9</Text></TouchableOpacity>
            </View>
            <View style={styles.numberRow}>
                <TouchableOpacity style={styles.numberButton} onPress={() => handleDeletion()}><Text style={styles.numberButtonText}>Del</Text></TouchableOpacity>
                <TouchableOpacity style={styles.numberButton} onPress={() => handleNumberPress("0")}><Text style={styles.numberButtonText}>0</Text></TouchableOpacity>
                <TouchableOpacity style={styles.numberButton} onPress={() => handleConfirm()}><Text style={styles.numberButtonText}>Add</Text></TouchableOpacity>
            </View>
        </View>
        {/* <View>
            <TouchableOpacity style={styles.button} onPress={() => {handleConfirm(budget)}}>
                <Text style={{fontSize: 25}} >Confirm</Text>
            </TouchableOpacity> */}
        {/* </View> */}
    </View>
    )
}

export default BudgetScreen;

const styles = StyleSheet.create({
    budgetInput: {
        backgroundColor: "white",
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 10,
        marginTop:5,
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: 40,
    },
    displayBudget: {
        alignItems: 'center',
        marginTop: 20
    },
    budgetInputContainer: {
        marginTop: 50
    },
    button: {
        backgroundColor: "#5F7DDE",
        width: 150,
        alignItems: 'center',
        borderRadius: 20,
        height:50,
        paddingTop: 12,
        alignSelf: 'center',
        marginTop: 50,
    },
    numberRow: {
        flexDirection: 'row',
        justifyContent: "space-around"
    },
    numberButton : {
        borderRadius: 250,
        backgroundColor: 'white',
        color: "black",
        width: 80,
        height: 80,
        marginBottom: 10,
        alignItems: 'center',
        paddingTop: 20
    },
    numberButtonText : {
        fontSize: 35,
    },
    budgetInputView: {
        backgroundColor: 'white',
        alignItems: 'center',
        borderRadius: 30,
        marginHorizontal: 20,
        marginBottom: 20,
        marginTop: 20,
    },
    budgetText: {
        fontSize: 40
    },

})