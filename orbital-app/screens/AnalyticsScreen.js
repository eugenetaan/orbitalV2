import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, FlatList, TouchableOpacity, Dimensions } from 'react-native'
import { sessionStorage } from '../localstorage'
import { addColoursToCats, getCategoricalSpending, getCatsAsArray } from '../components/analyticsFunctions';
import { useNavigation } from '@react-navigation/core';
import {
    LineChart,
    BarChart,
    PieChart,
    ProgressChart,
    ContributionGraph,
    StackedBarChart
    } from "react-native-chart-kit";


const AnalyticsScreen = () => {
    //const [graphCats, setGraphCats] = useState(sessionStorage.getItem('Cats'))
    const [pieChartData, setPieChartData] = useState(addColoursToCats());
    const navigation = useNavigation();

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            setPieChartData(addColoursToCats());
        });
        
        return unsubscribe;
    }, [navigation]);

    const chartConfig = {
        backgroundGradientFrom: "#1E2923",
        backgroundGradientFromOpacity: 0,
        backgroundGradientTo: "#08130D",
        backgroundGradientToOpacity: 0.5,
        color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
        strokeWidth: 2, // optional, default 3
        barPercentage: 0.5,
        useShadowColorFromDataset: false // optional
    };


    return (
    <View>
        <View>
            <Text style={styles.chartTitle}>Recent Spending</Text>
            <LineChart
                data={{
                labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
                datasets: [
                    {
                    data: [
                        Math.random() * 100,
                        Math.random() * 100,
                        Math.random() * 100,
                        Math.random() * 100,
                        Math.random() * 100,
                        Math.random() * 100
                    ]
                    }
                ]
                }}
                width={Dimensions.get("window").width} // from react-native
                height={220}
                yAxisLabel="$"
                yAxisSuffix="k"
                yAxisInterval={1} // optional, defaults to 1
                chartConfig={{
                backgroundColor: "#e26a00",
                backgroundGradientFrom: "#fb8c00",
                backgroundGradientTo: "#ffa726",
                decimalPlaces: 2, // optional, defaults to 2dp
                color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                style: {
                    borderRadius: 16
                },
                propsForDots: {
                    r: "6",
                    strokeWidth: "2",
                    stroke: "#ffa726"
                }
                }}
                bezier
                style={{
                marginVertical: 8,
                borderRadius: 16
                }}
            />
        </View>
        <View>
            <Text style={styles.chartTitle}>Categorical Spending</Text>
            <PieChart
                data = {addColoursToCats()}
                //data={data}
                height={250}
                chartConfig={chartConfig}
                accessor={"totalSpend"}
                width={Dimensions.get("window").width} // from react-native
                //height={220}
                //chartConfig={chartConfig}
                backgroundColor={"transparent"}
                paddingLeft={"5"}
                center={[10, 10]}

            />
        </View>
    </View>
    )
}

export default AnalyticsScreen;

const styles = StyleSheet.create({
    chartTitle: {
        fontSize:20,
        fontWeight:"bold",
        textAlign: 'center',
        marginTop: 10
    }
})