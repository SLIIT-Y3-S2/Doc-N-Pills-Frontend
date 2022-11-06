import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import 'react-native-gesture-handler';
import React from 'react';
// import PharmacyBottomNavBar from './components/PharmacyBottomNavBar';
import ChannelingCenterBottomNavBar from './components/ChannelingCenterBottomNavBar';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
        {/* <Stack.Navigator>
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Register" component={Register} />
          <Stack.Screen name="DriverScan" component={DriverScan} />
          <Stack.Screen
            name="Easy Going"
            component={BottomNavBar}
            options={{ headerShown: false }}
          />
        </Stack.Navigator> */}
        {/* <PharmacyBottomNavBar /> */}
        <ChannelingCenterBottomNavBar />

      </NavigationContainer>
  );
}
