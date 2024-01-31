import { View, Text, StyleSheet, Dimensions, TextInput, TouchableOpacity } from 'react-native'
import React from 'react'

const LoginForm = () => {
    return (
        <View style={styles.container}>
            <View style={{ marginVertical: 20 }}>
                <Text style={styles.inputLabelStyle}>Email</Text>
                <TextInput placeholder="Enter email" style={styles.textInputStyle} />
            </View>
            <View>
                <Text style={styles.inputLabelStyle}>Passwrod</Text>
                <TextInput secureTextEntry={true} placeholder="Enter email" style={styles.textInputStyle} />
            </View>
            <TouchableOpacity style={styles.inputButtonStyle}>
                <Text style={styles.inputButtonTextStyle}>Login</Text>
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