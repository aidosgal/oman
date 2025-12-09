import {View, Text, StyleSheet, Dimensions, ScrollView, TouchableOpacity, ActivityIndicator} from 'react-native';
import Svg, { ClipPath, Path, Image as SvgImage } from 'react-native-svg';
import {FontAwesome6} from "@expo/vector-icons";
import Feather from "@expo/vector-icons/Feather";
import {useRouter, useFocusEffect} from "expo-router";
import {useState, useCallback} from 'react';
import AsyncStorage from "@react-native-async-storage/async-storage";

const { width: screenWidth } = Dimensions.get('window');

export default function ProfileScreen() {
    const router = useRouter();
    const [userName, setUserName] = useState<string | null>(null);
    const [balance, setBalance] = useState<string>("0.00");
    const [loading, setLoading] = useState(true);

    const fetchUserData = useCallback(async () => {
        try {
            const token = await AsyncStorage.getItem("userToken");

            if (!token) {
                router.replace("/(auth)/login");
                return;
            }

            // Fetch user info
            const userInfoResponse = await fetch("https://rstow.ru/api/auth/info", {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${token}`,
                },
            });

            if (userInfoResponse.ok) {
                const userInfo = await userInfoResponse.json();
                setUserName(userInfo.name);
            }

            // Fetch wallets
            const walletsResponse = await fetch("https://rstow.ru/api/wallets/my", {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${token}`,
                },
            });

            if (walletsResponse.ok) {
                const wallets = await walletsResponse.json();
                if (wallets && wallets.length > 0) {
                    setBalance(wallets[0].balance);
                }
            }
        } catch (error) {
            console.error("Error fetching user data:", error);
        } finally {
            setLoading(false);
        }
    }, [router]);

    useFocusEffect(
        useCallback(() => {
            fetchUserData();
        }, [fetchUserData])
    );

    return (
        <ScrollView style={styles.container}>
            <Svg
                width={screenWidth}
                height={320}
                viewBox="0 0 375 300"
                style={styles.svg}
            >
                <ClipPath id="clip">
                    <Path
                        d="M375 282C375 282 327.5 300 187.5 300C47.5 300 0 282 0 282V0H375V282Z"
                    />
                </ClipPath>
                <SvgImage
                    href={require('../../assets/images/avatar.png')}
                    width={screenWidth}
                    height={320}
                    preserveAspectRatio="xMidYMid slice"
                    clipPath="url(#clip)"
                />
            </Svg>
            {loading ? (
                <View style={{ padding: 20, alignItems: 'center' }}>
                    <ActivityIndicator size="large" color="#49B3E4" />
                </View>
            ) : (
                <>
                    {userName && (
                        <Text style={styles.name}>{userName || "User"}</Text>
                    )}
                    <View style={styles.balanceContainer}>
                        <View style={{backgroundColor: '#49B3E4', borderRadius: 100, display: "flex", flexDirection: "row", width: 40, height: 40, justifyContent: "center", alignItems: "center"}}>
                            <FontAwesome6 name="coins" size={18} color="white" />
                        </View>
                        <Text style={{fontSize: 14, fontWeight: 400, marginTop: 5, color: "#838BA7"}}>Your current balance</Text>
                        <Text style={{fontSize: 28, fontWeight: 600, marginTop: 10, color: "#252525"}}>{balance} OMR</Text>
                    </View>
                </>
            )}
            <View style={{flexDirection: "row", alignItems: "center", marginHorizontal: 20, marginTop: 15}}>
                <Text style={{color: "#252525", fontSize: 20, fontWeight: 600}}>Transactions</Text>
                <TouchableOpacity style={{flexDirection: "row", alignItems : "center", justifyContent: "center", padding: 10, marginLeft: "auto", backgroundColor: "white", borderRadius: 15, paddingHorizontal: 15, borderStyle: "solid", borderWidth: 1, borderColor: "#EAEBF0"}}
                                  onPress={() => router.push("/(transactions)/list")}
                >
                    <Text style={{color: "#252525", fontWeight: 600}}>All</Text>
                    <Feather name="chevron-right" size={18} color="#252525" />
                </TouchableOpacity>
            </View>
            <View style={{marginTop: 20, borderTopRightRadius: 20, borderTopLeftRadius: 20, backgroundColor: "white", padding: 20}}>
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
                <View style={{marginTop: 20, paddingBottom: 120}}>
                    <Text style={{color: "#838BA7", fontWeight: 600, fontSize: 14}}>May 02 • 2025</Text>
                    <View style={{marginTop: 10, borderStyle: "solid", borderWidth: 1, borderRadius: 20, paddingHorizontal: 20, borderColor: "#EAEBF0"}}>
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
            </View>
        </ScrollView>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F6F6F9',
        marginTop: -10,
    },
    svg: {
        margin: 0,
        padding: 0,
    },
    name: {
        fontSize: 32,
        fontWeight: 600,
        textAlign: 'center',
        fontFamily: 'SF Pro Display',
        marginTop: 10,
    },
    balanceContainer: {
        padding: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        marginHorizontal: 20,
        marginTop: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 0,
        },
        shadowOpacity: 0.03,
        shadowRadius: 5,
        elevation: 3,
    }
});