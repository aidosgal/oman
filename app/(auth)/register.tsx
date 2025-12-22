import { Feather, Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Stack, useRouter } from "expo-router";
import { useRef, useState } from "react";
import {
    ActivityIndicator,
    Alert,
    Animated,
    Keyboard,
    StatusBar,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View,
} from "react-native";

export default function Register() {
  const router = useRouter();
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [emailFocused, setEmailFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);
  const [confirmPasswordFocused, setConfirmPasswordFocused] = useState(false);
  const [loading, setLoading] = useState(false);

  const emailInputRef = useRef<TextInput>(null);
  const passwordInputRef = useRef<TextInput>(null);
  const confirmPasswordInputRef = useRef<TextInput>(null);

  const emailLabelAnimation = useRef(new Animated.Value(0)).current;
  const passwordLabelAnimation = useRef(new Animated.Value(0)).current;
  const confirmPasswordLabelAnimation = useRef(new Animated.Value(0)).current;

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

  const handleConfirmPasswordFocus = () => {
    setConfirmPasswordFocused(true);
    Animated.timing(confirmPasswordLabelAnimation, {
      toValue: 1,
      duration: 200,
      useNativeDriver: false,
    }).start();
  };

  const handleConfirmPasswordBlur = () => {
    setConfirmPasswordFocused(false);
    if (confirmPassword === "") {
      Animated.timing(confirmPasswordLabelAnimation, {
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
      outputRange: [25, 8],
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
      outputRange: [25, 8],
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

  const confirmPasswordLabelStyle = {
    top: confirmPasswordLabelAnimation.interpolate({
      inputRange: [0, 1],
      outputRange: [25, 8],
    }),
    fontSize: confirmPasswordLabelAnimation.interpolate({
      inputRange: [0, 1],
      outputRange: [16, 12],
    }),
    color: confirmPasswordLabelAnimation.interpolate({
      inputRange: [0, 1],
      outputRange: ["#999", "#49B3E4"],
    }),
  };

  const handleRegister = async () => {
    if (!email || !password || !confirmPassword) return;

    if (password !== confirmPassword) {
      Alert.alert("Error", "Passwords do not match");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch("https://rstow.ru/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
          password_confirmation: confirmPassword,
        }),
      });

      const data = await response.json();

      if (response.ok && data.message === "success") {
        // Show success page
        router.push("/(auth)/success");
        
        // Wait for 1 second then auto-login
        setTimeout(async () => {
          try {
            const loginResponse = await fetch("https://rstow.ru/api/auth/login", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                email: email,
                password: password,
              }),
            });

            const loginData = await loginResponse.json();

            if (loginResponse.ok && loginData.token) {
              await AsyncStorage.setItem("userToken", loginData.token);
              router.replace("/(tabs)/profile");
            } else {
              Alert.alert("Login Failed", "Please try logging in manually");
              router.replace("/(auth)/login");
            }
          } catch (loginError) {
            Alert.alert("Error", "Please try logging in manually");
            router.replace("/(auth)/login");
          }
        }, 1000);
      } else {
        Alert.alert("Registration Failed", data.message || "Unable to register");
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
        <Text style={styles.title}>Sign up</Text>
        
        <View style={styles.registerContainer}>
          <Text style={styles.registerText}>Already have an account? </Text>
          <TouchableOpacity onPress={() => router.push("/(auth)/login")}>
            <Text style={styles.registerLink}>Log in</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.inputContainer}>
          <Animated.Text style={[styles.label, emailLabelStyle]} onPress={() => emailInputRef.current?.focus()}>
            Email address
          </Animated.Text>
          <TextInput
            ref={emailInputRef}
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
          <Animated.Text style={[styles.label, passwordLabelStyle]} onPress={() => passwordInputRef.current?.focus()}>
            Enter password
          </Animated.Text>
          <TextInput
            ref={passwordInputRef}
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
            hitSlop={{ top: 15, bottom: 15, left: 15, right: 15 }}
          >
            <Ionicons
              name={showPassword ? "eye-outline" : "eye-off-outline"}
              size={22}
              color="#999"
            />
          </TouchableOpacity>
        </View>

        <View style={styles.inputContainer}>
          <Animated.Text style={[styles.label, confirmPasswordLabelStyle]} onPress={() => confirmPasswordInputRef.current?.focus()}>
            Confirm password
          </Animated.Text>
          <TextInput
            ref={confirmPasswordInputRef}
            style={[
              styles.input,
              (confirmPassword || confirmPasswordFocused) && styles.inputWithLabel,
              confirmPasswordFocused && styles.inputFocused,
            ]}
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            onFocus={handleConfirmPasswordFocus}
            onBlur={handleConfirmPasswordBlur}
            secureTextEntry={!showConfirmPassword}
          />
          <TouchableOpacity
            style={styles.eyeIcon}
            onPress={() => setShowConfirmPassword(!showConfirmPassword)}
            hitSlop={{ top: 15, bottom: 15, left: 15, right: 15 }}
          >
            <Ionicons
              name={showConfirmPassword ? "eye-outline" : "eye-off-outline"}
              size={22}
              color="#999"
            />
          </TouchableOpacity>
        </View>
        </View>

        {/* Register Button at Bottom */}
        <View style={styles.bottomContainer}>
          <TouchableOpacity
            style={[
              styles.loginButton,
              (email && password && confirmPassword) && styles.loginButtonActive
            ]}
            disabled={!email || !password || !confirmPassword || loading}
            onPress={handleRegister}
          >
            {loading ? (
              <ActivityIndicator color="white" />
            ) : (
              <Text style={[
                styles.loginButtonText,
                (email && password && confirmPassword) && styles.loginButtonTextActive
              ]}>
                Register
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
    height: 70,
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
