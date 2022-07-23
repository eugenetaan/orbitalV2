import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, TextInput, Button, Appearance, KeyboardAvoidingView} from 'react-native'
import { sessionStorage } from '../localstorage'
import { Dropdown } from 'react-native-material-dropdown-v2'
import DateTimePickerModal from 'react-native-modal-datetime-picker'
import { useIsFocused } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/core';
import { logBillsToDB } from '../components/dbLogDataFunctions'

const periodsList = [{value : "Daily"}, {value: "Weekly"}, {value: "Monthly"}, {value: "Annual"}]

const AddBillScreen = () => {
    const [enteredTitle, setEnteredTitle] = useState("");
    const [enteredAmount, setEnteredAmount] = useState("0.00");
    const [enteredDate, setEnteredDate] = useState(new Date());
    const [periodsAvailable, setPeriodsAvailable] = useState(periodsList);
    const [period, setPeriod] = useState('Daily');
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const navigation= useNavigation();

    function isNumeric(num){
        return !isNaN(num)
    }

    const handleAddBill = () => {
        if (enteredTitle.length == 0) {
            alert("Bill Title Cannot Be Empty");
        } else if (!isNumeric(enteredAmount)) {
            alert('Amount is not valid')
        } else if (parseFloat(enteredAmount) <= 0.01) {
            alert('Amount is not valid')
        } else if (enteredDate < new Date()) {
            alert("Next due date must be later than present")
        } else {
            var newBillItem = {
                billName : enteredTitle,
                billAmount : parseFloat(enteredAmount).toFixed(2),
                billPeriod : period,
                nextDue : enteredDate.toISOString(),
                key : Math.random()
            }
            prevBills = sessionStorage.getItem('bills');
            billsUpdated = [newBillItem, ...prevBills];
            sessionStorage.setItem('bills', billsUpdated);
            logBillsToDB();
            setEnteredAmount("0.00");
            setEnteredTitle('');
            alert('Bill Successfully Added');
        }
    }
    
    const titleOnChangeHandler = (event) => {
        setEnteredTitle(event.target.value);
    }
    
    const dateOnChangeHandler = (event) => {
        setEnteredDate(event.target.value);
    }

    const amountOnChangeHandler = (event) => {
        setEnteredAmount(event.target.value);
    }

    const showDatePicker = () => {
        setDatePickerVisibility(true);
    };
    
      const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };

    const handleConfirm = (date) => {
        //console.warn("A date has been picked: ", date);
        setEnteredDate(date);
        hideDatePicker();
    };

    return (
        <KeyboardAvoidingView
            style = {styles.container}
            //behaviour="padding"
        >
            <View style={styles.inputContainer}>
                <Text style={{marginTop: "40%"}}>Bill Name</Text>
                <TextInput 
                    placeholder="Bill Name"
                    value = {enteredTitle}
                    onChangeText = {text => setEnteredTitle(text)}
                    style={styles.input}                
                />
                <Text>Bill Amount</Text>
                <TextInput 
                    placeholder="Bill Amount"
                    value = {enteredAmount}
                    onChangeText = {text => setEnteredAmount(text)}
                    style={styles.input}       
                />
                <Dropdown label='Period' data={periodsAvailable} onChangeText={value => setPeriod(value)} value={period}></Dropdown>
                <View style={styles.dateDisplay}>
                    <View style={styles.dateContainer}>
                        <Text style={{fontSize:20}}>Next Due On:</Text>
                        <Text style={{fontSize:20}}>{enteredDate.toISOString().slice(0,10)}</Text>
                    </View>
                    <Button style={{marginRight: 30}} title="Select Date" onPress={showDatePicker} />
                    <DateTimePickerModal
                        isVisible={isDatePickerVisible}
                        mode="date"
                        onConfirm={handleConfirm}
                        onCancel={hideDatePicker}
                        isDarkModeEnabled={Appearance.getColorScheme() === 'dark' ? true : false}          
                    />
                </View>
            </View>

            <View style={styles.buttonContainer}>
                <TouchableOpacity
                    onPress={handleAddBill}
                    style={styles.button}
                >
                    <Text style={styles.buttonText}>Add Bill</Text>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    )

}

export default AddBillScreen;


const styles= StyleSheet.create({
    container: {
        flex: 1,
        //justifyContent: 'center',
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
        backgroundColor: "#AEB8FE",
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
    dateContainer: {
        flexDirection: 'row',
        justifyContent: "space-between",
        marginBottom: 15
    }

})