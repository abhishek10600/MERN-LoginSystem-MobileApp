import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native'
import React, { useState } from 'react'
import * as ImagePicker from "expo-image-picker";

const ProfilePicUploadScreen = () => {
    const [profilePic, setProfilePic] = useState("");

    const openPhoneGallery = async () => {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
            Alert.alert("Sorry, we need to access your gallery for this to work");
        }
        if (status === "granted") {
            const result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: [1, 1],
                quality: 1
            });
            if (!result.canceled) {
                console.log(result.assets[0].uri);
                setProfilePic(result.assets[0].uri);
            } else {
                Alert.alert("You did not select any image");
            }
        }
    }

    const uploadProfilePic = () => {

    }
    return (
        <View style={styles.container}>
            <View style={styles.subContainer}>
                <TouchableOpacity onPress={openPhoneGallery} style={styles.uploadBtn}>
                    <Text style={styles.uploadBtnTextStyle}>upload profile image</Text>
                </TouchableOpacity>
                <TouchableOpacity>
                    <Text style={{ textAlign: "center", fontSize: 16, color: "#3a98f7" }}>Skip</Text>
                </TouchableOpacity>
                {profilePic ? <Text onPress={uploadProfilePic} style={styles.uploadButton}>Upload</Text> : null}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    subContainer: {
        alignItems: "center",
        justifyContent: "center",
        gap: 20
    },
    uploadBtn: {
        height: 125,
        width: 125,
        borderRadius: 125 / 2,
        borderWidth: 1,
        borderStyle: "dashed",
        justifyContent: "center",
        alignItems: "center"
    },
    uploadBtnTextStyle: {
        textAlign: "center",
        color: "gray",
        fontWeight: "bold"
    },
    uploadButton: {
        textAlign: "center",
        fontSize: 16,
        backgroundColor: "green",
        opacity: 0.5,
        paddingVertical: 10,
        paddingHorizontal: 20,
        color: "black",
        borderRadius: 10
    }
})

export default ProfilePicUploadScreen