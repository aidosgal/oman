import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import Feather from "@expo/vector-icons/Feather";

export default function SettingsScreen() {
    return (
        <View>
            <View style={styles.customHeader}>
                <Text style={styles.title}>Settings</Text>

            </View>
            <View style={{backgroundColor: "#F3F4F5", paddingHorizontal: 20}}>
                <View style={{backgroundColor: "white", borderRadius: 20, borderStyle: "solid", borderColor: "#EAEBF0", borderWidth: 1, marginTop: 15}}>
                    <TouchableOpacity style={{paddingHorizontal: 20, paddingVertical: 15, borderStyle: "solid", borderColor: "#EAEBF0", borderBottomWidth: 1, flexDirection: "row", alignItems: "center"}}>
                        <Text style={{fontSize: 16, fontWeight: 600}}>Profile settings</Text>
                        <Feather style={{marginLeft: "auto"}} name="chevron-right" size={24} color="#C0C0C0" />
                    </TouchableOpacity>
                    <TouchableOpacity style={{paddingHorizontal: 20, paddingVertical: 15, flexDirection: "row", alignItems: "center"}}>
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
                        <Feather style={{marginLeft: "auto"}} name="chevron-right" size={24} color="#C0C0C0" />
                    </View>
                    <TouchableOpacity style={{paddingHorizontal: 20, paddingVertical: 15, flexDirection: "row", alignItems: "center"}}>
                        <Text style={{fontSize: 16, fontWeight: 600}}>Privacy Statements</Text>
                        <Feather style={{marginLeft: "auto"}} name="chevron-right" size={24} color="#C0C0C0" />
                    </TouchableOpacity>
                </View>
                <Text style={{marginTop: 20, fontSize: 20, fontWeight: 600}}>Language</Text>
                <View style={{flexDirection: "row", marginTop: 10}}>
                    <TouchableOpacity style={{paddingHorizontal: 20, paddingVertical: 15, borderStyle: "solid", borderColor: "#EAEBF0", borderBottomWidth: 1, flexDirection: "row", alignItems: "center"}}>
                        <Text style={{fontSize: 16, fontWeight: 600}}>Profile settings</Text>
                        <Feather style={{marginLeft: "auto"}} name="chevron-right" size={24} color="#C0C0C0" />
                    </TouchableOpacity>
                    <TouchableOpacity style={{paddingHorizontal: 20, paddingVertical: 15, flexDirection: "row", alignItems: "center"}}>
                        <Text style={{fontSize: 16, fontWeight: 600}}>Change password</Text>
                        <Feather style={{marginLeft: "auto"}} name="chevron-right" size={24} color="#C0C0C0" />
                    </TouchableOpacity>
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