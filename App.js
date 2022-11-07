import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import 'react-native-gesture-handler';
import React from 'react';
import ChannelingCenterBottomNavBar from './components/ChannelingCenterBottomNavBar';
import AddDoctorForm from "./components/AddDoctorForm";
import UpdateDoctorForm from "./components/UpdateDoctorForm";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
        
      <Stack.Navigator>
        <Stack.Screen
          name="DocNPills"
          component={ChannelingCenterBottomNavBar}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="Add Doctor" component={AddDoctorForm} />
        <Stack.Screen name="Update Doctor" component={UpdateDoctorForm} />
     
      </Stack.Navigator>
    </NavigationContainer>
  );
}
