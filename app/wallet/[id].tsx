import { Feather } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, Alert, Keyboard, ScrollView, Share, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native";
import SuccessScreen from "../../components/SuccessScreen";

interface WalletPublicInfo {
    wallet_uuid: string;
    owner: string | null;
    title: string | null;
    balance: string;
    description: string | null;
    avatar: string | null;
}

export default function WalletPage() {
    const router = useRouter();
    const { id } = useLocalSearchParams();
    const [walletInfo, setWalletInfo] = useState<WalletPublicInfo | null>(null);
    const [loading, setLoading] = useState(true);
    const [amount, setAmount] = useState("");
    const [sending, setSending] = useState(false);
    const [selectedQuickAmount, setSelectedQuickAmount] = useState<number | null>(null);
    const [showSuccess, setShowSuccess] = useState(false);

    const quickAmounts = [10, 50, 100];

    useEffect(() => {
        console.log("=== WalletPage useEffect triggered ===");
        console.log("Raw id param:", id);
        console.log("Type of id:", typeof id);
        console.log("Is array?", Array.isArray(id));
        fetchWalletInfo();
    }, [id]);

    const fetchWalletInfo = async () => {
        console.log("\n=== fetchWalletInfo START ===");
        try {
            // Handle case where id might be an array
            const walletId = Array.isArray(id) ? id[0] : id;

            console.log("Processed walletId:", walletId);
            console.log("WalletId type:", typeof walletId);
            console.log("WalletId length:", walletId?.length);

            if (!walletId) {
                console.error("ERROR: No wallet ID provided");
                Alert.alert("Error", "No wallet ID provided");
                setLoading(false);
                return;
            }

            console.log("Getting token from AsyncStorage...");
            const token = await AsyncStorage.getItem("userToken");
            console.log("Token exists:", !!token);

            const url = `https://rstow.ru/api/wallets/public/${walletId}`;
            console.log("Fetching URL:", url);
            console.log("Fetch starting at:", new Date().toISOString());

            const headers: Record<string, string> = {};
            if (token) {
                headers["Authorization"] = `Bearer ${token}`;
                console.log("Added Authorization header");
            } else {
                console.log("No token found, fetching without auth");
            }

            const response = await fetch(url, {
                method: "GET",
                headers: headers,
            });

            console.log("Response received at:", new Date().toISOString());
            console.log("Response status:", response.status);
            console.log("Response statusText:", response.statusText);
            console.log("Response headers:", JSON.stringify(Object.fromEntries(response.headers.entries())));

            if (response.ok) {
                const data = await response.json();
                console.log("SUCCESS: Wallet data received:", JSON.stringify(data, null, 2));
                setWalletInfo(data);
            } else {
                const errorText = await response.text();
                console.error("ERROR: API returned non-OK status");
                console.error("Error status:", response.status);
                console.error("Error response body:", errorText);
                Alert.alert("Error", `Unable to fetch wallet information (Status: ${response.status})`);
            }
        } catch (error) {
            console.error("ERROR: Exception caught in fetchWalletInfo");
            console.error("Error type:", error.constructor.name);
            console.error("Error message:", error.message);
            console.error("Full error:", error);
            Alert.alert("Error", "Something went wrong: " + error.message);
        } finally {
            console.log("=== fetchWalletInfo END ===\n");
            setLoading(false);
        }
    };

    const handleSendMoney = async () => {
        console.log("\n=== handleSendMoney START ===");
        console.log("Amount entered:", amount);
        console.log("Amount parsed:", parseFloat(amount));

        if (!amount || parseFloat(amount) <= 0) {
            console.log("ERROR: Invalid amount");
            Alert.alert("Error", "Please enter a valid amount");
            return;
        }

        console.log("Getting token from AsyncStorage...");
        const token = await AsyncStorage.getItem("userToken");
        console.log("Token exists:", !!token);
        console.log("Token length:", token?.length);

        if (!token) {
            console.log("ERROR: No token found, redirecting to login");
            Alert.alert("Error", "Please login first");
            router.replace("/(auth)/login");
            return;
        }

        // Handle case where id might be an array
        const walletId = Array.isArray(id) ? id[0] : id;
        console.log("Wallet ID for send:", walletId);

        setSending(true);
        try {
            const url = `https://rstow.ru/api/wallets/${walletId}/send`;
            const body = {
                amount: parseFloat(amount),
            };

            console.log("Send URL:", url);
            console.log("Send body:", JSON.stringify(body));
            console.log("Request starting at:", new Date().toISOString());

            const response = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                },
                body: JSON.stringify(body),
            });

            console.log("Response received at:", new Date().toISOString());
            console.log("Response status:", response.status);
            console.log("Response statusText:", response.statusText);

            const data = await response.json();
            console.log("Response data:", JSON.stringify(data, null, 2));

            if (response.ok) {
                console.log("SUCCESS: Money sent successfully");
                setShowSuccess(true);
                setTimeout(() => {
                    setShowSuccess(false);
                    setAmount("");
                    router.back();
                }, 2000);
            } else {
                console.error("ERROR: Send failed");
                console.error("Error message from API:", data.message);
                Alert.alert("Error", data.message || "Unable to send money");
            }
        } catch (error) {
            console.error("ERROR: Exception in handleSendMoney");
            console.error("Error type:", error.constructor.name);
            console.error("Error message:", error.message);
            console.error("Full error:", error);
            Alert.alert("Error", "Something went wrong. Please try again.");
        } finally {
            console.log("=== handleSendMoney END ===\n");
            setSending(false);
        }
    };

    const handleQuickAmount = (quickAmount: number) => {
        setAmount(quickAmount.toString());
        setSelectedQuickAmount(quickAmount);
    };

    const handleAmountChange = (text: string) => {
        setAmount(text);
        setSelectedQuickAmount(null);
    };

    const handleShareLink = async () => {
        try {
            const walletId = Array.isArray(id) ? id[0] : id;
            const shareUrl = `oman://wallet/${walletId}`;
            await Share.share({
                message: `Send money to my wallet: ${shareUrl}`,
                url: shareUrl,
            });
        } catch (error) {
            console.error("Error sharing:", error);
        }
    };

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={{ flex: 1, backgroundColor: "#F3F4F5" }}>
                <StatusBar barStyle="dark-content" />
                <Stack.Screen options={{ headerShown: false }} />

                <SuccessScreen visible={showSuccess} />

                <View style={styles.customHeader}>
                    <TouchableOpacity
                        onPress={() => router.back()}
                        style={styles.backButton}
                    >
                        <Feather name="chevron-left" size={24} color="black" />
                        <Text style={styles.backText}>Back</Text>
                    </TouchableOpacity>
                </View>

                {loading ? (
                    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                        <ActivityIndicator size="large" color="#49B3E4" />
                    </View>
                ) : walletInfo ? (
                    <>
                        <ScrollView style={styles.container} contentContainerStyle={styles.scrollContent}>
                            {/* Avatar at top */}
                            <View style={styles.avatarContainer}>
                                <View style={styles.avatar}>
                                    <Text style={styles.avatarText}>{walletInfo.owner?.charAt(0) || 'W'}</Text>
                                </View>
                            </View>

                            {/* Profile Info Box */}
                            <View style={styles.profileBox}>
                                <Text style={styles.ownerName}>{walletInfo.owner || walletInfo.title || "Wallet"}</Text>

                                {walletInfo.description && (
                                    <Text style={styles.description}>{walletInfo.description}</Text>
                                )}
                            </View>

                            <View style={{ backgroundColor: "white", borderRadius: 20, padding: 20 }}>
                                {/* Amount Input Section */}
                                <View style={styles.inputSection}>
                                    <Text style={styles.inputLabel}>Enter the transfer amount</Text>
                                    <View style={styles.amountInputContainer}>
                                        <TextInput
                                            style={styles.amountInput}
                                            value={amount}
                                            onChangeText={handleAmountChange}
                                            keyboardType="decimal-pad"
                                            placeholder="0"
                                            placeholderTextColor="#999"
                                        />
                                        <Text style={styles.currency}>OMR</Text>
                                    </View>
                                </View>

                                {/* Quick Amount Buttons */}
                                <View style={styles.quickAmountsContainer}>
                                    {quickAmounts.map((quickAmount) => (
                                        <TouchableOpacity
                                            key={quickAmount}
                                            style={[
                                                styles.quickAmountButton,
                                                selectedQuickAmount === quickAmount && styles.quickAmountButtonActive
                                            ]}
                                            onPress={() => handleQuickAmount(quickAmount)}
                                        >
                                            <Text style={[
                                                styles.quickAmountText,
                                                selectedQuickAmount === quickAmount && styles.quickAmountTextActive
                                            ]}>
                                                {quickAmount} omr
                                            </Text>
                                        </TouchableOpacity>
                                    ))}
                                </View>
                            </View>
                        </ScrollView>

                        {/* Bottom Buttons */}
                        <View style={styles.bottomButtons}>
                            <TouchableOpacity
                                style={[
                                    styles.sendButton,
                                    (!amount || sending) && styles.sendButtonDisabled
                                ]}
                                disabled={!amount || sending}
                                onPress={handleSendMoney}
                            >
                                {sending ? (
                                    <ActivityIndicator color="white" />
                                ) : (
                                    <Text style={styles.sendButtonText}>Make a transaction</Text>
                                )}
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={styles.shareButton}
                                onPress={handleShareLink}
                            >
                                <Text style={styles.shareButtonText}>Share link</Text>
                                <Feather name="arrow-right" size={16} color="#49B3E4" style={{ marginLeft: 6 }} />
                            </TouchableOpacity>
                        </View>
                    </>
                ) : (
                    <View style={styles.errorContainer}>
                        <Text style={styles.errorText}>Wallet not found</Text>
                    </View>
                )}
            </View>
        </TouchableWithoutFeedback>
    );
}

const styles = StyleSheet.create({
    customHeader: {
        paddingTop: 45,
        paddingHorizontal: 16,
        height: 100,
        backgroundColor: "#F3F4F5",
        justifyContent: "center",
        borderBottomWidth: 0,
    },
    backButton: {
        flexDirection: "row",
        alignItems: "center",
    },
    backText: {
        fontSize: 17,
        fontWeight: "400",
        color: "black",
        marginLeft: 6,
    },
    container: {
        flex: 1,
        backgroundColor: "#F3F4F5",
        flexDirection: "column",
    },
    scrollContent: {
        paddingHorizontal: 20,
        paddingBottom: 40,
    },
    avatarContainer: {
        alignItems: "center",
        paddingTop: 30,
        paddingBottom: 20,
    },
    profileBox: {
        backgroundColor: "white",
        borderRadius: 20,
        padding: 20,
        marginBottom: 20,
        alignItems: "center",
    },
    avatar: {
        width: 100,
        height: 100,
        borderRadius: 25,
        backgroundColor: "#E8F5FD",
        justifyContent: "center",
        alignItems: "center",
    },
    avatarText: {
        fontSize: 36,
        fontWeight: "600",
        color: "#49B3E4",
    },
    ownerName: {
        fontSize: 24,
        fontWeight: "600",
        color: "#000",
        marginBottom: 16,
        textAlign: "center",
    },
    description: {
        fontSize: 14,
        color: "#838BA7",
        textAlign: "center",
        lineHeight: 20,
        paddingHorizontal: 10,
    },
    inputSection: {
        marginBottom: 20,
    },
    inputLabel: {
        fontSize: 14,
        color: "#838BA7",
        marginBottom: 12,
    },
    amountInputContainer: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#F6F6F9",
        borderRadius: 12,
        paddingHorizontal: 16,
        paddingVertical: 16,
    },
    amountInput: {
        flex: 1,
        fontSize: 32,
        fontWeight: "600",
        color: "#000",
    },
    currency: {
        fontSize: 20,
        color: "#838BA7",
        fontWeight: "500",
    },
    quickAmountsContainer: {
        flexDirection: "row",
        gap: 12,
    },
    quickAmountButton: {
        flex: 1,
        paddingVertical: 12,
        paddingHorizontal: 16,
        borderRadius: 100,
        backgroundColor: "#F6F6F9",
        alignItems: "center",
    },
    quickAmountButtonActive: {
        backgroundColor: "#49B3E4",
    },
    quickAmountText: {
        fontSize: 15,
        fontWeight: "500",
        color: "#838BA7",
    },
    quickAmountTextActive: {
        color: "white",
    },
    bottomButtons: {
        backgroundColor: "white",
        paddingHorizontal: 20,
        paddingTop: 16,
        paddingBottom: 20,
        borderRadius: 0,
    },
    sendButton: {
        backgroundColor: "#2DB66D",
        paddingVertical: 18,
        borderRadius: 100,
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 12,
    },
    sendButtonDisabled: {
        backgroundColor: "#E8E8E8",
    },
    sendButtonText: {
        color: "white",
        fontSize: 17,
        fontWeight: "600",
    },
    shareButton: {
        backgroundColor: "white",
        paddingVertical: 18,
        borderRadius: 100,
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "row",
        borderWidth: 1,
        borderColor: "#EFEFEF",
    },
    shareButtonText: {
        color: "#49B3E4",
        fontSize: 17,
        fontWeight: "600",
    },
    errorContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    errorText: {
        fontSize: 16,
        color: "#838BA7",
    },
});
