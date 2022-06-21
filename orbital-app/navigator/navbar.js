import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

import HomeScreen from '../screens/HomeScreen';
import AddScreen from '../screens/AddScreen';
import ProfileScreen from '../screens/ProfileScreen';
import GoalsScreen from '../screens/GoalsScreen';
import LeaderboardScreen from '../screens/LeaderboardScreen';


const Tab = createBottomTabNavigator();

const HomeIcon = () => {

}

// options={{tabBarIcon:{goalsIcon}}}

const Tabs = () => {
    return(
        <Tab.Navigator
            screenOptions={({route}) => ({
                tabBarIcon: ({focused, color, size}) => {
                    let iconName;
                    let rn=route.name;

                    if (rn === 'Home') {
                        iconName = focused ? 'home' : 'home-outline';
                    } else if ( rn === "Goals") {
                        iconName = focused ? 'ios-rocket' : 'ios-rocket-outline';
                    } else if ( rn === "Add") {
                        iconName = focused ? 'md-add-circle' : 'md-add-circle-outline';
                    } else if ( rn === "Leaderboard") {
                        iconName = focused ? 'bar-chart' : 'bar-chart-outline';
                    } else if ( rn === "Profile") {
                        iconName = focused ? 'person' : 'person-outline';
                    }

                    return <Ionicons name={iconName} size={size} color={color}/>
                },
            })}>
            <Tab.Screen name='Home' options={{headerShown: false}} component={HomeScreen}></Tab.Screen>
            <Tab.Screen name='Goals' component={GoalsScreen}></Tab.Screen>
            <Tab.Screen name='Add'  component={AddScreen}></Tab.Screen>
            <Tab.Screen name='Leaderboard'  component={LeaderboardScreen}></Tab.Screen>
            <Tab.Screen name='Profile' component={ProfileScreen}></Tab.Screen>
        </Tab.Navigator>    
    );
}

export default Tabs;