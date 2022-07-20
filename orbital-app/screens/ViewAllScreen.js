import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, FlatList, Button, Animated } from 'react-native'
import { Swipeable } from 'react-native-gesture-handler'
import { sessionStorage } from '../localstorage'
import { logExpensesToDB } from '../components/dbLogDataFunctions'


const ViewAllScreen = () => {
    expensesData = sessionStorage.getItem("expenses");
    const [expenses, setExpenses] = useState(sessionStorage.getItem("expenses")).sort(function(a,b) {
      return b.date - a.date;
    });

    // custom ListItem component with item prop 
    const ListItem = (expense) => {
        const { amount, cat, date, key, title} = expense.expense;

        // console.log(expense)
        // console.log(date.slice(0,10))
        //const height = new Animated.Value(70)
        // const animatedDelete=() => {
        //     Animated.timing(height,{
        //         toValue: 0,
        //         duration: 350,
        //         useNativeDriver:false
        //     }).start(() => setExpenses(prevState => prevState.filter(e => e.id !== expense.key)))
        // }

        const handleDeleteExpense = () => {
            var newExpenses = expenses.filter(function(exp){
                return exp.key !== key;
            })
            sessionStorage.setItem('expenses', newExpenses);
            //logExpensesToDB();
            setExpenses(newExpenses);
        } 
    

        const swipeRight = (progress,dragX) =>{
          const scale = dragX.interpolate({
            inputRange:[-200,0],
            outputRange:[1,0.5],
            extrapolate:'clamp'
          })
          return(
            <Animated.View style={{backgroundColor:'red',width:"100%",justifyContent:'center'}}>
              <Animated.Text style={{marginLeft:'auto',marginRight:50, fontSize:15, fontWeight:'bold',transform:[{scale}]}}>Delete Expense</Animated.Text>
            </Animated.View>
          )
        }

        return(
          <Swipeable renderRightActions={swipeRight} rightThreshold={-200} onSwipeableOpen={handleDeleteExpense}>
            <Animated.View style={{backgroundColor:'transparent'}}>
                <View style={styles.items}>
                    <View style={styles.itemCard}>
                        <View style={styles.itemCardTopBar}>
                            <Text style={styles.expenseTitle}>{title}</Text>
                        </View>
                        <View style={styles.expenseBody}>
                          <View style={{paddingLeft: 10}}>
                            <Text style={styles.expenseCategory}>Category: {cat}</Text>
                            <Text style={styles.expenseDate}>Date: {date.slice(0,10)}</Text>
                          </View>
                          <Text style={styles.expenseAmount}>-${amount}</Text>
                        </View>
                    </View>     
                </View>
            </Animated.View>
          </Swipeable>
        )
      }

    return (
        <View style={{marginTop: 10}}>
                <FlatList data={expenses}
                  ListEmptyComponent={<View><Text style={{textAlign: 'center', marginTop: 70}}>No Expenses!</Text></View>}
                  renderItem={({item}) => <ListItem expense={item}/>}            
                />
        </View>
        )
}

export default ViewAllScreen;


const styles = StyleSheet.create({
    itemCard: {
        flex: 1,
        justifyContent:'space-between',
        backgroundColor: 'grey',
        borderRadius: 20,
        marginBottom: 10,
        paddingVertical: 10
    },
    itemCardTopBar : {
      borderBottomWidth: 1
    },
    expenseTitle: {
      fontSize: 20,
      paddingLeft: 10,
      fontWeight: "bold"
    },
    expenseBody: {
      flexDirection: 'row',
      justifyContent: "space-between",
      paddingTop: 10
    },
    expenseAmount: {
      fontSize: 18,
      color: 'darkred',
      paddingTop: 10
    },
    expenseCategory: {
      fontSize: 16,
      marginBottom: 5
    },
    expenseDate: {
      fontSize: 16
    }
})