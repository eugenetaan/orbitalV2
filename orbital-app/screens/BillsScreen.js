import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, FlatList, Animated, TouchableOpacity } from 'react-native'
import { Swipeable } from 'react-native-gesture-handler'
import { useNavigation } from '@react-navigation/core';
import { logBillsToDB } from '../components/dbLogDataFunctions'

//var dummyBills = [{billName: 'Singtel', amount: "9.99", period: 'Monthly', nextDue: '19-08-2022'}]
//sessionStorage.setItem()

const BillsScreen = () => {
    const [bills, setBills] = useState(sessionStorage.getItem('bills'));
    const navigation = useNavigation();

       // allows state to update upon screen focus ( very useful!!)
       useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {   
            setBills(sessionStorage.getItem('bills'))
        });
        
        return unsubscribe;
    }, [navigation]);


    const handleAddBillNavigation = () => {
        navigation.navigate("Add Bills")
    }

    const checkBillDue = (nextDue) => {
        var todayDate = new Date().toISOString().slice(0,10);
        var billDue = nextDue.slice(0,10);
        return billDue<=todayDate ? "red" : "black"
    }

    const BillItem = (bill) => {
        console.log(bill)
        const {billName, billAmount, billPeriod, nextDue, key} = bill.bill;

        const handleDeleteBill = () => {
            var newBills = bills.filter(function(bill){
                return bill.key !== key;
            })
            sessionStorage.setItem('bills', newBills);
            logBillsToDB();
            setBills(newBills);
        } 
    

        const swipeRight = (progress,dragX) =>{
          const scale = dragX.interpolate({
            inputRange:[-200,0],
            outputRange:[1,0.5],
            extrapolate:'clamp'
          })
          return(
            <Animated.View style={{backgroundColor:'red',width:"100%",justifyContent:'center'}}>
              <Animated.Text style={{marginLeft:'auto',marginRight:50, fontSize:15, fontWeight:'bold',transform:[{scale}]}}>Delete Bill</Animated.Text>
            </Animated.View>
          )
        }

        
        return (
            <Swipeable renderRightActions={swipeRight} rightThreshold={-200} onSwipeableOpen={handleDeleteBill}>
                <Animated.View >
                    <View style={styles.billCard}>
                        <View style={styles.billName}>
                            <Text style={{fontSize: 25, fontWeight: 'bold', color:checkBillDue(nextDue) }}>{billName}</Text>
                        </View>
                        <View style={styles.billContent}>
                            <Text style={styles.billContentText}>Amount: ${billAmount}</Text>
                            <Text style={styles.billContentText}>Period: {billPeriod}</Text>
                            <Text style={styles.billContentText}>Next Due On: {nextDue.slice(0,10)}</Text>
                        </View>
                    </View>
                </Animated.View>
            </Swipeable>
        )
    }

    return (
    <View>
        <TouchableOpacity style={styles.button} onPress={handleAddBillNavigation}>
            <Text style={{fontSize: 20}}>Add New Bill</Text>
        </TouchableOpacity>
        <View style={{marginTop: 10, height: "80%"}}>
                <FlatList data={bills}
                  ListEmptyComponent={<View><Text style={{textAlign: 'center', marginTop: 70}}>No Bills Added!</Text></View>}
                  renderItem={({item}) => <BillItem bill={item}/>}            
                />
        </View>
    </View>
    )
}

export default BillsScreen;


const styles = StyleSheet.create({
    button: {
        backgroundColor: "#AEB8FE",
        width: 150,
        alignItems: 'center',
        borderRadius: 20,
        height:50,
        paddingTop: 12,
        alignSelf: 'center',
        marginTop: 20,
        marginBottom: 10, 
    },
    billCard: {
        //backgroundColor: "#AEB8FE",
        borderRadius: 15,
        width: '90%',
        alignSelf: 'center',
        borderWidth: 1,
        marginBottom: 10,
    },
    billName: {
        paddingLeft: 10,
        paddingTop: 5,
        paddingBottom: 5,
        borderBottomWidth:2,
        borderRadius: 15
    },
    billContent: {
        paddingLeft: 10,
        paddingBottom: 10,
        paddingTop: 10,
    },
    billContentText: {
        fontSize: 16
    }
})