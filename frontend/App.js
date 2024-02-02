import { StatusBar } from 'expo-status-bar';
import UserAuthenticationScreen from './src/screens/UserAuthenticationScreen';
import ProfilePicUploadScreen from "./src/screens/ProfilePicUploadScreen";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import UserProfileScreen from './src/screens/UserProfileScreen';

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
      <Stack.Screen name="UserProfileScreen" component={UserProfileScreen} />
    </Stack.Navigator>
  )
}

export default function App() {
  return (
    // <UserAuthenticationScreen />
    <NavigationContainer>
      <StackNavigator />
    </NavigationContainer>
  );
}
