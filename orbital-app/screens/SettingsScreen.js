import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, TouchableOpacity, View, Button, FlatList } from 'react-native'
import { useNavigation } from '@react-navigation/core';
import { auth } from "../Firebase";
import { sessionStorage } from "../localstorage";


const SettingsScreen = () => {
    const navigation = useNavigation();

    // include code to update everything eg expenses/budget/categories to db
    const handleSignOut = () => {
        auth
            .signOut()
            .then(() => {navigation.navigate("Login")})
            .catch((error) => {alert("Something went wrong please try again")});
    }


    use


    const handleSettingsPress = (keyName) => {
        navigation.navigate(keyName);
    }

    return (
        <View>
            <FlatList
                style={styles.flcontainer}
                data={[
                {key: 'Bills'},
                {key: 'Budget'},
                {key: 'Categories'},
                ]}
                renderItem={({item}) => 
                <TouchableOpacity>
                    <Text style={styles.settingsOptions} onPress={() => handleSettingsPress(item.key)}>{item.key}</Text>
                </TouchableOpacity>}
            />
            <View style={styles.container}>
                <TouchableOpacity style={styles.signOutButton} onPress={handleSignOut} >
                    <Text style={{fontSize:'25', fontWeight:'bold', color: 'white'}}>Sign Out</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

export default SettingsScreen;

const styles = StyleSheet.create({
    settingsOptions: {
        height: 60,
        width: "100%",
        backgroundColor: 'grey',
        textAlign: 'center',
        fontSize: 30,
        paddingTop: 15,
        borderColor: "#fcfdfb",
        borderWidth: 0.5,
    },
    signOutButton: {
        backgroundColor: 'darkred',
        borderRadius: 35,
        height:50,
        width: 150,
        alignItems: 'center',
        paddingTop: 10,
    },
    container: {
        alignItems: 'center',  
    },
    flcontainer: {
        height: "85%"
    }
})

