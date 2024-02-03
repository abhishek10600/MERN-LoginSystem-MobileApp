import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import DrawerNavigator from './DrawerNavigator';
import UserAuthenticationScreen from './src/screens/UserAuthenticationScreen';
import ProfilePicUploadScreen from './src/screens/ProfilePicUploadScreen';
import HomeScreen from './src/screens/HomeScreen';

const Stack = createNativeStackNavigator();

const StackNavigator = () => {
    return (
        <Stack.Navigator screenOptions={
            {
                headerShown: false
            }
        }>
            <Stack.Screen name="UserAuthenticationScreen" component={UserAuthenticationScreen} />
            <Stack.Screen name="ProfilePicUploadScreen" component={ProfilePicUploadScreen} />
            <Stack.Screen name="HomeScreen" component={HomeScreen} />
        </Stack.Navigator>
    )
}

export default StackNavigator