import { View, Text, TouchableOpacity, Button } from 'react-native'
import React from 'react'

const HomeScreen = ({ navigation }) => {
    return (
        <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
            <Text>Home</Text>
            <Button onPress={() => navigation.openDrawer()} title="Click Me" />
        </View>
    )
}

export default HomeScreen