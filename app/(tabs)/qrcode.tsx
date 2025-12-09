import {View, Text, StyleSheet, StatusBar, ScrollView, ActivityIndicator} from 'react-native';
import {useState, useCallback} from 'react';
import {useFocusEffect, useRouter} from 'expo-router';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SvgXml } from 'react-native-svg';

export default function QrCodeScreen() {
    const router = useRouter();
    const [qrCodeSvg, setQrCodeSvg] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    const fetchQRCode = useCallback(async () => {
        try {
            const token = await AsyncStorage.getItem("userToken");

            if (!token) {
                router.replace("/(auth)/login");
                return;
            }

            // Fetch wallets to get the UUID
            const walletsResponse = await fetch("https://rstow.ru/api/wallets/my", {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${token}`,
                },
            });

            if (walletsResponse.ok) {
                const wallets = await walletsResponse.json();
                if (wallets && wallets.length > 0) {
                    const walletUuid = wallets[0].uuid;

                    // Fetch the QR code SVG
                    const qrResponse = await fetch(`https://rstow.ru/api/wallets/${walletUuid}/qr`, {
                        method: "GET",
                        headers: {
                            "Authorization": `Bearer ${token}`,
                        },
                    });

                    if (qrResponse.ok) {
                        // Get the SVG as text
                        const svgText = await qrResponse.text();
                        setQrCodeSvg(svgText);
                    }
                }
            }
        } catch (error) {
            console.error("Error fetching QR code:", error);
        } finally {
            setLoading(false);
        }
    }, [router]);

    useFocusEffect(
        useCallback(() => {
            fetchQRCode();
        }, [fetchQRCode])
    );

    return (
        <ScrollView style={styles.container}>
            <StatusBar barStyle="dark-content" />
            <Text style={{fontWeight: 500, fontSize: 26, textAlign: "center", marginTop: 100}}>Scan to transfer</Text>
            <View style={{marginHorizontal: "auto", padding: 20, borderRadius: 20, backgroundColor: "white", marginTop: 20, width: "100%", flexDirection: "row", justifyContent: "center", alignItems: "center"}}>
                {loading ? (
                    <ActivityIndicator size="large" color="#49B3E4" />
                ) : qrCodeSvg ? (
                    <SvgXml
                        xml={qrCodeSvg}
                        width="250"
                        height="250"
                    />
                ) : (
                    <Text>QR Code not available</Text>
                )}
            </View>
            <View style={{marginTop: 40}}>

                {/* Step 1 */}
                <View style={{flexDirection: "row"}}>
                    {/* Number + Line container */}
                    <View style={{alignItems: "center"}}>
                        {/* Number circle */}
                        <View style={styles.circle}>
                            <Text>1</Text>
                        </View>
                        {/* Vertical line */}
                        <View style={styles.line}/>
                    </View>

                    {/* Text */}
                    <View style={{marginLeft: 10, flex: 1}}>
                        <Text style={styles.title}>Point the camera at the QR code.</Text>
                        <Text style={styles.subtitle}>Make sure the code is fully visible in the frame.</Text>
                    </View>
                </View>

                {/* Step 2 */}
                <View style={{flexDirection: "row"}}>
                    <View style={{alignItems: "center"}}>
                        <View style={styles.circle}>
                            <Text>2</Text>
                        </View>
                        <View style={styles.line}/>
                    </View>

                    <View style={{marginLeft: 10, flex: 1}}>
                        <Text style={styles.title}>Check the recipient's information.</Text>
                        <Text style={styles.subtitle}>Before confirming, make sure the name and account number are correct.</Text>
                    </View>
                </View>

                {/* Step 3 */}
                <View style={{flexDirection: "row"}}>
                    <View style={{alignItems: "center"}}>
                        <View style={styles.circle}>
                            <Text>3</Text>
                        </View>
                        <View style={styles.line}/>
                    </View>

                    <View style={{marginLeft: 10, flex: 1}}>
                        <Text style={styles.title}>Enter the transfer amount.</Text>
                        <Text style={styles.subtitle}>Before confirming, make sure the name and account number are correct.</Text>
                    </View>
                </View>

                {/* Step 4 — last (no line below) */}
                <View style={{flexDirection: "row"}}>
                    <View style={{alignItems: "center"}}>
                        <View style={styles.circle}>
                            <Text>4</Text>
                        </View>
                    </View>

                    <View style={{marginLeft: 10, flex: 1}}>
                        <Text style={styles.title}>Confirm the transfer.</Text>
                        <Text style={styles.subtitle}>Click "Send" or "Pay."</Text>
                    </View>
                </View>

            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#F3F4F5",
        flex: 1,
        flexDirection: "column",
        paddingHorizontal: 40
    },
    circle: {
        width: 27,
        height: 27,
        borderRadius: 100,
        borderWidth: 1,
        borderColor: "#EAEBF0",
        backgroundColor: "white",
        justifyContent: "center",
        alignItems: "center",
    },

    line: {
        width: 2,
        height: 40,
        backgroundColor: "#EAEBF0",
        marginTop: 2,
    },

    title: {
        color: "#252525",
        fontSize: 15,
        fontWeight: "400",
    },

    subtitle: {
        color: "#838BA7",
        fontSize: 15,
        fontWeight: "400",
    },
})