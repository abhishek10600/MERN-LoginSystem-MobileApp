import React, { useContext } from 'react'
import StackNavigator from './StackNavigator';
import { LoginContext } from './src/context/LoginProvider';
import DrawerNavigator from './DrawerNavigator';


const MainNavigator = () => {
    const { isLoggedIn } = useContext(LoginContext);
    return isLoggedIn ? <DrawerNavigator /> : <StackNavigator />
}

export default MainNavigator