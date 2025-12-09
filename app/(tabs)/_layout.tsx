import { Tabs } from "expo-router";
import Feather from '@expo/vector-icons/Feather';
import { View, Platform, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { BlurView } from 'expo-blur';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { FontAwesome5, MaterialCommunityIcons } from "@expo/vector-icons";

function CustomTabBar({ state, descriptors, navigation }: BottomTabBarProps) {
    return (
        <View style={styles.tabBarContainer}>
            <View style={styles.tabBar}>
                {state.routes.map((route, index) => {
                    const { options } = descriptors[route.key];
                    const isFocused = state.index === index;

                    const onPress = () => {
                        const event = navigation.emit({
                            type: 'tabPress',
                            target: route.key,
                            canPreventDefault: true,
                        });

                        if (!isFocused && !event.defaultPrevented) {
                            navigation.navigate(route.name);
                        }
                    };

                    const onLongPress = () => {
                        navigation.emit({
                            type: 'tabLongPress',
                            target: route.key,
                        });
                    };

                    let iconName: any = 'home';
                    let label = 'Profile';

                    if (route.name === 'profile') {
                        iconName = 'home';
                        label = 'Profile';
                    } else if (route.name === 'qrcode') {
                        iconName = 'cast';
                        label = 'Qr code';
                    } else if (route.name === 'settings') {
                        iconName = 'settings';
                        label = 'Settings';
                    }

                    const color = isFocused ? '#49B3E4' : '#8E8E93';

                    return (
                        <TouchableOpacity
                            key={route.key}
                            accessibilityRole="button"
                            accessibilityState={isFocused ? { selected: true } : {}}
                            accessibilityLabel={options.tabBarAccessibilityLabel}
                            onPress={onPress}
                            onLongPress={onLongPress}
                            style={styles.tabItem}
                        >
                            <View style={[
                                styles.tabItemInner,
                                isFocused && styles.tabItemActive
                            ]}>
                                {label === 'Profile' ? (
                                    <FontAwesome5 name="user-circle" size={24} color={color} />
                                ) : label === 'Qr code' ? (
                                    <MaterialCommunityIcons name="qrcode-scan" size={24} color={color} />
                                ) : (
                                    <Feather name={iconName} size={24} color={color} />
                                )}
                                <Text style={[styles.tabLabel, { color }]}>
                                    {label}
                                </Text>
                            </View>
                        </TouchableOpacity>
                    );
                })}
            </View>
        </View>
    );
}

export default function TabsLayout() {
    return (
        <View style={{ flex: 1 }}>
            <Tabs
                tabBar={(props) => <CustomTabBar {...props} />}
                screenOptions={{
                    headerShown: false,
                }}
            >
                <Tabs.Screen name="profile" />
                <Tabs.Screen name="qrcode" />
                <Tabs.Screen name="settings" />
            </Tabs>
        </View>
    );
}

const styles = StyleSheet.create({
    tabBarContainer: {
        position: 'absolute',
        bottom: 60,
        left: 10,
        right: 10,
        height: 70,
        marginHorizontal: 20,
        borderRadius: 25,
        backgroundColor: 'white',
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 15 },
        shadowOpacity: 0.05,
        shadowRadius: 10,
        elevation: 8,
    },
    blurView: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    },
    tabBar: {
        flex: 1,
        flexDirection: 'row',
        paddingHorizontal: 0,
        paddingVertical: 10,
    },
    tabItem: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    tabItemInner: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 8,
        paddingHorizontal: 25,
        borderRadius: 15,
        minWidth: 95,
    },
    tabItemActive: {
        backgroundColor: '#E7F6FC',
    },
    tabLabel: {
        fontSize: 10,
        fontWeight: '600',
        marginTop: 4,
    },
});
