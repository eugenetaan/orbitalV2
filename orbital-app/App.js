import { StatusBar } from 'expo-status-bar';
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
//import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "./screens/LoginScreen";
import { StyleSheet, Text, View } from "react-native";
import HomeScreen from './screens/HomeScreen';
import navbar from "./navigator/navbar";
import RegisterScreen from './screens/RegisterScreen';
import ViewAllScreen from './screens/ViewAllScreen';
import SettingsScreen from './screens/SettingsScreen';
import BillsScreen from './screens/BillsScreen';
import BudgetScreen from './screens/BudgetScreen';
import CategoriesScreen from './screens/CategoriesScreen';
import ChangeUsernameScreen from './screens/ChangeUsernameScreen';
import AddBillScreen from './screens/AddBillScreen';
import registerNNPushToken from 'native-notify';


const Stack = createStackNavigator();

export default function App() {
  registerNNPushToken(3313, 'pHNaixT134xYCkOZbPDsMA');

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen options={{ headerShown: false }} name="Login" component={LoginScreen} />
        <Stack.Screen name="Home" component={navbar} options={{headerLeft: (props) => null , gestureEnabled: false, headerShown: false }} />
        <Stack.Screen options={{ headerShown: false }} name="Register" component={RegisterScreen} />
        <Stack.Screen name="View All" component={ViewAllScreen} />
        <Stack.Screen name="Settings" component={SettingsScreen} />
        <Stack.Screen name="Bills" component={BillsScreen} />
        <Stack.Screen name="Categories" component={CategoriesScreen} />
        <Stack.Screen name="Budget" component={BudgetScreen} />
        <Stack.Screen name="ChangeUsername" component={ChangeUsernameScreen} />
        <Stack.Screen name="Add Bills" component={AddBillScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
