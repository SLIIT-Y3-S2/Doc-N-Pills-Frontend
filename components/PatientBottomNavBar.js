import * as React from 'react'
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";

import PatientDashboard from './PatientDashBoard';
import SearchDoctor from './SearchDoctor';
import SearchMedicine from './SearchMedicine';
import PatientProfile from './PatientProfile';
import AboutUs from './AboutUs';

const dashboard = "Dashboard";
const searchDoctor = "Search Doctor";
const searchMedicine = "Search Medicine";
const profile = "Profile";
const about = "About Us";

const Tab = createBottomTabNavigator();

const PatientBottomNavBar = () => {
  return (
    <Tab.Navigator
      initialRouteName={dashboard}
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          let routerName = route.name;

          if (routerName === dashboard) {
            iconName = focused ? "home" : "home-outline";
          } else if (routerName === searchMedicine) {
            iconName = focused ? "medkit" : "medkit-outline";
          } else if (routerName === searchDoctor) {
            iconName = focused ? "people" : "people-outline";
          } else if (routerName === about) {
            iconName = focused
              ? "information-circle"
              : "information-circle-outline";
          } else if (routerName === profile) {
            iconName = focused ? "person-circle" : "person-circle-outline";
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
      BottomNavigationBarOptions={{
        activeTintColor: "#1e90ff",
        inactiveTintColor: "grey",
        labelStyle: { paddingBottom: 10, fontSize: 10 },
        style: { padding: 10, height: 70 },
      }}
    >
      <Tab.Screen name={searchDoctor} component={SearchDoctor} />
      <Tab.Screen name={searchMedicine} component={SearchMedicine} />
      <Tab.Screen name={dashboard} component={PatientDashboard} />
      <Tab.Screen name={about} component={AboutUs} />
      <Tab.Screen name={profile} component={PatientProfile} />
    </Tab.Navigator>
  );
}

export default PatientBottomNavBar