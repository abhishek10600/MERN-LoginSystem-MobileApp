import { View, Text, TouchableOpacity, StyleSheet, Alert, Image, ActivityIndicator } from 'react-native'
import React, { useState } from 'react'
import { StackActions } from '@react-navigation/native';
import * as ImagePicker from "expo-image-picker";
import axios from "axios";

const ProfilePicUploadScreen = ({ navigation, route }) => {
    const [profilePic, setProfilePic] = useState("");
    const [loading, setLoading] = useState(false);
    const { token } = route.params;

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

    const uploadProfilePic = async () => {
        const formData = new FormData();
        formData.append("profile", {
            name: new Date() + "_profile",
            uri: profilePic,
            type: "image/jpg" || "image/png" || "image/jpeg" || "image/webp"
        });
        try {
            setLoading(true);
            const res = await axios.put("http://192.168.29.156:4000/api/v1/users/setProfilePhoto", formData, {
                headers: {
                    Accept: "application/json",
                    "Content-Type": "multipart/form-data",
                    Authorization: `JWT ${token}`
                }
            })
            if (res.data.success === true) {
                Alert.alert("Profile pic added successfully.")
                navigation.dispatch(
                    StackActions.replace("UserProfileScreen")
                )
            } else {
                console.log("Some error.")
            }
        } catch (error) {
            console.log(error.message);
        }
        setLoading(false);
    }
    return (
        <View style={styles.container}>
            <View style={styles.subContainer}>
                <TouchableOpacity onPress={openPhoneGallery} style={styles.uploadBtn}>
                    {profilePic ? <Image source={{ uri: profilePic }} style={{ width: "100%", height: "100%" }} /> : <Text style={styles.uploadBtnTextStyle}>upload profile image</Text>}
                </TouchableOpacity>
                <TouchableOpacity>
                    <Text style={{ textAlign: "center", fontSize: 16, color: "#3a98f7" }}>Skip</Text>
                </TouchableOpacity>
                {profilePic ? <Text onPress={uploadProfilePic} style={styles.uploadButton}>{loading ? <ActivityIndicator color="black" /> : "Upload"}</Text> : null}
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
        alignItems: "center",
        overflow: "hidden"
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