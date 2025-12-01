import {View, Text, TouchableOpacity, StyleSheet, StatusBar, ScrollView} from "react-native";
import {Stack, useRouter} from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import Feather from "@expo/vector-icons/Feather";

export default function TransactionsList() {
    const router = useRouter();

    return (
        <>
            <StatusBar barStyle="dark-content" />
            <Stack.Screen options={{ headerShown: false }} />

            <View style={styles.customHeader}>
                <TouchableOpacity onPress={() => router.back()}>
                    <Feather name="chevron-left" size={24} color="black" />
                </TouchableOpacity>

                <Text style={styles.title}>Transaction history</Text>

                <View style={{ width: 24 }} />
            </View>

            {/* Page content */}
            <ScrollView style={{ flex: 1, backgroundColor: "#F3F4F5", padding: 20 }}>
                <View>
                    <Text style={{color: "#838BA7", fontWeight: 600, fontSize: 14}}>May 02 • 2025</Text>
                    <View style={{flexDirection: "row", alignItems: "center", paddingHorizontal: 15, paddingVertical: 10, backgroundColor: "white", borderRadius: 20, borderStyle: "solid", borderWidth: 1, borderColor: "#EAEBF0", marginTop: 10}}>
                        <View style={{width: 40, height: 40, borderRadius: 100, backgroundColor: "#FBE5E7", justifyContent: "center", alignItems: "center"}}>
                            <Feather name="arrow-up-right" size={22} color="#DF3C4C" />
                        </View>
                        <Text style={{fontWeight: 600, fontSize: 17, color: "#252525", marginLeft: 10}}>Outcome</Text>
                        <Text style={{marginLeft: "auto", fontSize: 17, fontWeight: 600, color: "#DD584C"}}>+2 652 OMR</Text>
                    </View>
                </View>
                <View style={{marginTop: 20}}>
                    <Text style={{color: "#838BA7", fontWeight: 600, fontSize: 14}}>May 02 • 2025</Text>
                    <View style={{marginTop: 10, borderStyle: "solid", borderWidth: 1, borderRadius: 20, paddingHorizontal: 20, borderColor: "#EAEBF0", backgroundColor: "white"}}>
                        <View style={{flexDirection: "row", alignItems: "center", borderStyle: "solid", borderBottomWidth: 1, borderColor: "#EAEBF0", marginTop: 10, paddingBottom: 10}}>
                            <View style={{width: 40, height: 40, borderRadius: 100, backgroundColor: "#EAFBE5", justifyContent: "center", alignItems: "center"}}>
                                <Feather name="arrow-down-left" size={22} color="#2DB66D" />
                            </View>
                            <Text style={{fontWeight: 600, fontSize: 17, color: "#252525", marginLeft: 10}}>Income</Text>
                            <Text style={{marginLeft: "auto", fontSize: 17, fontWeight: 600, color: "#2DB66D"}}>+15 248 OMR</Text>
                        </View>
                        <View style={{flexDirection: "row", alignItems: "center", borderStyle: "solid", borderBottomWidth: 1, borderColor: "#EAEBF0", marginTop: 10, paddingBottom: 10}}>
                            <View style={{width: 40, height: 40, borderRadius: 100, backgroundColor: "#EAFBE5", justifyContent: "center", alignItems: "center"}}>
                                <Feather name="arrow-down-left" size={22} color="#2DB66D" />
                            </View>
                            <Text style={{fontWeight: 600, fontSize: 17, color: "#252525", marginLeft: 10}}>Income</Text>
                            <Text style={{marginLeft: "auto", fontSize: 17, fontWeight: 600, color: "#2DB66D"}}>+3 422 OMR</Text>
                        </View>
                        <View style={{flexDirection: "row", alignItems: "center", paddingBottom: 10, marginTop: 10}}>
                            <View style={{width: 40, height: 40, borderRadius: 100, backgroundColor: "#FBE5E7", justifyContent: "center", alignItems: "center"}}>
                                <Feather name="arrow-up-right" size={22} color="#DF3C4C" />
                            </View>
                            <Text style={{fontWeight: 600, fontSize: 17, color: "#252525", marginLeft: 10}}>Outcome</Text>
                            <Text style={{marginLeft: "auto", fontSize: 17, fontWeight: 600, color: "#DD584C"}}>+2 652 OMR</Text>
                        </View>
                    </View>
                </View>
                <View style={{marginTop: 20}}>
                    <Text style={{color: "#838BA7", fontWeight: 600, fontSize: 14}}>May 02 • 2025</Text>
                    <View style={{flexDirection: "row", alignItems: "center", paddingHorizontal: 15, paddingVertical: 10, backgroundColor: "white", borderRadius: 20, borderStyle: "solid", borderWidth: 1, borderColor: "#EAEBF0", marginTop: 10}}>
                        <View style={{width: 40, height: 40, borderRadius: 100, backgroundColor: "#FBE5E7", justifyContent: "center", alignItems: "center"}}>
                            <Feather name="arrow-up-right" size={22} color="#DF3C4C" />
                        </View>
                        <Text style={{fontWeight: 600, fontSize: 17, color: "#252525", marginLeft: 10}}>Outcome</Text>
                        <Text style={{marginLeft: "auto", fontSize: 17, fontWeight: 600, color: "#DD584C"}}>+2 652 OMR</Text>
                    </View>
                </View>
                <View style={{marginTop: 20}}>
                    <Text style={{color: "#838BA7", fontWeight: 600, fontSize: 14}}>May 02 • 2025</Text>
                    <View style={{marginTop: 10, borderStyle: "solid", borderWidth: 1, borderRadius: 20, paddingHorizontal: 20, borderColor: "#EAEBF0", backgroundColor: "white"}}>
                        <View style={{flexDirection: "row", alignItems: "center", borderStyle: "solid", borderBottomWidth: 1, borderColor: "#EAEBF0", marginTop: 10, paddingBottom: 10}}>
                            <View style={{width: 40, height: 40, borderRadius: 100, backgroundColor: "#EAFBE5", justifyContent: "center", alignItems: "center"}}>
                                <Feather name="arrow-down-left" size={22} color="#2DB66D" />
                            </View>
                            <Text style={{fontWeight: 600, fontSize: 17, color: "#252525", marginLeft: 10}}>Income</Text>
                            <Text style={{marginLeft: "auto", fontSize: 17, fontWeight: 600, color: "#2DB66D"}}>+15 248 OMR</Text>
                        </View>
                        <View style={{flexDirection: "row", alignItems: "center", borderStyle: "solid", borderBottomWidth: 1, borderColor: "#EAEBF0", marginTop: 10, paddingBottom: 10}}>
                            <View style={{width: 40, height: 40, borderRadius: 100, backgroundColor: "#EAFBE5", justifyContent: "center", alignItems: "center"}}>
                                <Feather name="arrow-down-left" size={22} color="#2DB66D" />
                            </View>
                            <Text style={{fontWeight: 600, fontSize: 17, color: "#252525", marginLeft: 10}}>Income</Text>
                            <Text style={{marginLeft: "auto", fontSize: 17, fontWeight: 600, color: "#2DB66D"}}>+3 422 OMR</Text>
                        </View>
                        <View style={{flexDirection: "row", alignItems: "center", paddingBottom: 10, marginTop: 10}}>
                            <View style={{width: 40, height: 40, borderRadius: 100, backgroundColor: "#FBE5E7", justifyContent: "center", alignItems: "center"}}>
                                <Feather name="arrow-up-right" size={22} color="#DF3C4C" />
                            </View>
                            <Text style={{fontWeight: 600, fontSize: 17, color: "#252525", marginLeft: 10}}>Outcome</Text>
                            <Text style={{marginLeft: "auto", fontSize: 17, fontWeight: 600, color: "#DD584C"}}>+2 652 OMR</Text>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </>
    );
}

const styles = StyleSheet.create({
    customHeader: {
        paddingTop: 45,              // custom status bar space
        paddingHorizontal: 20,
        height: 110,
        backgroundColor: "white",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        borderBottomWidth: 1,
        borderBottomColor: "#eee",
    },
    title: {
        fontSize: 18,
        fontWeight: "600",
        color: "black",
    },
});
