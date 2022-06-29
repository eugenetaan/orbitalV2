import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, TextInput, Appearance, Button } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { sessionStorage } from '../localstorage'
import DateTimePickerModal from 'react-native-modal-datetime-picker'


// sessionStorage.setItem("currentBudget", "No Budget Set")
// sessionStorage.setItem('budgetStartDate', null)
// sessionStorage.setItem('budgetEndDate', null)


const BudgetScreen = () => {
    const [budget, setBudget] = useState("0.00")
    const [currentBudget, setCurrentBudget] = useState(sessionStorage.getItem('budget'))
    const [budgetStartDate, setBudgetStartDate] = useState(new Date())
    const [budgetEndDate, setBudgetEndDate] = useState(new Date())
    const [isStartDatePickerVisible, setStartDatePickerVisibility] = useState(false);
    const [isEndDatePickerVisible, setEndDatePickerVisibility] = useState(false);
    const [currentBudgetStart, setCurrentBudgetStart] = useState(sessionStorage.getItem('budgetStartDate'))// != null ? sessionStorage.getItem('budgetStartDate') : new Date())
    const [currentBudgetEnd, setCurrentBudgetEnd] = useState(sessionStorage.getItem('budgetEndDate'))// != null ? sessionStorage.getItem('budgetEndDate') : new Date())

    const handleConfirm = () => {
        if (budget == "0.00") {
            alert("Budget Must Be Greater Than 0")
        } else if (budgetEndDate <= budgetStartDate) {
            // console.log(budgetStartDate.toISOString())
            // console.log(budgetEndDate.toISOString())
            alert("Budget Start Date must be earlier than Budget End Date")
        } else {
            sessionStorage.setItem('budget', budget)
            sessionStorage.setItem('budgetStartDate', budgetStartDate)
            sessionStorage.setItem('budgetEndDate', budgetEndDate)
            setCurrentBudget(budget)
            setCurrentBudgetStart(budgetStartDate)
            setCurrentBudgetEnd(budgetEndDate)
            setBudget("0.00")
            alert('Successfully Changed Budget')
        }
    }

    function isNumeric(num){
        return !isNaN(num)
      }

    const showStartDatePicker = () => {
        setStartDatePickerVisibility(true);
      };

    const showEndDatePicker = () => {
        setEndDatePickerVisibility(true);
      };
    
    const hideStartDatePicker = () => {
        setStartDatePickerVisibility(false);
      };

    const hideEndDatePicker = () => {
        setEndDatePickerVisibility(false);
      };


    const handleSelectStartDate = (date) => {
        //console.warn("A date has been picked: ", date);
        setBudgetStartDate(date);
        hideStartDatePicker();
    };

    const handleSelectEndDate = (date) => {
        console.warn("A date has been picked: ", date);
        setBudgetEndDate(date);
        hideEndDatePicker();
      };

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
            <Text style={{fontSize: 25, marginBottom: 10}}>For {currentBudgetStart.toISOString().slice(0,10)} to {currentBudgetEnd.toISOString().slice(0,10)}</Text>
            <Text style={{fontSize: 35, color:'green'}}>{isNumeric(currentBudget) ? "$" : ""}{currentBudget}</Text>
        </View>
        <View style={styles.budgetDateContainer}>
            <Text style={styles.dateStyle}>Start Date:  {budgetStartDate.toISOString().slice(0,10)}</Text>
            <Button style={{marginRight: 30}} title="Select Date" onPress={showStartDatePicker} />
            <DateTimePickerModal
                            isVisible={isStartDatePickerVisible}
                            mode="date"
                            onConfirm={handleSelectStartDate}
                            onCancel={hideStartDatePicker}
                            isDarkModeEnabled={Appearance.getColorScheme() === 'dark' ? true : false}
            />
        </View>
        <View style={styles.budgetDateContainer}>
            <Text style={styles.dateStyle}>End Date:  {budgetEndDate.toISOString().slice(0,10)}</Text>
            <Button style={{marginRight: 30}} title="Select Date" onPress={showEndDatePicker} />
            <DateTimePickerModal
                            isVisible={isEndDatePickerVisible}
                            mode="date"
                            onConfirm={handleSelectEndDate}
                            onCancel={hideEndDatePicker}
                            isDarkModeEnabled={Appearance.getColorScheme() === 'dark' ? true : false}
            />
        </View>
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
        marginTop: 10,
    },
    displayBudget: {
        alignItems: 'center',
        marginTop: 10,
        marginBottom: 10
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
        fontSize: 30,
    },
    budgetInputView: {
        backgroundColor: 'white',
        alignItems: 'center',
        borderRadius: 30,
        marginHorizontal: 20,
        marginBottom: 20,
    },
    budgetText: {
        fontSize: 40
    },
    budgetDateContainer: {
        flexDirection:"row",
        justifyContent:"space-between",
        marginTop: 10
    },
    dateStyle: {
        marginLeft: 10,
        fontSize: 20
    }

})