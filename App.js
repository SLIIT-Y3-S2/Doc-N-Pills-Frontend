import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import Login from './components/Login';
import Register from './components/Register';
import AdminWelcome from './components/AdminWelcome';
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import "react-native-gesture-handler";
import PharmacyBottomNavBar from "./components/PharmacyBottomNavBar";
import AddMedicineForm from "./components/AddMedicineForm";
import UpdateMedicineForm from "./components/UpdateMedicineForm";
import PatientBottomNavBar from "./components/PatientBottomNavBar";
import PatientRegisterForm from "./components/PatientRegisterForm";
import AdminBottomNavBar from './components/AdminBottomNavBar';
import ChannelingCentersView from './components/ChannelingCentersView';
import ChannelingCenterBottomNavBar from './components/ChannelingCenterBottomNavBar';
import ChannelingCenterHome from './components/ChannelingCenterHome';
import AddDoctorForm from "./components/AddDoctorForm";
import UpdateDoctorForm from "./components/UpdateDoctorForm";
import Doctors from './components/Doctors';
import PharmaciesView from './components/PharmaciesView';
import UpdateCenter from './components/UpdateCenter';
import UpdatePharmacy from './components/UpdatePharmacy';

const Stack = createStackNavigator();

export default function App() {
  const Stack = createStackNavigator();
  return (
    <>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Welcome Admin" component={AdminWelcome} options={{ headerShown: false }} />
          <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
          <Stack.Screen name="Register" component={Register} options={{ headerShown: false }}/>
          <Stack.Screen name="View Channeling Centers" component={ChannelingCentersView} options={{ headerShown: false }} />
         
    
         <Stack.Screen
          name="DocNPills"
          component={PharmacyBottomNavBar}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="Add Medicine" component={AddMedicineForm} />
        <Stack.Screen name="Update Medicine" component={UpdateMedicineForm} />
         <Stack.Screen
          name="PatientNavBar"
          component={PatientBottomNavBar}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="User Register" component={PatientRegisterForm} />
        <Stack.Screen
          name="AdminNavBar"
          component={AdminBottomNavBar}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ChCenterNavbar"
          component={ChannelingCenterBottomNavBar}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="Home" component={ChannelingCenterHome} />
        <Stack.Screen name="Doctors" component={Doctors} />
        <Stack.Screen name="Add Doctor" component={AddDoctorForm} />
        <Stack.Screen name="Update Doctor" component={UpdateDoctorForm} />
        <Stack.Screen name="View pharmacy" component={PharmaciesView} options={{ headerShown: false }}/>
        <Stack.Screen name="Update Center" component={UpdateCenter} />
        <Stack.Screen name="Update Pharmacy" component={UpdatePharmacy} />
     
      </Stack.Navigator>
    </NavigationContainer>
    </>
  );
}
