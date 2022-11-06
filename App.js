import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import Login from './components/Login';
import Register from './components/Register';
import SysAdmin from './components/SysAdmin';
import AdminWelcome from './components/AdminWelcome';
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import "react-native-gesture-handler";
import PharmacyBottomNavBar from "./components/PharmacyBottomNavBar";
import AddMedicineForm from "./components/AddMedicineForm";
import UpdateMedicineForm from "./components/UpdateMedicineForm";
import PatientBottomNavBar from "./components/PatientBottomNavBar";
import PatientRegisterForm from "./components/PatientRegisterForm";

const Stack = createStackNavigator();

export default function App() {
  const Stack = createStackNavigator();
  return (
    <>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Welcome Admin" component={AdminWelcome} />
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Register" component={Register} />
          <Stack.Screen name="SysAdmin" component={SysAdmin} />
          {/* <Stack.Screen
            name="Easy Going"
            component={BottomNavBar}
            options={{ headerShown: false }}
          /> */}
    
        {/* <Stack.Screen
          name="DocNPills"
          component={PharmacyBottomNavBar}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="Add Medicine" component={AddMedicineForm} />
        <Stack.Screen name="Update Medicine" component={UpdateMedicineForm} /> */}
        <Stack.Screen
          name="PatientNavBar"
          component={PatientBottomNavBar}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="User Register" component={PatientRegisterForm} />
      </Stack.Navigator>
    </NavigationContainer>
    </>
  );
}
