import { Feather } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useEffect } from 'react';
import { Modal, StatusBar, StyleSheet, Text, View } from 'react-native';
import Animated, {
    Easing,
    useAnimatedStyle,
    useSharedValue,
    withDelay,
    withRepeat,
    withSequence,
    withTiming
} from 'react-native-reanimated';

interface SuccessScreenProps {
    visible: boolean;
    onFinish?: () => void;
}

export default function SuccessScreen({ visible, onFinish }: SuccessScreenProps) {
    if (!visible) return null;

    // Animation values for the checkmark
    const scale = useSharedValue(0);
    const opacity = useSharedValue(0);

    // Animation values for the ripples
    const ripple1Scale = useSharedValue(1);
    const ripple2Scale = useSharedValue(1);
    const ripple1Opacity = useSharedValue(0.3);
    const ripple2Opacity = useSharedValue(0.2);

    useEffect(() => {
        if (visible) {
            // Initial appearance of checkmark
            scale.value = withSequence(
                withTiming(1.2, { duration: 300 }),
                withTiming(1, { duration: 150 })
            );
            opacity.value = withTiming(1, { duration: 300 });

            // Ripple pulse animation
            ripple1Scale.value = withRepeat(
                withSequence(
                    withTiming(1.5, { duration: 2000, easing: Easing.out(Easing.ease) }),
                    withTiming(1, { duration: 0 })
                ),
                -1,
                false
            );
            ripple1Opacity.value = withRepeat(
                withSequence(
                    withTiming(0, { duration: 2000, easing: Easing.out(Easing.ease) }),
                    withTiming(0.3, { duration: 0 })
                ),
                -1,
                false
            );

            ripple2Scale.value = withDelay(
                400,
                withRepeat(
                    withSequence(
                        withTiming(1.5, { duration: 2000, easing: Easing.out(Easing.ease) }),
                        withTiming(1, { duration: 0 })
                    ),
                    -1,
                    false
                )
            );
            ripple2Opacity.value = withDelay(
                400,
                withRepeat(
                    withSequence(
                        withTiming(0, { duration: 2000, easing: Easing.out(Easing.ease) }),
                        withTiming(0.2, { duration: 0 })
                    ),
                    -1,
                    false
                )
            );
        }
    }, [visible]);

    const animatedCheckmarkStyle = useAnimatedStyle(() => ({
        transform: [{ scale: scale.value }],
        opacity: opacity.value
    }));

    const ripple1Style = useAnimatedStyle(() => ({
        transform: [{ scale: ripple1Scale.value }],
        opacity: ripple1Opacity.value
    }));

    const ripple2Style = useAnimatedStyle(() => ({
        transform: [{ scale: ripple2Scale.value }],
        opacity: ripple2Opacity.value
    }));

    return (
        <Modal transparent animationType="fade" visible={visible}>
            <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
            <LinearGradient
                colors={['#4facfe', '#00f2fe']}
                start={{ x: 0, y: 0 }}
                end={{ x: 0, y: 1 }}
                style={styles.container}
            >
                <LinearGradient
                    colors={['#5698DE', '#2670C4']}
                    style={[StyleSheet.absoluteFill]}
                />

                <View style={styles.content}>
                    <View style={styles.iconContainer}>
                        <Animated.View style={[styles.ripple, styles.rippleOuter, ripple2Style]} />
                        <Animated.View style={[styles.ripple, styles.rippleInner, ripple1Style]} />

                        <View style={styles.circle}>
                            <Animated.View style={animatedCheckmarkStyle}>
                                <Feather name="check" size={50} color="#2670C4" />
                            </Animated.View>
                        </View>
                    </View>

                    <Text style={styles.title}>Thank you for your{'\n'}support</Text>
                </View>
            </LinearGradient>
        </Modal>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    content: {
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 50,
    },
    iconContainer: {
        width: 200,
        height: 200,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 40,
    },
    circle: {
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 10,
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
    },
    ripple: {
        position: 'absolute',
        borderRadius: 100,
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
    },
    rippleInner: {
        width: 160,
        height: 160,
    },
    rippleOuter: {
        width: 220,
        height: 220,
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
    },
    title: {
        fontSize: 24,
        fontWeight: '700',
        color: 'white',
        textAlign: 'center',
        lineHeight: 32,
    },
});
