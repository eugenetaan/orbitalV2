import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, TextInput } from 'react-native'
import { sessionStorage } from '../localstorage'
import { Dropdown } from 'react-native-material-dropdown-v2'
import { render } from 'react-dom'
import parseErrorStack from 'react-native/Libraries/Core/Devtools/parseErrorStack'

const DummyCats = [ {value: "Food"}, {value: "Entertainment"}, {value :"Transport"}]

sessionStorage.setItem('dummyCats', DummyCats)

const AddScreen = () => {
    const [enteredTitle, setEnteredTitle] = useState("");
    const [enteredAmount, setEnteredAmount] = useState("0.00");
    const [enteredDate, setEnteredDate] = useState("");
    const [selectedCat, setSelectedCat] = useState("Transport");
    
    const addExpenseToListHandler = (expense) => {
        addExpenses((prevExpenses) => {
            return [expense, ...prevExpenses];
        });
    };
    
    const categoryChangeHandler = (chosenCat) => {
        setSelectedCat(chosenCat);
    }
    
    const amountOnChangeHandler = (event) => {
        setEnteredAmount(event.target.value);
    }
    
    const titleOnChangeHandler = (event) => {
        setEnteredTitle(event.target.value);
    }
    
    const dateOnChangeHandler = (event) => {
        setEnteredDate(event.target.value);
    }
   
    const handleNumberPress = (buttonValue) => {
        if (enteredAmount==="0.00") {
            setEnteredAmount("0.0" + buttonValue)
        } else if (enteredAmount >= "1.00") {
            var beforeDecimalAmount = enteredAmount.slice(0,enteredAmount.length-3)
            setEnteredAmount(beforeDecimalAmount + enteredAmount[enteredAmount.length-2] + "." + enteredAmount[enteredAmount.length-1] +  buttonValue)
        } else if (enteredAmount >= "0.10") {
            setEnteredAmount(enteredAmount[2]+ "." + enteredAmount[3] + buttonValue)
        } else if (enteredAmount >= "0.01") {
            setEnteredAmount("0." + enteredAmount[3] + buttonValue)
        }
      };
    
    const handleDeletion = () => {
        if (enteredAmount.length > 4) {
            setEnteredAmount(enteredAmount.substring(1));
        } else if (enteredAmount > "0.99") {
            setEnteredAmount("0" + enteredAmount.substring(1));
        }  else if (enteredAmount > "0.09") {
            setEnteredAmount('0.0' + enteredAmount.substring(3))
        } else {
            setEnteredAmount("0.00")
        }
      };


    // const addExpenseHandler = () => {
    //     var newExpense = {
    //         title : enteredTitle,
    //         cat : selectedCat,
    //         amount : enteredAmount,
    //         date : enteredDate,
    //         key : Math.random()
    //     }
    
    //     setEnteredAmount("");
    //     setEnteredDate("");
    //     setEnteredTitle("");
    
    //     props.AddExpenseHandler(newExpense);
    //     props.CloseAddExpenseModalHandler();
    // }

    return (
    <View style={{backgroundColor:"E5E5E5"}}>
        <View style={styles.viewingArea}>
            <View>
                <TextInput
                    placeholder="Expense Title"
                    value = {enteredTitle}
                    onChangeText = {text => setEnteredTitle(text)}
                    style={styles.titleInput} /> 
                <Text>{enteredDate}</Text>
                <Text>{enteredAmount}</Text>
                <Dropdown label='Categories' data={DummyCats}></Dropdown>
            </View>
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
                <TouchableOpacity style={styles.numberButton} onPress={() => handleOpPress("add")}><Text style={styles.numberButtonText}>Add</Text></TouchableOpacity>
            </View>
        </View>
    </View>
    )
}

const styles = StyleSheet.create({
    numberRow: {
        flexDirection: 'row',
        justifyContent: "space-around"
    },
    numberButton : {
        borderRadius: 10,
        backgroundColor: 'white',
        color: "black",
        paddingVertical: 10,
        paddingHorizontal: 10,
        marginBottom: 10,
    },
    numberButtonText : {
        fontSize: 35,
    },
    inputArea: {
        height: "160%"

    },
    viewingArea: {
        height: "25%"
    },
    titleInput: {
        backgroundColor: "white",
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 10,
        marginTop:5,
    }
})

export default AddScreen;