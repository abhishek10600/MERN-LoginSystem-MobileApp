import React, { useContext } from 'react'
import StackNavigator from './StackNavigator';
import DrawerNavigator from './DrawerNavigator';
import { LoginContext } from './src/context/LoginProvider';


const MainNavigator = () => {
    const { isLoggedIn } = useContext(LoginContext);
    return isLoggedIn ? <DrawerNavigator /> : <StackNavigator />
}

export default MainNavigator