import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/core';
import { sessionStorage } from '../localstorage'

const ProfileScreen = () => {
    const navigation = useNavigation();
    const [username, setUsername] = useState(sessionStorage.getItem('username'))

    var budgetAmount = sessionStorage.getItem('currentBudget')

    const handleSettingsPress = () => {
        navigation.navigate('Settings')
    }


    // changed you have saved this month to calculate budget - expenses
    // style={{backgroundColor: '#E5E5E5'}}
    return (
    <View>
        <View style={styles.profileTop}>
            <View style={StyleSheet.profileImage}>
                <Image
                    source={require("../assets/testPhoto.jpg")}
                    style={styles.image}
                    resizeMode="contain"
                ></Image>
            </View>
            <Text style={styles.userName}>{username}</Text>
        </View>
        {/* <View style={styles.totalSaved}>
            <Text style={{fontSize: 20, color:"grey"}}>Total Saved This Month</Text>
            <Text style={{fontSize: 40, color:"green"}}>$1234</Text>
        </View> */}
        <View style={styles.buttonView}>
            <TouchableOpacity style={styles.profileButton}>
                <Text style={{fontSize: 20, color:"white"}}>View Friends</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.profileButton} onPress={handleSettingsPress}>
                <Text style={{fontSize: 20, color:"white"}}>Settings</Text>
            </TouchableOpacity>
        </View>
        <View style={styles.financialArticlesView}>
            <View style={{flexDirection: "row", justifyContent:"space-between", marginHorizontal: 10, marginTop: 25}}>
                <Text style={{fontSize:25, fontWeight:"bold"}}>Saved Articles</Text>
                <TouchableOpacity>
                    <Text style={{fontSize:25}}>View All</Text>
                </TouchableOpacity>
            </View>
        </View>
        <View style={{'alignItems': 'center'}}>
            <TouchableOpacity style={styles.profileButton}>
                <Text style={{fontSize: 15, color:"white"}}>Find More Articles</Text>
            </TouchableOpacity>
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
        width: 150,
        alignItems: 'center',
        borderRadius: 20,
        height:50,
        paddingTop: 12
    },
    financialArticlesView: {
    },
    totalSaved: {
        alignItems: 'center',
        marginTop:5,
    }
})