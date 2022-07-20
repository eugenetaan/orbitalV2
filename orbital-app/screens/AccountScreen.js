import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, Image, TouchableOpacity, FlatList } from 'react-native'
import { useNavigation } from '@react-navigation/core';
import { sessionStorage } from '../localstorage'
import { auth, db } from "../Firebase";

const ProfileScreen = () => {
    const navigation = useNavigation();
    const [username, setUsername] = useState(sessionStorage.getItem('username'))

    var budgetAmount = sessionStorage.getItem('currentBudget')

    // include code to update everything eg expenses/budget/categories to db
    const handleSignOut = () => {
        auth
            .signOut()
            .then(logAllDataToDB())
            .then(() => {navigation.navigate("Login")})
            .catch((error) => {alert("Something went wrong please try again")});
    }

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            setUsername(sessionStorage.getItem('username'))
        });
        
        return unsubscribe;
    }, [navigation]);
    

        // split into diff parta and update whenever something is updated    
    const logAllDataToDB = () => {
        var currentUserEmail = sessionStorage.getItem('email')
        var expensesNew = sessionStorage.getItem('expenses')
        var budgetNew = sessionStorage.getItem('budget')
        var budgetStartDateNew = sessionStorage.getItem('budgetStartDate').toISOString()
        var budgetEndDateNew = sessionStorage.getItem('budgetEndDate').toISOString()
        var categoriesNew = sessionStorage.getItem('Cats')

        db.collection('profiles')
        .doc(currentUserEmail)
        .update({
            budget : budgetNew,
            budgetStartDate : budgetStartDateNew,
            budgetEndDate : budgetEndDateNew,
            categories : categoriesNew,
            expenses : expensesNew
        })
    }    


    const handleCUPress = () => {
        navigation.navigate('ChangeUsername')
    }

    const handleCPPress = () => {
        navigation.navigate("ChangePassword")
    }


    const handleAccountsPress = (keyName) => {
        navigation.navigate(keyName);
    }


    // changed you have saved this month to calculate budget - expenses
    // style={{backgroundColor: '#E5E5E5'}}
    return (
    <View>
        <View style={styles.profileTop}>
            <Text style={styles.userName}>{username}</Text>
        </View>
        <View style={styles.buttonView}>
            <TouchableOpacity style={styles.profileButton} onPress={handleCUPress}>
                <Text style={{fontSize: 20, color:"white"}}>Change Username</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.profileButton} onPress={handleCPPress}>
                <Text style={{fontSize: 20, color:"white"}}>Change Password</Text>
            </TouchableOpacity>
        </View>
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
                    <Text style={styles.settingsOptions} onPress={() => handleAccountsPress(item.key)}>{item.key}</Text>
                </TouchableOpacity>}
            />
            <View style={styles.container}>
                <TouchableOpacity style={styles.signOutButton} onPress={handleSignOut} >
                    <Text style={{fontSize:25, fontWeight:'bold', color: 'white'}}>Sign Out</Text>
                </TouchableOpacity>
            </View>
        </View>
    </View>
    )
}

export default ProfileScreen;


const styles = StyleSheet.create({
    profileImage: {
        flex: 1,
        width: 180,
        height: 180,
        borderRadius: 250,
        overflow: "hidden",
        justifyContent: 'center'
    },
    image: {
        width: 130,
        height: 130,
        borderRadius: 500,
        marginTop: 20
    },
    profileTop: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    userName: {
        marginTop: 20,
        fontSize:30
    },
    buttonView: {
        flexDirection: 'row',
        justifyContent: "space-around",
        marginTop: 20
    },
    profileButton: {
        backgroundColor: "#5F7DDE",
        width: 180,
        alignItems: 'center',
        borderRadius: 20,
        height:50,
        paddingTop: 12
    },
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
        marginTop: 20,
        height: "70%"
    }
})