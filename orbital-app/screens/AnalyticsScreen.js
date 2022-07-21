import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, FlatList, TouchableOpacity, Dimensions } from 'react-native'
import { addColoursToCats, getLatestSixMonths, getSpendingForLatestSixMonths} from '../components/analyticsFunctions';
import FlashMessage, { showMessage } from "react-native-flash-message";
import { useNavigation } from '@react-navigation/core';
import { LineChart, PieChart } from "react-native-chart-kit";


const AnalyticsScreen = () => {
    const [pieChartData, setPieChartData] = useState(addColoursToCats());
    const [latestSixMonths, setLatestSixMonths] = useState(getLatestSixMonths());
    const [latestSixMonthsSpending, setLatestSixMonthsSpending] = useState(getSpendingForLatestSixMonths())
    const navigation = useNavigation();

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            setPieChartData(addColoursToCats());
            setLatestSixMonths(getLatestSixMonths());
            setLatestSixMonthsSpending(getSpendingForLatestSixMonths())
        });
        return unsubscribe;
    }, [navigation]);

    const chartConfigPie = {
        backgroundGradientFrom: "#1E2923",
        backgroundGradientFromOpacity: 0,
        backgroundGradientTo: "#08130D",
        backgroundGradientToOpacity: 0.5,
        color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
        strokeWidth: 2, // optional, default 3
        barPercentage: 0.5,
        useShadowColorFromDataset: false // optional
    };

    const chartConfigLine={
        backgroundColor: "#e26a00",
        backgroundGradientFrom: "#fb8c00",
        backgroundGradientTo: "#ffa726",
        decimalPlaces: 2, // optional, defaults to 2dp
        color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
        labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
        style: { borderRadius: 16 },
        propsForDots: {
            r: "6",
            strokeWidth: "2",
            stroke: "#ffa726"
        }
        }


    return (
    <View style={{backgroundColor: "#F1F2F6"}}>
        <View>
            <Text style={styles.chartTitle}>Recent Spending</Text>
            <LineChart
                data={{
                labels: latestSixMonths,
                datasets: [
                    {
                    data: latestSixMonthsSpending
                    }
                ]
                }}
                width={Dimensions.get("window").width} // from react-native
                height={230}
                yAxisLabel="$"
                yAxisInterval={1} // optional, defaults to 1
                chartConfig={chartConfigLine}
                bezier
                onDataPointClick={({ value}) =>
                    showMessage({
                        message: "Total Spending: $" + `${value.toFixed(2)}`,
                        description: "Datapoint Value",
                        type: 'info',
                    })
                }
                style={{
                marginVertical: 8,
                borderRadius: 16
                }}
            />
            <FlashMessage duration={300} />
        </View>
        <View>
            <Text style={styles.chartTitle}>Categorical Spending</Text>
            <PieChart
                data = {pieChartData}
                //data={data}
                height={250}
                chartConfig={chartConfigPie}
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
        marginTop: 20
    }
})