import {View, Text, StyleSheet, TouchableOpacity, StatusBar, Switch} from 'react-native';
import Feather from "@expo/vector-icons/Feather";
import {useRouter} from "expo-router";
import {useState} from "react";

export default function SettingsScreen() {
    const router = useRouter();
    const [notificationsEnabled, setNotificationsEnabled] = useState(false);

    return (
        <View>
            <StatusBar barStyle="dark-content" />
            <View style={styles.customHeader}>
                <Text style={styles.title}>Settings</Text>

            </View>
            <View style={{backgroundColor: "#F3F4F5", paddingHorizontal: 20}}>
                <View style={{backgroundColor: "white", borderRadius: 20, borderStyle: "solid", borderColor: "#EAEBF0", borderWidth: 1, marginTop: 15}}>
                    <TouchableOpacity
                        style={{paddingHorizontal: 20, paddingVertical: 15, borderStyle: "solid", borderColor: "#EAEBF0", borderBottomWidth: 1, flexDirection: "row", alignItems: "center"}}
                        onPress={() => router.push('/(settings)/profile')}
                    >
                        <Text style={{fontSize: 16, fontWeight: 600}}>Profile settings</Text>
                        <Feather style={{marginLeft: "auto"}} name="chevron-right" size={24} color="#C0C0C0" />
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={{paddingHorizontal: 20, paddingVertical: 15, flexDirection: "row", alignItems: "center"}}
                        onPress={() => router.push('/(settings)/password')}
                    >
                        <Text style={{fontSize: 16, fontWeight: 600}}>Change password</Text>
                        <Feather style={{marginLeft: "auto"}} name="chevron-right" size={24} color="#C0C0C0" />
                    </TouchableOpacity>
                </View>
                <Text style={{marginTop: 20, fontSize: 20, fontWeight: 600}}>Additionally</Text>
                <View style={{backgroundColor: "white", borderRadius: 20, borderStyle: "solid", borderColor: "#EAEBF0", borderWidth: 1, marginTop: 15}}>
                    <TouchableOpacity style={{paddingHorizontal: 20, paddingVertical: 15, borderStyle: "solid", borderColor: "#EAEBF0", borderBottomWidth: 1, flexDirection: "row", alignItems: "center"}}>
                        <Text style={{fontSize: 16, fontWeight: 600}}>Term of Use</Text>
                        <Feather style={{marginLeft: "auto"}} name="chevron-right" size={24} color="#C0C0C0" />
                    </TouchableOpacity>
                    <View style={{paddingHorizontal: 20, paddingVertical: 15, borderStyle: "solid", borderColor: "#EAEBF0", borderBottomWidth: 1, flexDirection: "row", alignItems: "center"}}>
                        <Text style={{fontSize: 16, fontWeight: 600}}>Notifications</Text>
                        <Switch
                            style={{marginLeft: "auto"}}
                            trackColor={{ false: "#E9E9EA", true: "#34C759" }}
                            thumbColor="#ffffff"
                            ios_backgroundColor="#E9E9EA"
                            onValueChange={setNotificationsEnabled}
                            value={notificationsEnabled}
                        />
                    </View>
                    <TouchableOpacity style={{paddingHorizontal: 20, paddingVertical: 15, flexDirection: "row", alignItems: "center"}}>
                        <Text style={{fontSize: 16, fontWeight: 600}}>Privacy Statements</Text>
                        <Feather style={{marginLeft: "auto"}} name="chevron-right" size={24} color="#C0C0C0" />
                    </TouchableOpacity>
                </View>
                <Text style={{marginTop: 20, fontSize: 20, fontWeight: 600, }}>Language</Text>
                <View style={{marginTop: 10, gap: 1}}>
                    <View style={{flexDirection: "row", gap: 10}}>
                        <TouchableOpacity style={{flex: 1, paddingHorizontal: 20, paddingVertical: 10, backgroundColor: "#E7F6FC", flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 8, borderRadius: 15, borderStyle: "solid", borderWidth: 3, borderColor: "#49B3E4"}}>
                            <Text style={{fontSize: 24}}>🇬🇧</Text>
                            <Text style={{fontSize: 16, fontWeight: 600}}>English</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{flex: 1, paddingHorizontal: 20, paddingVertical: 10, backgroundColor: "white", flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 8, borderRadius: 15, borderStyle: "solid", borderWidth: 1, borderColor: "#EAEBF0"}}>
                            <Text style={{fontSize: 24}}>🇦🇪</Text>
                            <Text style={{fontSize: 16, fontWeight: 600}}>Arabic</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    customHeader: {
        paddingTop: 45,              // custom status bar space
        paddingHorizontal: 20,
        height: 120,
        backgroundColor: "white",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        borderBottomWidth: 1,
        borderBottomColor: "#eee",
    },
    title: {
        fontSize: 26,
        fontWeight: "500",
        color: "black",
    },
})
