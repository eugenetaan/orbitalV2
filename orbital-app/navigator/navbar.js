import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import HomeScreen from '../screens/HomeScreen';
import AddScreen from '../screens/AddScreen';
import ProfileScreen from '../screens/ProfileScreen';
import GoalsScreen from '../screens/GoalsScreen';
import LeaderboardScreen from '../screens/LeaderboardScreen';


const Tab = createBottomTabNavigator();

const Tabs = () => {
    return(
        <Tab.Navigator>
           <Tab.Screen name='Goals'  component={GoalsScreen}></Tab.Screen>
           <Tab.Screen name='Home' options={{headerShown: false }} component={HomeScreen}></Tab.Screen>
           <Tab.Screen name='Add'  component={AddScreen}></Tab.Screen>
           <Tab.Screen name='Leaderboard'  component={LeaderboardScreen}></Tab.Screen>
           <Tab.Screen name='Profile' component={ProfileScreen}></Tab.Screen>
        </Tab.Navigator>    
    );
}

export default Tabs;