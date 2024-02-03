import { View, Text, Image, StyleSheet, TouchableOpacity, Alert } from 'react-native'
import React, { useContext } from 'react'
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import { LoginContext } from '../context/LoginProvider';
import AsyncStorage from "@react-native-async-storage/async-storage"
import axios from "axios";

const CustomDrawer = (props) => {
    const navigation = props.navigation;
    const { setIsLoggedIn } = useContext(LoginContext);
    const { user } = useContext(LoginContext);

    const handleLogout = async () => {
        try {
            const token = await AsyncStorage.getItem("token");
            const res = await axios.get("http://192.168.29.156:4000/api/v1/users/logout", {
                headers: {
                    Authorization: `JWT ${token}`
                }
            });
            if (res.data.success === true) {
                await AsyncStorage.removeItem("token");
                Alert.alert("Logged out successfully");
                setIsLoggedIn(false);
            }
        } catch (error) {
            console.log(error.message);
        }
    }

    return (
        <View style={{ flex: 1 }}>
            <DrawerContentScrollView {...props}>
                {/* Top section of the drawer*/}
                <View style={styles.topContainer}>
                    <View style={styles.userInfoContainer}>
                        <Text style={styles.userNameTextStyle}>{user.name}</Text>
                        <Text style={styles.userEmailTextStyle}>{user.email}</Text>
                    </View>
                    {user.photo ? <Image source={{ uri: user.photo.secure_url }} style={styles.profilePicStyle} /> : <Image source={require("../../assets/unknownUser.jpeg")} style={styles.profilePicStyle} />}
                </View>
                <DrawerItemList {...props} />
            </DrawerContentScrollView>
            {/* Logout Button at bottom*/}
            <TouchableOpacity onPress={handleLogout} style={{ position: "absolute", right: 0, left: 0, bottom: 50, backgroundColor: "#f6f6f6", padding: 20 }}>
                <Text>Logout</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    topContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        padding: 20,
        alignItems: "center",
        gap: 15,
        backgroundColor: "#f6f6f6",

    },
    userNameTextStyle: {
        fontWeight: "bold"
    },
    userEmailTextStyle: {
        color: "gray"
    },
    profilePicStyle: {
        width: 60,
        height: 60,
        borderRadius: 30
    },
    logoutBtnStyle: {
        position: "absolute",
        bottom: 0
    }
})

export default CustomDrawer