import { View, Text } from 'react-native'
import React from 'react'
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import CustomDrawer from './src/components/CustomDrawer';
import HomeScreen from "./src/screens/HomeScreen";
import TasksScreen from "./src/screens/TasksScreen";

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
    return (
        <Drawer.Navigator screenOptions={{
            headerStyle: {
                backgroundColor: "transparent",
                elevation: 0
            },
            headerTitle: "Feed"
        }}

            drawerContent={(props) => <CustomDrawer {...props} />}>
            <Drawer.Screen name="Home" component={HomeScreen} />
            <Drawer.Screen name="Tasks" component={TasksScreen} />
        </Drawer.Navigator>
    )
}

export default DrawerNavigator