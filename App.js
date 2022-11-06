import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import 'react-native-gesture-handler';
import React from 'react';
// import PharmacyBottomNavBar from './components/PharmacyBottomNavBar';
import ChannelingCenterBottomNavBar from './components/ChannelingCenterBottomNavBar';
import PharmacyBottomNavBar from "./components/PharmacyBottomNavBar";
import AddMedicineForm from "./components/AddMedicineForm";
import UpdateMedicineForm from "./components/UpdateMedicineForm";
import PatientBottomNavBar from "./components/PatientBottomNavBar";
import PatientRegisterForm from "./components/PatientRegisterForm";

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
