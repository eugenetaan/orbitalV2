import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, SafeAreaView, Image, RefreshControl } from 'react-native'
import { useNavigation } from '@react-navigation/core';
import { sessionStorage } from '../localstorage'
import { db } from '../Firebase'
import Tabs from '../navigator/navbar'
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';
import { calcRemaingBudget, calcTotalExpensesDuringBudgetDates} from "../components/budgetCalcFunctions";
import { logExpensesToDB } from '../components/dbLogDataFunctions';

// let DUMMY = [
//     {title: "netflix", cat:"entertainment", amount:"10.99", date:new Date(), key:1},
//     {title: "spotify", cat:"music", amount:"10.99", date:new Date(), key:2}
// ]

// sessionStorage.setItem("currentBudget", "No Budget Set")
// sessionStorage.setItem("dummyExpenses", DUMMY);

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const HomeScreen = () => {
    const navigation = useNavigation();
    const [username, setUsername] = useState("");
    const [isFetching, setIsFetching] = useState(false);
    const [remainingBudget, setRemainingBudget] = useState(calcRemaingBudget())
    const [recents, setRecents] = useState(sessionStorage.getItem("expenses")).sort(function(a,b) {
        return b.date - a.date;
      });
    var currentUserEmail = sessionStorage.getItem("email");
    
   // allows state to update upon screen focus ( very useful!!)
    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            setRemainingBudget(calcRemaingBudget());
            setUsername(sessionStorage.getItem('username'))
            //updateData();
        });
        
        return unsubscribe;
    }, [navigation]);
    

    const updateData = () => {
        setRecents(sessionStorage.getItem("expenses")).sort(function(a,b) {
            return b.date - a.date;
        })
    }


    function isNumeric(num){
        return !isNaN(num)
      }
    

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            var expensesNew = sessionStorage.getItem('expenses')

            db.collection('profiles')
            .doc(currentUserEmail)
            .update({
                expenses: expensesNew
            })
        });
        
        return unsubscribe;
    }, [navigation]);  

            

    const onRefresh = async () => {
        setIsFetching(true);
        await sleep(1000);
        setRecents(sessionStorage.getItem('expenses'));
        setIsFetching(false);
      };

    // get username from db init
    useEffect(() => {
        let name;
        const user = db.collection('profiles')
            .doc(currentUserEmail)
            .get()
            .then((doc) => {
                //console.log(doc.data());
                name = doc.data().username;
                setUsername(name);
                sessionStorage.setItem('username', name);
            })
    }, [])

    // get categories init
    useEffect(() => {
        let cats;
        const user = db.collection('profiles')
            .doc(currentUserEmail)
            .get()
            .then((doc) => {
                cats = doc.data().categories;
                sessionStorage.setItem('Cats', cats);
            })
    }, [])


    // get bills init 
    useEffect(() => {
        let bills;
        const user = db.collection('profiles')
            .doc(currentUserEmail)
            .get()
            .then((doc) => {
                bills = doc.data().bills;
                sessionStorage.setItem('bills', bills);
            })
    }, [])


    // get budget
    // useEffect(() => {
    //         let budget;
    //         const user = db.collection('profiles')
    //             .doc(currentUserEmail)
    //             .get()
    //             .then((doc) => {
    //                 //budget = doc.data().budget;
    //                 console.log(budget)
    //                 startDate = doc.data().budgetStartDate;
    //                 endDate = doc.date().budgetEndDate;
    //                 sessionStorage.setItem('budget', budget);
    //                 sessionStorage.setItem('budgetStartDate', startDate);
    //                 sessionStorage.setItem('budgetEndDate', endDate);
    //             })
    //     }, [])

    // get expenses
    // useEffect(() => {
    //         let expenses;
    //         const user = db.collection('profiles')
    //             .doc(currentUserEmail)
    //             .get()
    //             .then((doc) => {
    //                 expenses = doc.data().expenses;
    //                 sessionStorage.setItem('expenses', expenses);
    //             })
    //     }, [])


    

    const handleViewAll = () => {
        navigation.navigate("ViewAll")
    }

    return (
        <SafeAreaView style={styles.homeContainer}>
            <View style={styles.homeTopBar}>
                <Text style={styles.greeting}>Hello, {username}!</Text>
                {/* <View style={StyleSheet.profileImage}>
                    <Image
                    source={require("../assets/testPhoto.jpg")}
                    style={styles.image}
                    resizeMode="contain"
                    ></Image>
                </View> */}
            </View>
            <View style={styles.chart}>
                <Text style={{textAlign: 'center', fontSize:20, fontWeight: 'bold', marginBottom: 20}}>Remaining Budget:</Text>
                <Text style={{textAlign: 'center', color: parseFloat(remainingBudget) > 0 ? 'green' : "red", fontSize: 30, fontWeight: 'bold'}}>{isNumeric(remainingBudget) ? "$" : ""}{remainingBudget}</Text>
            </View>
            <View style={styles.recents}>
                <View style={styles.recentTopBarContainer}>
                    <Text style={{paddingLeft:20, fontSize:25, fontWeight:"bold"}}>Recents</Text>
                    <TouchableOpacity onPress={handleViewAll}>
                        <Text style={{paddingRight:20,fontSize:20, paddingTop:2}}>View All</Text>
                    </TouchableOpacity>
                </View>
                <View style={{height: "90%"}}>
                    <FlatList style={styles.list} data={recents}
                        ListEmptyComponent={<View><Text style={{textAlign: 'center', marginTop: 70}}>No Recent Expenses!</Text></View>}
                        refreshControl={
                            <RefreshControl
                                onRefresh={onRefresh}
                                refreshing={isFetching}
                            />}
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
        // justifyContent: "space-between",
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