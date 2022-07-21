import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, TextInput, Button, Appearance} from 'react-native'
import { sessionStorage } from '../localstorage'
import { Dropdown } from 'react-native-material-dropdown-v2'
import DateTimePickerModal from 'react-native-modal-datetime-picker'
import { useIsFocused } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/core';
import { logExpenseToDB } from '../components/dbLogDataFunctions'

//const DummyCats = [ {value: "Food"}, {value: "Entertainment"}, {value :"Transport"}]

//sessionStorage.setItem('categories', DummyCats)

const AddScreen = () => {
    const [enteredTitle, setEnteredTitle] = useState("");
    const [enteredAmount, setEnteredAmount] = useState("0.00");
    const [enteredDate, setEnteredDate] = useState(new Date());
    const [selectedCat, setSelectedCat] = useState("Transport");
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [catsAvailable, setCatsAvailable] = useState(sessionStorage.getItem('Cats'))
    const isFocused = useIsFocused();
    const navigation = useNavigation();
    // console.log(sessionStorage.getItem('dummyCats'))


    // allows state to update upon screen focus ( very useful!!)
    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            setCatsAvailable(sessionStorage.getItem('Cats'));
        });
    
        return unsubscribe;
      }, [navigation]);

    

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
            setEnteredAmount(enteredAmount.slice(0, enteredAmount.length - 4) + "." + enteredAmount[enteredAmount.length-4] + enteredAmount[enteredAmount.length-2]);
        } else if (enteredAmount > "0.99") {
            setEnteredAmount("0" + "." + enteredAmount[0] + enteredAmount[2]);
        }  else if (enteredAmount > "0.09") {
            setEnteredAmount('0.0' + enteredAmount[2])
        } else {
            setEnteredAmount("0.00")
        }
      };

    const handleAddExpense = () => {
        var newExpense = {
            title : enteredTitle,
            cat : selectedCat,
            amount : enteredAmount,
            date : enteredDate.toISOString(),
            key : Math.random()
        }

        if (enteredAmount==="0.00") {
            alert("Amount must be more than 0")
        } else if (enteredTitle==="") {
            alert('Title cannot be empty')
        } else {
            //console.info(sessionStorage.getItem('expenses'))
            var oldData = sessionStorage.getItem('expenses');
            // add items to front of array
            oldData.unshift(newExpense);
            var newData = oldData.sort(function(a,b) {
                return new Date(b.date) - new Date(a.date);
              });
            sessionStorage.setItem('expenses', newData);
            logExpenseToDB();
            //console.info(sessionStorage.getItem('dummyExpenses'))
            setEnteredAmount("0.00");
            setEnteredDate(new Date());
            setEnteredTitle("");
            alert('Expense Added Successfullly')
        }
    }

    // timeZoneOffsetInMinutes={480} to experiment with datepickdr and utc one day off probs

    return (
    <View sstyle={{backgroundColor: "#F1F2F6"}}>
        <View style={styles.viewingArea}>
            <View>
                <TextInput
                    placeholder="Expense Title"
                    value = {enteredTitle}
                    onChangeText = {text => setEnteredTitle(text)}
                    style={styles.titleInput} />
                <View style={styles.dateDisplay}>
                    <Text style={{fontSize:25, marginLeft: 20}}>{enteredDate.toISOString().slice(0,10)}</Text>
                    <Button style={{marginRight: 30}} title="Select Date" onPress={showDatePicker} />
                    <DateTimePickerModal
                        isVisible={isDatePickerVisible}
                        mode="date"
                        onConfirm={handleConfirm}
                        onCancel={hideDatePicker}
                        isDarkModeEnabled={Appearance.getColorScheme() === 'dark' ? true : false}          
                    />
                </View>
                <View style={styles.amountView}>
                    <Text style={styles.amountText}>{enteredAmount}</Text>
                </View>
                <Dropdown label='Categories' data={catsAvailable} onChangeText={value => setSelectedCat(value)} value={selectedCat}></Dropdown>
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
                <TouchableOpacity style={styles.numberButton} onPress={() => handleAddExpense()}><Text style={styles.numberButtonText}>Add</Text></TouchableOpacity>
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
    inputArea: {
        height: "150%"

    },
    viewingArea: {
        height: "25%"
    },
    titleInput: {
        backgroundColor: "white",
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 10,
        marginTop:10,
        marginHorizontal: 20,
        fontSize: 30
    },
    amountView: {
        backgroundColor: 'white',
        alignItems: 'center',
        borderRadius: 30,
        marginHorizontal: 20,
        marginBottom: 10,
    },
    amountText: {
        fontSize: 40
    },
    dateDisplay: {
        flexDirection:"row",
        justifyContent:"space-between",
        marginTop: 10
    }
})

export default AddScreen;