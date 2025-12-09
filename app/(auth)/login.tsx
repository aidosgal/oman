import { Feather, FontAwesome, Ionicons } from "@expo/vector-icons";
import { Stack, useRouter } from "expo-router";
import { useState, useRef } from "react";
import {
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Image,
  Keyboard,
  TouchableWithoutFeedback,
  Alert,
  ActivityIndicator,
  Animated,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Login() {
  const router = useRouter();
  
  // State for inputs
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [emailFocused, setEmailFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);
  const [loading, setLoading] = useState(false);

  // Animation values for floating labels
  const emailLabelAnimation = useRef(new Animated.Value(0)).current;
  const passwordLabelAnimation = useRef(new Animated.Value(0)).current;

  // Handle email focus
  const handleEmailFocus = () => {
    setEmailFocused(true);
    Animated.timing(emailLabelAnimation, {
      toValue: 1,
      duration: 200,
      useNativeDriver: false,
    }).start();
  };

  const handleEmailBlur = () => {
    setEmailFocused(false);
    if (email === "") {
      Animated.timing(emailLabelAnimation, {
        toValue: 0,
        duration: 200,
        useNativeDriver: false,
      }).start();
    }
  };

  // Handle password focus
  const handlePasswordFocus = () => {
    setPasswordFocused(true);
    Animated.timing(passwordLabelAnimation, {
      toValue: 1,
      duration: 200,
      useNativeDriver: false,
    }).start();
  };

  const handlePasswordBlur = () => {
    setPasswordFocused(false);
    if (password === "") {
      Animated.timing(passwordLabelAnimation, {
        toValue: 0,
        duration: 200,
        useNativeDriver: false,
      }).start();
    }
  };

  // Animated styles for labels
  const emailLabelStyle = {
    top: emailLabelAnimation.interpolate({
      inputRange: [0, 1],
      outputRange: [20, 8],
    }),
    fontSize: emailLabelAnimation.interpolate({
      inputRange: [0, 1],
      outputRange: [16, 12],
    }),
    color: emailLabelAnimation.interpolate({
      inputRange: [0, 1],
      outputRange: ["#999", "#49B3E4"],
    }),
  };

  const passwordLabelStyle = {
    top: passwordLabelAnimation.interpolate({
      inputRange: [0, 1],
      outputRange: [20, 8],
    }),
    fontSize: passwordLabelAnimation.interpolate({
      inputRange: [0, 1],
      outputRange: [16, 12],
    }),
    color: passwordLabelAnimation.interpolate({
      inputRange: [0, 1],
      outputRange: ["#999", "#49B3E4"],
    }),
  };

  const handleLogin = async () => {
    if (!email || !password) return;

    setLoading(true);
    try {
      const response = await fetch("https://rstow.ru/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });

      const data = await response.json();

      if (response.ok && data.token) {
        await AsyncStorage.setItem("userToken", data.token);
        router.replace("/(tabs)/profile");
      } else {
        Alert.alert("Login Failed", data.message || "Invalid credentials");
      }
    } catch (error) {
      Alert.alert("Error", "Something went wrong. Please try again.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={{ flex: 1, backgroundColor: "white" }}>
        <StatusBar barStyle="dark-content" />
        <Stack.Screen options={{ headerShown: false }} />

        {/* Custom Header */}
        <View style={styles.customHeader}>
          <TouchableOpacity
            onPress={() => router.back()}
            style={styles.backButton}
          >
            <Feather name="chevron-left" size={24} color="black" />
            <Text style={styles.backText}>Back</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.container}>
        <Text style={styles.title}>Log in</Text>
        
        <View style={styles.registerContainer}>
          <Text style={styles.registerText}>Don't have an account yet? </Text>
          <TouchableOpacity>
            <Text style={styles.registerLink}>Register</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.inputContainer}>
          <Animated.Text style={[styles.label, emailLabelStyle]}>
            Email address
          </Animated.Text>
          <TextInput
            style={[
              styles.input,
              (email || emailFocused) && styles.inputWithLabel,
              emailFocused && styles.inputFocused,
            ]}
            value={email}
            onChangeText={setEmail}
            onFocus={handleEmailFocus}
            onBlur={handleEmailBlur}
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>

        <View style={styles.inputContainer}>
          <Animated.Text style={[styles.label, passwordLabelStyle]}>
            Enter password
          </Animated.Text>
          <TextInput
            style={[
              styles.input,
              (password || passwordFocused) && styles.inputWithLabel,
              passwordFocused && styles.inputFocused,
            ]}
            value={password}
            onChangeText={setPassword}
            onFocus={handlePasswordFocus}
            onBlur={handlePasswordBlur}
            secureTextEntry={!showPassword}
          />
          <TouchableOpacity
            style={styles.eyeIcon}
            onPress={() => setShowPassword(!showPassword)}
          >
            <Ionicons
              name={showPassword ? "eye-outline" : "eye-off-outline"}
              size={22}
              color="#999"
            />
          </TouchableOpacity>
        </View>

        {/* Divider */}
        <View style={styles.dividerContainer}>
          <View style={styles.dividerLine} />
          <Text style={styles.dividerText}>or continue with</Text>
          <View style={styles.dividerLine} />
        </View>

        <TouchableOpacity
                    style={{borderStyle: "solid", borderColor: "#EFEFEF", borderWidth: 1, width: "100%", flexDirection: "row", justifyContent: "center", alignItems: "center", paddingVertical: 15, borderRadius: 100}}
                    onPress={() => router.push("/(auth)/login")}
                >
                    <FontAwesome name="phone" size={24} color="#C0C0C0" />
                    <Text style={{marginLeft: 10, fontWeight: 400, color: "#2C2D2E"}}>Continue with phone</Text>
                </TouchableOpacity>
                <View style={{flexDirection: "row", justifyContent: "space-between", marginTop: 10}}>
                    <TouchableOpacity style={{borderStyle: "solid", flexDirection: "row", justifyContent: "center", alignItems: "center", borderRadius: 100, borderWidth: 1, borderColor: "#EFEFEF", width: "32%", paddingVertical: 15}}>
                        <Image source={require("../../assets/images/google-logo.png")} style={{width: 24, height: 24}} />
                    </TouchableOpacity>
                    <TouchableOpacity style={{borderStyle: "solid", flexDirection: "row", justifyContent: "center", alignItems: "center", borderRadius: 100, borderWidth: 1, borderColor: "#EFEFEF", width: "32%", paddingVertical: 15}}>
                        <Image source={require("../../assets/images/facebook-logo.png")} style={{width: 24, height: 24}} />
                    </TouchableOpacity>
                    <TouchableOpacity style={{borderStyle: "solid", flexDirection: "row", justifyContent: "center", alignItems: "center", borderRadius: 100, borderWidth: 1, borderColor: "#EFEFEF", width: "32%", paddingVertical: 15}}>
                        <Image source={require("../../assets/images/apple-logo.png")} style={{width: 24, height: 24}} />
                    </TouchableOpacity>
                </View>


    </View>

        {/* Login Button at Bottom */}
        <View style={styles.bottomContainer}>
          <TouchableOpacity
            style={[
              styles.loginButton,
              (email && password) && styles.loginButtonActive
            ]}
            disabled={!email || !password || loading}
            onPress={handleLogin}
          >
            {loading ? (
              <ActivityIndicator color="white" />
            ) : (
              <Text style={[
                styles.loginButtonText,
                (email && password) && styles.loginButtonTextActive
              ]}>
                Log in
              </Text>
            )}
          </TouchableOpacity>

          {/* Home Indicator */}
          <View style={styles.homeIndicator} />
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  customHeader: {
    paddingTop: 45,
    paddingHorizontal: 16,
    height: 100,
    backgroundColor: "white",
    justifyContent: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#EFEFEF",
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
    paddingHorizontal: 20,
    paddingTop: 24,
  },
  title: {
    fontSize: 32,
    fontWeight: "600",
    color: "#000",
    marginBottom: 8,
  },
  registerContainer: {
    flexDirection: "row",
    marginBottom: 32,
  },
  registerText: {
    fontSize: 15,
    color: "#666",
  },
  registerLink: {
    fontSize: 15,
    color: "#007AFF",
    fontWeight: "500",
  },
  inputContainer: {
    marginBottom: 16,
    position: "relative",
  },
  label: {
    position: "absolute",
    left: 16,
    zIndex: 1,
    backgroundColor: "white",
    paddingHorizontal: 4,
    fontWeight: "500",
  },
  input: {
    height: 62,
    borderWidth: 1,
    borderColor: "#E5E5E5",
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingTop: 8,
    fontSize: 16,
    color: "#000",
  },
  inputWithLabel: {
    paddingTop: 24,
  },
  inputFocused: {
    borderColor: "#49B3E4",
    borderWidth: 2,
  },
  eyeIcon: {
    position: "absolute",
    right: 16,
    top: 20,
  },
  dividerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 28,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: "#E5E5E5",
  },
  dividerText: {
    fontSize: 14,
    color: "#999",
    marginHorizontal: 16,
  },
  phoneButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    height: 54,
    borderWidth: 1,
    borderColor: "#E5E5E5",
    borderRadius: 12,
    backgroundColor: "white",
    marginBottom: 20,
  },
  phoneButtonText: {
    fontSize: 16,
    color: "#333",
    marginLeft: 10,
    fontWeight: "500",
  },
  socialContainer: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 16,
  },
  socialButton: {
    width: 68,
    height: 68,
    borderRadius: 34,
    borderWidth: 1,
    borderColor: "#E5E5E5",
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
  },
  bottomContainer: {
    paddingHorizontal: 20,
    paddingBottom: 8,
    backgroundColor: "white",
  },
  loginButton: {
    height: 56,
    borderRadius: 12,
    backgroundColor: "#E8E8E8",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
  loginButtonActive: {
    backgroundColor: "#49B3E4",
  },
  loginButtonText: {
    fontSize: 17,
    fontWeight: "600",
    color: "#A0A0A0",
  },
  loginButtonTextActive: {
    color: "white",
  },
  homeIndicator: {
    width: 134,
    height: 5,
    backgroundColor: "#000",
    borderRadius: 100,
    alignSelf: "center",
    marginTop: 8,
  },
});
