import {
  Animated,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Alert,
  ActivityIndicator,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import {Stack, useRouter} from "expo-router";
import Feather from "@expo/vector-icons/Feather";
import {Ionicons} from "@expo/vector-icons";
import {useRef, useState} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function ChangePassword() {
  const router = useRouter();
  const [step, setStep] = useState(1); // 1 for old password, 2 for new passwords

  // Form fields
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // UI states
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [oldPasswordFocused, setOldPasswordFocused] = useState(false);
  const [newPasswordFocused, setNewPasswordFocused] = useState(false);
  const [confirmPasswordFocused, setConfirmPasswordFocused] = useState(false);
  const [loading, setLoading] = useState(false);

  // Animations
  const oldPasswordLabelAnimation = useRef(new Animated.Value(0)).current;
  const newPasswordLabelAnimation = useRef(new Animated.Value(0)).current;
  const confirmPasswordLabelAnimation = useRef(new Animated.Value(0)).current;

  const handleOldPasswordFocus = () => {
    setOldPasswordFocused(true);
    Animated.timing(oldPasswordLabelAnimation, {
      toValue: 1,
      duration: 200,
      useNativeDriver: false,
    }).start();
  };

  const handleOldPasswordBlur = () => {
    setOldPasswordFocused(false);
    if (oldPassword === "") {
      Animated.timing(oldPasswordLabelAnimation, {
        toValue: 0,
        duration: 200,
        useNativeDriver: false,
      }).start();
    }
  };

  const handleNewPasswordFocus = () => {
    setNewPasswordFocused(true);
    Animated.timing(newPasswordLabelAnimation, {
      toValue: 1,
      duration: 200,
      useNativeDriver: false,
    }).start();
  };

  const handleNewPasswordBlur = () => {
    setNewPasswordFocused(false);
    if (newPassword === "") {
      Animated.timing(newPasswordLabelAnimation, {
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
  const oldPasswordLabelStyle = {
    top: oldPasswordLabelAnimation.interpolate({
      inputRange: [0, 1],
      outputRange: [20, 8],
    }),
    fontSize: oldPasswordLabelAnimation.interpolate({
      inputRange: [0, 1],
      outputRange: [16, 12],
    }),
    color: oldPasswordLabelAnimation.interpolate({
      inputRange: [0, 1],
      outputRange: ["#999", "#49B3E4"],
    }),
  };

  const newPasswordLabelStyle = {
    top: newPasswordLabelAnimation.interpolate({
      inputRange: [0, 1],
      outputRange: [20, 8],
    }),
    fontSize: newPasswordLabelAnimation.interpolate({
      inputRange: [0, 1],
      outputRange: [16, 12],
    }),
    color: newPasswordLabelAnimation.interpolate({
      inputRange: [0, 1],
      outputRange: ["#999", "#49B3E4"],
    }),
  };

  const confirmPasswordLabelStyle = {
    top: confirmPasswordLabelAnimation.interpolate({
      inputRange: [0, 1],
      outputRange: [20, 8],
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

  const handleFirstStep = () => {
    if (oldPassword) {
      setStep(2);
    }
  };

  const handleChangePassword = async () => {
    if (!newPassword || !confirmPassword) return;

    if (newPassword !== confirmPassword) {
      Alert.alert("Error", "Passwords do not match");
      return;
    }

    setLoading(true);
    try {
      const token = await AsyncStorage.getItem("userToken");

      if (!token) {
        Alert.alert("Error", "You need to be logged in");
        router.replace("/(auth)/login");
        return;
      }

      const response = await fetch("https://rstow.ru/api/auth/change-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify({
          old_password: oldPassword,
          new_password: newPassword,
          new_password_confirmation: confirmPassword,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        Alert.alert("Success", "Password changed successfully", [
          {
            text: "OK",
            onPress: () => router.back(),
          },
        ]);
      } else {
        Alert.alert("Error", data.message || "Failed to change password");
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
      <View style={{flex: 1, backgroundColor: "white"}}>
        <StatusBar barStyle="dark-content" />
        <Stack.Screen options={{ headerShown: false }} />

        <View style={styles.customHeader}>
          <TouchableOpacity
            onPress={() => {
              if (step === 2) {
                setStep(1);
              } else {
                router.back();
              }
            }}
            style={styles.backButton}
          >
            <Feather name="chevron-left" size={24} color="black" />
            <Text style={styles.backText}>Back</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.container}>
          {step === 1 ? (
            <>
              <Text style={styles.pageTitle}>Change password</Text>
              <Text style={styles.subtitle}>
                Enter your current password to continue
              </Text>

              <View style={styles.inputContainer}>
                <Animated.Text style={[styles.label, oldPasswordLabelStyle]}>
                  Enter password
                </Animated.Text>
                <TextInput
                  style={[
                    styles.input,
                    (oldPassword || oldPasswordFocused) && styles.inputWithLabel,
                    oldPasswordFocused && styles.inputFocused,
                  ]}
                  value={oldPassword}
                  onChangeText={setOldPassword}
                  onFocus={handleOldPasswordFocus}
                  onBlur={handleOldPasswordBlur}
                  secureTextEntry={!showOldPassword}
                />
                <TouchableOpacity
                  style={styles.eyeIcon}
                  onPress={() => setShowOldPassword(!showOldPassword)}
                >
                  <Ionicons
                    name={showOldPassword ? "eye-outline" : "eye-off-outline"}
                    size={22}
                    color="#999"
                  />
                </TouchableOpacity>
              </View>
            </>
          ) : (
            <>
              <Text style={styles.pageTitle}>Enter new password</Text>
              <Text style={styles.subtitle}>
                Save your password and don't forget it again
              </Text>

              <View style={styles.inputContainer}>
                <Animated.Text style={[styles.label, newPasswordLabelStyle]}>
                  New password
                </Animated.Text>
                <TextInput
                  style={[
                    styles.input,
                    (newPassword || newPasswordFocused) && styles.inputWithLabel,
                    newPasswordFocused && styles.inputFocused,
                  ]}
                  value={newPassword}
                  onChangeText={setNewPassword}
                  onFocus={handleNewPasswordFocus}
                  onBlur={handleNewPasswordBlur}
                  secureTextEntry={!showNewPassword}
                />
                <TouchableOpacity
                  style={styles.eyeIcon}
                  onPress={() => setShowNewPassword(!showNewPassword)}
                >
                  <Ionicons
                    name={showNewPassword ? "eye-outline" : "eye-off-outline"}
                    size={22}
                    color="#999"
                  />
                </TouchableOpacity>
              </View>

              <View style={styles.inputContainer}>
                <Animated.Text style={[styles.label, confirmPasswordLabelStyle]}>
                  Confirm password
                </Animated.Text>
                <TextInput
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
                >
                  <Ionicons
                    name={showConfirmPassword ? "eye-outline" : "eye-off-outline"}
                    size={22}
                    color="#999"
                  />
                </TouchableOpacity>
              </View>
            </>
          )}
        </View>

        <View style={styles.bottomContainer}>
          <TouchableOpacity
            style={[
              styles.submitButton,
              (step === 1 ? oldPassword : (newPassword && confirmPassword)) && styles.submitButtonActive
            ]}
            disabled={step === 1 ? !oldPassword : (!newPassword || !confirmPassword || loading)}
            onPress={step === 1 ? handleFirstStep : handleChangePassword}
          >
            {loading ? (
              <ActivityIndicator color="white" />
            ) : (
              <Text style={[
                styles.submitButtonText,
                (step === 1 ? oldPassword : (newPassword && confirmPassword)) && styles.submitButtonTextActive
              ]}>
                {step === 1 ? "Send" : "Save changes"}
              </Text>
            )}
          </TouchableOpacity>

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
  pageTitle: {
    fontSize: 32,
    fontWeight: "600",
    color: "#000",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 15,
    color: "#666",
    marginBottom: 32,
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
  bottomContainer: {
    paddingHorizontal: 20,
    paddingBottom: 8,
    backgroundColor: "white",
  },
  submitButton: {
    height: 56,
    borderRadius: 12,
    backgroundColor: "#E8E8E8",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
  submitButtonActive: {
    backgroundColor: "#49B3E4",
  },
  submitButtonText: {
    fontSize: 17,
    fontWeight: "600",
    color: "#A0A0A0",
  },
  submitButtonTextActive: {
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
