import Feather from "@expo/vector-icons/Feather";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Stack, useFocusEffect, useRouter } from "expo-router";
import { useCallback, useState } from 'react';
import { ActivityIndicator, RefreshControl, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface Transaction {
    id: number;
    wallet_id: number;
    amount: string;
    type: string;
    description: string;
    created_at: string;
    updated_at: string;
}

export default function TransactionsList() {
    const router = useRouter();
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);

    const fetchTransactions = useCallback(async () => {
        try {
            const token = await AsyncStorage.getItem("userToken");

            if (!token) {
                router.replace("/(auth)/login");
                return;
            }

            const walletsResponse = await fetch("https://rstow.ru/api/wallets/my", {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${token}`,
                },
            });

            if (walletsResponse.ok) {
                const wallets = await walletsResponse.json();
                if (wallets && wallets.length > 0) {
                    const allHistories = wallets[0].histories || [];
                    const sortedHistories = allHistories.sort((a: any, b: any) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
                    setTransactions(sortedHistories);
                }
            }
        } catch (error) {
            console.error("Error fetching transactions:", error);
        } finally {
            setLoading(false);
            setRefreshing(false);
        }
    }, [router]);

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        fetchTransactions();
    }, [fetchTransactions]);

    useFocusEffect(
        useCallback(() => {
            fetchTransactions();
        }, [fetchTransactions])
    );

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
            <ScrollView
                style={{ flex: 1, backgroundColor: "#F3F4F5", padding: 20 }}
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor="#49B3E4" />
                }
            >
                {loading ? (
                    <View style={{ padding: 20, alignItems: 'center' }}>
                        <ActivityIndicator size="large" color="#49B3E4" />
                    </View>
                ) : transactions.length === 0 ? (
                    <Text style={{ color: "#838BA7", textAlign: "center", marginTop: 20 }}>No transactions yet</Text>
                ) : (
                    transactions.map((transaction, index) => {
                        const date = new Date(transaction.created_at);
                        const formattedDate = date.toLocaleDateString('en-US', { month: 'short', day: '2-digit' }) + ' • ' + date.getFullYear();
                        const isIncome = transaction.type === 'income';

                        return (
                            <View key={transaction.id} style={{ marginTop: index > 0 ? 15 : 0 }}>
                                <Text style={{ color: "#838BA7", fontWeight: 600, fontSize: 14, marginBottom: 10 }}>{formattedDate}</Text>
                                <View style={{ flexDirection: "row", alignItems: "center", paddingHorizontal: 15, paddingVertical: 10, backgroundColor: "white", borderRadius: 20, borderStyle: "solid", borderWidth: 1, borderColor: "#EAEBF0" }}>
                                    <View style={{ width: 40, height: 40, borderRadius: 100, backgroundColor: isIncome ? "#EAFBE5" : "#FBE5E7", justifyContent: "center", alignItems: "center" }}>
                                        <Feather name={isIncome ? "arrow-down-left" : "arrow-up-right"} size={22} color={isIncome ? "#2DB66D" : "#DF3C4C"} />
                                    </View>
                                    <View style={{ flex: 1, marginLeft: 10 }}>
                                        <Text style={{ fontWeight: 600, fontSize: 17, color: "#252525" }}>{isIncome ? 'Income' : 'Outcome'}</Text>
                                        <Text style={{ fontSize: 13, color: "#838BA7", marginTop: 2 }}>{transaction.description}</Text>
                                    </View>
                                    <Text style={{ fontSize: 17, fontWeight: 600, color: isIncome ? "#2DB66D" : "#DD584C" }}>{isIncome ? '+' : '-'}{transaction.amount} OMR</Text>
                                </View>
                            </View>
                        );
                    })
                )}
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
