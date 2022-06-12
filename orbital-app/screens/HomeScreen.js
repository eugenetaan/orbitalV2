import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, SafeAreaView, Button } from 'react-native'
import { NavigationContainer } from "@react-navigation/native";
import { sessionStorage } from '../localstorage'
import { db } from '../Firebase'
import Tabs from '../navigator/navbar'
import { TouchableOpacity } from 'react-native-gesture-handler';


const HomeScreen = () => {
    const [username, setUsername] = useState("");
    var currentUserEmail = sessionStorage.getItem("email");

    useEffect(() => {
        let name = "";
        const user = db.collection('profiles')
            .doc(currentUserEmail)
            .get()
            .then((doc) => {
                console.log(doc.data());
                name = doc.data.username;
                setUsername(name);
            })
    }, [])

    return (
        <SafeAreaView style={styles.homeContainer}>
            <View style={styles.homeTopBar}>
                <Text style={styles.greeting}>Hello, Steven!</Text>
                <Text>PlaceHolder for Pic</Text>
            </View>
            <View style={styles.chart}>
                <Text style={{paddingLeft:"28%"}}>PlaceHolder for PIECHART</Text>
            </View>
            <View style={styles.recents}>
                <View style={styles.recentTopBarContainer}>
                    <Text style={{paddingLeft:20, fontSize:25, fontWeight:"bold"}}>Recents</Text>
                    {/* <Button title='View All'></Button> */}
                    <TouchableOpacity>
                        <Text style={{paddingRight:20,fontSize:20, paddingTop:2}}>View All</Text>
                    </TouchableOpacity>
                </View>
                <li>
                    
                </li>
            </View>
        </SafeAreaView>
            
    )
}

export default HomeScreen;

const styles = StyleSheet.create({
    homeContainer: {
        flex:1,
    },
    homeTopBar: {
        flex: 1,
        justifyContent: "space-between",
        flexDirection: 'row',
    },
    greeting: {
        fontSize: 35,
        fontWeight: 'bold',
        paddingLeft: 20,
        paddingTop: 20,
    },
    chart :{
        flex: 1,
    },
    recents : {
        flex: 2.5,
    },
    recentTopBarContainer: {
        flex: 1,
        flexDirection:'row',
        justifyContent: "space-between",
    }
    

})