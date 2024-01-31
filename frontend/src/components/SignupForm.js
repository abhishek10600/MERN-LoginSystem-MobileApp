import { View, Text, StyleSheet, Dimensions, TextInput, TouchableOpacity, ScrollView } from 'react-native'
import React from 'react'

const SignupForm = () => {
    return (
        <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
            <View style={styles.inputContainerStyle}>
                <Text style={styles.inputLabelStyle}>Name</Text>
                <TextInput placeholder="Enter your name" style={styles.textInputStyle} />
            </View>
            <View style={styles.inputContainerStyle}>
                <Text style={styles.inputLabelStyle}>Email</Text>
                <TextInput placeholder="Enter your email" style={styles.textInputStyle} />
            </View>
            <View style={styles.inputContainerStyle}>
                <Text style={styles.inputLabelStyle}>Password</Text>
                <TextInput secureTextEntry={true} placeholder="Create password" style={styles.textInputStyle} />
            </View>
            <View style={styles.inputContainerStyle}>
                <Text style={styles.inputLabelStyle}>Confirm Password</Text>
                <TextInput secureTextEntry={true} placeholder="Enter the password again" style={styles.textInputStyle} />
            </View>
            <TouchableOpacity style={styles.inputButtonStyle}>
                <Text style={styles.inputButtonTextStyle}>Signup</Text>
            </TouchableOpacity>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        width: Dimensions.get("window").width,
        paddingHorizontal: 20,
    },
    inputContainerStyle: {
        marginTop: 20
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

export default SignupForm