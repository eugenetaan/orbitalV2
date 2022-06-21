import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, SafeAreaView, Image } from 'react-native'
import { NavigationContainer } from "@react-navigation/native";
import { sessionStorage } from '../localstorage'
import { db } from '../Firebase'
import Tabs from '../navigator/navbar'
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';


let DUMMY = [
    {title: "netflix", cat:"entertainment", amount:"10.99", date:"10-10-2022", key:1},
    {title: "spotify", cat:"music", amount:"10.99", date:"10-10-2022", key:2}
]

sessionStorage.setItem("dummyExpenses", DUMMY);

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
                <View style={StyleSheet.profileImage}>
                    <Image
                    source={require("../assets/testPhoto.jpg")}
                    style={styles.image}
                    resizeMode="contain"
                    ></Image>
                </View>
            </View>
            <View style={styles.chart}>
                <Text style={{paddingLeft:"28%"}}>PlaceHolder for PIECHART</Text>
            </View>
            <View style={styles.recents}>
                <View style={styles.recentTopBarContainer}>
                    <Text style={{paddingLeft:20, fontSize:25, fontWeight:"bold"}}>Recents</Text>
                    <TouchableOpacity>
                        <Text style={{paddingRight:20,fontSize:20, paddingTop:2}}>View All</Text>
                    </TouchableOpacity>
                </View>
                <View style={{height: "90%"}}>
                    <FlatList style={styles.list} data= {sessionStorage.getItem("dummyExpenses")}
                        renderItem={({item}) => (
                            <View style={styles.items}>
                                <View style={styles.itemCard}>
                                    <View>
                                        <Text style={styles.expenseTitle}>{item.title}</Text>
                                        <Text style={styles.expenseCategory}>{item.cat}</Text>
                                    </View>
                                        <Text style={styles.expenseAmount}>{item.amount}</Text>
                                </View>
                                {/* <View style={styles.expenseDatie}></View> */}
                            </View>
                        )}
                    ></FlatList>
                </View>
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
    },
    profileImage: {
        flex: 1,
        width: 180,
        height: 180,
        borderRadius: 250,
        overflow: "hidden",

    },
    image: {
        width: 60,
        height: 60,
        borderRadius: 500,
        marginTop:10,
        marginRight:10,
    },
    itemCard: {
        flex: 1,
        flexDirection: 'row',
        justifyContent:'space-between',
        backgroundColor: 'grey',
        borderRadius: 10,
        marginBottom: 10,
        paddingVertical: 10
    },
    list : {
    }


})