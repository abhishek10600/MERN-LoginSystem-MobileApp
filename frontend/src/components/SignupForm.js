import { View, Text, StyleSheet, Dimensions, TextInput, TouchableOpacity, ScrollView, Alert, ActivityIndicator } from 'react-native'
import React from 'react'
import { Formik } from "formik";
import { userValidationSchema } from '../validations/userValidation';
import axios from "axios";

const SignupForm = () => {
    const userInfo = {
        name: "",
        email: "",
        password: "",
        confirmPassword: ""
    }
    const signup = async (values, formikActions) => {
        formikActions.setSubmitting(true);
        try {
            const res = await axios.post("http://192.168.29.156:4000/api/v1/users/register", values)
            if (res.data.success === true) {
                Alert.alert("Account created successfully.")
                formikActions.resetForm();
            }
        } catch (error) {
            console.log(error);
        }
        formikActions.setSubmitting(false);
    }
    return (
        <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
            <Formik
                initialValues={userInfo}
                validationSchema={userValidationSchema}
                onSubmit={signup}>
                {({ values, errors, handleBlur, touched, handleChange, handleSubmit, isSubmitting }) => {
                    const { name, email, password, confirmPassword } = values;
                    return <>
                        <View style={styles.inputContainerStyle}>
                            <Text style={styles.inputLabelStyle}>Name</Text>
                            <TextInput
                                value={name}
                                placeholder="Enter your name"
                                onChangeText={handleChange("name")}
                                onBlur={handleBlur("name")}
                                style={styles.textInputStyle}
                            />
                            {
                                touched.name && errors.name ? <Text style={styles.inputErrorStyle}>{errors.name}</Text> : null
                            }
                        </View >
                        <View style={styles.inputContainerStyle}>
                            <Text style={styles.inputLabelStyle}>Email</Text>
                            <TextInput
                                value={email}
                                placeholder="Enter your email"
                                onChangeText={handleChange("email")}
                                onBlur={handleBlur("email")}
                                style={styles.textInputStyle}
                            />
                            {
                                touched.email && errors.email ? <Text style={styles.inputErrorStyle}>{errors.email}</Text> : null
                            }
                        </View>
                        <View style={styles.inputContainerStyle}>
                            <Text style={styles.inputLabelStyle}>Password</Text>
                            <TextInput
                                value={password}
                                secureTextEntry={true}
                                placeholder="Create password"
                                onChangeText={handleChange("password")}
                                onBlur={handleBlur("password")}
                                style={styles.textInputStyle}
                            />
                            {
                                touched.password && errors.password ? <Text style={styles.inputErrorStyle}>{errors.password}</Text> : null
                            }
                        </View>
                        <View style={styles.inputContainerStyle}>
                            <Text style={styles.inputLabelStyle}>Confirm Password</Text>
                            <TextInput
                                value={confirmPassword}
                                secureTextEntry={true}
                                placeholder="Enter the password again"
                                onChangeText={handleChange("confirmPassword")}
                                onBlur={handleBlur("confirmPassword")}
                                style={styles.textInputStyle}
                            />
                            {
                                touched.confirmPassword && errors.confirmPassword ? <Text style={styles.inputErrorStyle}>{errors.confirmPassword}</Text> : null
                            }
                        </View>
                        <TouchableOpacity style={styles.inputButtonStyle} onPress={isSubmitting ? null : handleSubmit}>
                            <Text style={styles.inputButtonTextStyle}>
                                {isSubmitting ? (<ActivityIndicator size="small" color="white" />) : "Signup"}
                            </Text>
                        </TouchableOpacity>
                    </>
                }}
            </Formik>
        </ScrollView >
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
    inputErrorStyle: {
        color: "red",
        fontSize: 14
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