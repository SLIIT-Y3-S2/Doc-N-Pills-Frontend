import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import 'react-native-gesture-handler';
import React from 'react';
import ChannelingCenterBottomNavBar from './components/ChannelingCenterBottomNavBar';
import ChannelingCenterHome from './components/ChannelingCenterHome';
import AddDoctorForm from "./components/AddDoctorForm";
import UpdateDoctorForm from "./components/UpdateDoctorForm";
import Doctors from './components/Doctors';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
        
      <Stack.Navigator>
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
        <Stack.Screen name="Register" component={PatientRegisterForm} />
        <Stack.Screen
          name="ChCenterNavbar"
          component={ChannelingCenterBottomNavBar}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="Home" component={ChannelingCenterHome} />
        <Stack.Screen name="Doctors" component={Doctors} />
        <Stack.Screen name="Add Doctor" component={AddDoctorForm} />
        <Stack.Screen name="Update Doctor" component={UpdateDoctorForm} />
     
      </Stack.Navigator>
    </NavigationContainer>
  );
}
