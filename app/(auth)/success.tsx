import { LinearGradient } from "expo-linear-gradient";
import { Stack } from "expo-router";
import { Image, StatusBar, StyleSheet, Text, View } from "react-native";

export default function SuccessPage() {
  return (
    <View style={styles.container}>
        <StatusBar barStyle="light-content" />
        <Stack.Screen options={{ headerShown: false }} />
        
        <LinearGradient
          colors={['#1260A5', '#68B8E6']}
          start={{ x: 0, y: 1 }}
          end={{ x: 1, y: 0 }}
          style={styles.gradient}
        >
          <View style={styles.centerContent}>
            <Image 
              source={require("../../assets/images/wait.png")} 
              style={styles.image}
              resizeMode="contain"
            />
          </View>

          <View style={styles.bottomContent}>
            <Text style={styles.title}>Thank you for your application</Text>
            <Text style={styles.description}>
              Your application has been accepted and we will process it shortly.
            </Text>
          </View>
        </LinearGradient>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    flex: 1,
    justifyContent: "center",
  },
  centerContent: {
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: 250,
    height: 250,
  },
  bottomContent: {
    paddingHorizontal: 40,
    paddingBottom: 80,
    alignItems: "center",
  },
  title: {
    fontSize: 32,
    fontWeight: "600",
    color: "white",
    textAlign: "center",
    marginBottom: 12,
  },
  description: {
    fontSize: 16,
    color: "white",
    textAlign: "center",
    lineHeight: 24,
  },
});