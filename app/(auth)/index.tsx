import {Image, ImageBackground, StatusBar, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {Stack, useRouter} from "expo-router";
import {FontAwesome, Ionicons} from "@expo/vector-icons";
import { useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function AuthScreen() {
    const router = useRouter();

    useEffect(() => {
        checkToken();
    }, []);

    const checkToken = async () => {
        try {
            const token = await AsyncStorage.getItem("userToken");
            if (token) {
                router.replace("/(tabs)/profile");
            }
        } catch (error) {
            console.error("Error checking token:", error);
        }
    };

    return (
        <ImageBackground style={styles.container} source={require("../../assets/images/background.png")}>
            <StatusBar barStyle="dark-content" />
            <Stack.Screen options={{ headerShown: false }} />
            <View style={{flexDirection: 'column', justifyContent: "center", height: "53%"}}>
                <Image style={{width: "auto", objectFit: "contain"}}  source={require("../../assets/images/logo.png")} />
            </View>
            <View style={{height: "47%", backgroundColor: "white", marginTop: "auto", borderTopStartRadius: 30, borderTopEndRadius: 30, padding: 20}}>
                <Text style={{textAlign: 'center', fontSize: 26, fontWeight: 600}}>Log in to your account</Text>
                <TouchableOpacity
                    style={{marginTop: 30, borderStyle: "solid", borderColor: "#EFEFEF", borderWidth: 1, width: "100%", flexDirection: "row", justifyContent: "center", alignItems: "center", paddingVertical: 15, borderRadius: 100}}
                    onPress={() => router.push("/(auth)/login")}
                >
                    <Ionicons name="mail" size={24} color="#C0C0C0" />
                    <Text style={{marginLeft: 10, fontWeight: 400, color: "#2C2D2E"}}>Continue with email</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={{marginTop: 10, borderStyle: "solid", borderColor: "#EFEFEF", borderWidth: 1, width: "100%", flexDirection: "row", justifyContent: "center", alignItems: "center", paddingVertical: 15, borderRadius: 100}}
                    onPress={() => router.push("/(auth)/login")}
                >
                    <FontAwesome name="phone" size={24} color="#C0C0C0" />
                    <Text style={{marginLeft: 10, fontWeight: 400, color: "#2C2D2E"}}>Continue with phone</Text>
                </TouchableOpacity>
                <View style={{flexDirection: "row", justifyContent: "space-between", marginTop: 30}}>
                    <TouchableOpacity style={{borderStyle: "solid", flexDirection: "row", justifyContent: "center", alignItems: "center", borderRadius: 100, borderWidth: 1, borderColor: "#EFEFEF", width: "32%", paddingVertical: 15}}>
                        <Image source={require("../../assets/images/google-logo.png")} style={{width: 24, height: 24}} />
                    </TouchableOpacity>
                    <TouchableOpacity style={{borderStyle: "solid", flexDirection: "row", justifyContent: "center", alignItems: "center", borderRadius: 100, borderWidth: 1, borderColor: "#EFEFEF", width: "32%", paddingVertical: 15}}>
                        <Image source={require("../../assets/images/facebook-logo.png")} style={{width: 24, height: 24}} />
                    </TouchableOpacity>
                    <TouchableOpacity style={{borderStyle: "solid", flexDirection: "row", justifyContent: "center", alignItems: "center", borderRadius: 100, borderWidth: 1, borderColor: "#EFEFEF", width: "32%", paddingVertical: 15}}>
                        <Image source={require("../../assets/images/apple-logo.png")} style={{width: 24, height: 24}} />
                    </TouchableOpacity>
                </View>
                <View style={{marginTop: 20, flexDirection: "row", justifyContent: "center", alignItems: "center"}}>
                    <Text style={{textAlign: "center", fontSize: 16, fontWeight: 600}}>Don't have an account yet? </Text>
                    <TouchableOpacity onPress={() => router.push("/(auth)/register")}>
                        <Text style={{fontSize: 16, fontWeight: 600, color: "#49B3E4"}}>Register</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ImageBackground>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
    }
})
