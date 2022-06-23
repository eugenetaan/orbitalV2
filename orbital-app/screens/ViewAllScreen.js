import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, FlatList } from 'react-native'
import { sessionStorage } from '../localstorage'

const ViewAllScreen = () => {

    return (
        <View style={{marginTop: 10}}>
                <FlatList data= {sessionStorage.getItem("dummyExpenses")}
                    renderItem={({item}) => (
                        <View style={styles.items}>
                            <View style={styles.itemCard}>
                                <View>
                                    <Text style={styles.expenseTitle}>{item.title}</Text>
                                    <Text style={styles.expenseCategory}>{item.cat}</Text>
                                </View>
                                    <Text style={styles.expenseAmount}>{item.amount}</Text>
                                </View>     
                            </View>
                            )}>
                </FlatList>
        </View>
        )
}

export default ViewAllScreen;


const styles = StyleSheet.create({
    itemCard: {
        flex: 1,
        flexDirection: 'row',
        justifyContent:'space-between',
        backgroundColor: 'grey',
        borderRadius: 10,
        marginBottom: 10,
        paddingVertical: 10
    },
    items : {
    }
})