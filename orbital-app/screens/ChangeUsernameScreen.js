import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native'
import { sessionStorage } from '../localstorage';
import { changeUsername } from '../components/dbLogDataFunctions';

const ChangeUsernameScreen = () => {
    const [newUsername, setNewUsername] = useState("");

    const handleChangeUsername = () => {
        if (newUsername.length == 0) {
            alert("Username cannot be empty");
        } else if (newUsername === sessionStorage.getItem('username')) {
            alert('New Username is the same as current username');
        } else {
            sessionStorage.setItem('username', newUsername);
            changeUsername(newUsername);
            setNewUsername("");
        }
    }
    

    return (
    <View>
        <View style={styles.viewBox}>
            <Text style={{fontSize: 20, fontWeight: 'bold'}}>Current Username: {sessionStorage.getItem('username')}</Text>
        </View>
        <View style={styles.inputArea}>
            <Text style={{fontSize:20, textAlign:"center"}}>Change Username</Text>
            <TextInput 
                placeholder='Enter New Username'
                value = {newUsername}
                onChangeText = {text => setNewUsername(text)}
                style={styles.newCatInput} 
            />
            <TouchableOpacity style={styles.confirmInputCatButton} onPress={() => handleChangeUsername()}>
                <Text style={{fontSize: 20, fontWeight: 'bold'}}>Set</Text>
            </TouchableOpacity>
        </View>
    </View>
    )
}

export default ChangeUsernameScreen;


const styles = StyleSheet.create({
    newCatInput: {
        backgroundColor: "white",
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 10,
        marginTop:5,        
    },
    confirmInputCatButton: {
        backgroundColor: "#5F7DDE",
        width: 150,
        alignItems: 'center',
        borderRadius: 20,
        height:50,
        paddingTop: 12,
        alignSelf: 'center',
        marginTop: 20 
    },
    inputArea: {
        marginTop: 50
    },
    viewBox: {
        alignItems: 'center',
        marginTop: 20
    }

})