import { View, Text, StyleSheet, Dimensions, TextInput, TouchableOpacity, Alert, ActivityIndicator } from 'react-native'
import React, { useState } from 'react'
import axios from "axios";

const LoginForm = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const handleEmail = (e) => {
        const emailVar = e.nativeEvent.text;
        setEmail(emailVar);
    }
    const handlePassword = (e) => {
        const passwordVar = e.nativeEvent.text;
        setPassword(passwordVar);
    }
    const login = async () => {
        if (email !== "" && password !== "") {
            try {
                setLoading(true);
                const res = await axios.post("http://192.168.29.156:4000/api/v1/users/login", {
                    email,
                    password
                })
                if (res.data.success === true) {
                    setEmail("");
                    setPassword("");
                    Alert.alert("Logged in successfully.")
                }
            } catch (error) {
                console.log(error.message);
            }
        } else {
            Alert.alert("Enter all the required fields");
        }
        setLoading(false);
    }
    return (
        <View style={styles.container}>
            <View style={{ marginVertical: 20 }}>
                <Text style={styles.inputLabelStyle}>Email</Text>
                <TextInput
                    placeholder="Enter email"
                    style={styles.textInputStyle}
                    value={email}
                    onChange={e => handleEmail(e)}
                />
            </View>
            <View>
                <Text style={styles.inputLabelStyle}>Passwrod</Text>
                <TextInput
                    secureTextEntry={true}
                    placeholder="Enter email"
                    style={styles.textInputStyle}
                    value={password}
                    onChange={e => handlePassword(e)}
                />
            </View>
            <TouchableOpacity style={styles.inputButtonStyle} onPress={login}>
                <Text style={styles.inputButtonTextStyle}>{loading ? (<ActivityIndicator size="small" color="white" />) : "Login"}</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: Dimensions.get("window").width,
        paddingHorizontal: 20,
    },
    inputLabelStyle: {
        fontWeight: "bold"
    },
    textInputStyle: {
        borderWidth: 1,
        borderColor: "#1b1b33",
        height: 35,
        borderRadius: 10,
        fontSize: 15,
        paddingLeft: 10
    },
    inputButtonStyle: {
        width: "100%",
        height: 45,
        backgroundColor: "#1b1b33",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 10,
        marginTop: 20
    },
    inputButtonTextStyle: {
        color: "white"
    }
})

export default LoginForm