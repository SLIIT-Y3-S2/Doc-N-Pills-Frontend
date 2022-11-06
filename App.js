import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import 'react-native-gesture-handler';
import React from 'react';
import PharmacyBottomNavBar from './components/PharmacyBottomNavBar';
import AddMedicineForm from './components/AddMedicineForm'
import UpdateMedicineForm from './components/UpdateMedicineForm'

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="DocNPills" component={PharmacyBottomNavBar} options={{ headerShown: false }} /> 
          <Stack.Screen name="Add Medicine" component={AddMedicineForm} />
          <Stack.Screen name="Update Medicine" component={UpdateMedicineForm} />
        </Stack.Navigator>
    </NavigationContainer>
  );
}
 