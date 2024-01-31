import { View, Text, TouchableWithoutFeedback, StyleSheet, Animated } from 'react-native'
import React from 'react'

const FormSelectorButton = ({ title, backgroundColor, borderStyle, onPressProp }) => {
    return (
        <>
            <TouchableWithoutFeedback onPress={onPressProp}>
                <Animated.View style={[styles.container, borderStyle, { backgroundColor: backgroundColor }]}>
                    <Text style={styles.title}>{title}</Text>
                </Animated.View>
            </TouchableWithoutFeedback >
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        height: 45,
        width: "50%",
        justifyContent: "center",
        alignItems: "center"
    },
    title: {
        color: "white"
    }
})

export default FormSelectorButton