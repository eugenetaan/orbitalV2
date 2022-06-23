import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, TouchableOpacity, View, Button, FlatList } from 'react-native'
import { useNavigation } from '@react-navigation/core';
import { auth } from "../Firebase";
import { sessionStorage } from "../localstorage";


const SettingsScreen = () => {
    const navigation = useNavigation();

    // include code to update everything to db
    const handleSignOut = () => {
        auth
            .signOut()
            .then(() => {navigation.navigate("Login")})
            .catch((error) => {alert("Something went wrong please try again")});
    }


    return (
        <View>
            <FlatList
                data={[
                {key: 'Bills'},
                {key: 'Budget'},
                {key: 'Notifications'},
                {key: 'Categories'},
                ]}
                renderItem={({item}) => 
                <TouchableOpacity>
                    <Text style={styles.settingsOptions}>{item.key}</Text>
                </TouchableOpacity>}
            />
            <View style={styles.container}>
                <Button style={styles.signOutButton} onPress={handleSignOut} title='Sign Out'></Button>
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
        
    },
    container: {
        justifyContent: 'flex-end',
        marginBottom: 36,
        
    }
})

