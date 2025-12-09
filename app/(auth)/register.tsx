import { Feather } from "@expo/vector-icons";
import { Stack, useRouter } from "expo-router";
import { StatusBar, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function Login() {
    const router = useRouter();

    return (
        <View style={{flex: 1, backgroundColor: "white"}}>
            <StatusBar barStyle="dark-content" />
            <Stack.Screen options={{ headerShown: false }} />

            <View style={styles.customHeader}>
                <TouchableOpacity onPress={() => router.back()}>
                    <Feather name="chevron-left" size={24} color="black" />
                </TouchableOpacity>

                <TouchableOpacity onPress={() => router.back()}>
                    <Text style={styles.title}>Back</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    customHeader: {
        paddingTop: 45,              // custom status bar space
        paddingHorizontal: 20,
        height: 110,
        backgroundColor: "white",
        flexDirection: "row",
        alignItems: "center",
        borderBottomWidth: 1,
        borderBottomColor: "#eee",
    },
    title: {
        fontSize: 18,
        fontWeight: "400",
        color: "black",
        marginLeft: 10,
    },
});

