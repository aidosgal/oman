import {Animated, Image, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View, Alert, ActivityIndicator} from "react-native";
import {Stack, useRouter} from "expo-router";
import Feather from "@expo/vector-icons/Feather";
import {useRef, useState, useEffect} from "react";
import * as ImagePicker from "expo-image-picker";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function UpdateProfile() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [nameFocused, setNameFocused] = useState(false);
  const [description, setDescription] = useState("");
  const [avatar, setAvatar] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const nameLabelAnimation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    fetchUserProfile();
  }, []);

  const fetchUserProfile = async () => {
    try {
      const token = await AsyncStorage.getItem("userToken");
      if (!token) {
        router.replace("/(auth)/login");
        return;
      }

      const response = await fetch("https://rstow.ru/api/auth/info", {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const userInfo = await response.json();
        if (userInfo.name) {
          setName(userInfo.name);
          nameLabelAnimation.setValue(1);
        }
        setDescription(userInfo.description || "");
        setAvatar(userInfo.avatar_url);
      }
    } catch (error) {
      console.error("Error fetching profile:", error);
    }
  };

  const pickImage = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      Alert.alert("Permission Required", "You need to allow access to your photos");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });

    if (!result.canceled && result.assets[0]) {
      setAvatar(result.assets[0].uri);
    }
  };

  const nameLabelStyle = {
    top: nameLabelAnimation.interpolate({
      inputRange: [0, 1],
      outputRange: [20, 8],
    }),
    fontSize: nameLabelAnimation.interpolate({
      inputRange: [0, 1],
      outputRange: [16, 12],
    }),
    color: nameLabelAnimation.interpolate({
      inputRange: [0, 1],
      outputRange: ["#999", "#49B3E4"],
    }),
  };

  const handleNameFocus = () => {
    setNameFocused(true);
    Animated.timing(nameLabelAnimation, {
      toValue: 1,
      duration: 200,
      useNativeDriver: false,
    }).start();
  };

  const handleNameBlur = () => {
    setNameFocused(false);
    if (name === "") {
      Animated.timing(nameLabelAnimation, {
        toValue: 0,
        duration: 200,
        useNativeDriver: false,
      }).start();
    }
  };

  const handleUpdateProfile = async () => {
    setLoading(true);
    try {
      const token = await AsyncStorage.getItem("userToken");
      if (!token) {
        Alert.alert("Error", "You need to be logged in");
        router.replace("/(auth)/login");
        return;
      }

      const formData = new FormData();
      formData.append("name", name);
      formData.append("description", description);

      if (avatar && avatar.startsWith("file://")) {
        const uriParts = avatar.split(".");
        const fileType = uriParts[uriParts.length - 1];

        formData.append("avatar", {
          uri: avatar,
          name: `avatar.${fileType}`,
          type: `image/${fileType}`,
        } as any);
      }

      const response = await fetch("https://rstow.ru/api/auth/update-profile", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
        body: formData,
      });

      if (response.ok) {
        Alert.alert("Success", "Profile updated successfully", [
          {
            text: "OK",
            onPress: () => router.back(),
          },
        ]);
      } else {
        const data = await response.json();
        Alert.alert("Error", data.message || "Failed to update profile");
      }
    } catch (error) {
      Alert.alert("Error", "Something went wrong. Please try again.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={{flex: 1}}>
      <StatusBar barStyle="dark-content" />
      <Stack.Screen options={{ headerShown: false }} />

      <View style={styles.customHeader}>
        <TouchableOpacity onPress={() => router.back()}>
          <Feather name="chevron-left" size={24} color="black" />
        </TouchableOpacity>

        <Text style={styles.title}>Profile settings</Text>

        <View style={{ width: 24 }} />
      </View>

      <View style={{marginTop: 30, paddingHorizontal: 20, flex: 1}}>
        <View style={{flexDirection: "column", zIndex: 20}}>
          <TouchableOpacity onPress={pickImage}>
            <Image
              style={{width: 100, height: 100, borderRadius: 20, marginHorizontal: "auto", marginBottom: -20}}
              source={avatar ? { uri: avatar } : require("../../assets/images/avatar.png")}
            />
          </TouchableOpacity>
        </View>
        <View style={{padding: 20, backgroundColor: "white", borderRadius: 20, zIndex: 10, paddingTop: 40}}>
          <View style={styles.inputContainer}>
            <Animated.Text style={[styles.label, nameLabelStyle]}>
              Name
            </Animated.Text>
            <TextInput
              style={[
                styles.input,
                (name || nameFocused) && styles.inputWithLabel,
                nameFocused && styles.inputFocused,
              ]}
              value={name}
              onChangeText={setName}
              onFocus={handleNameFocus}
              onBlur={handleNameBlur}
              autoCapitalize="words"
            />
          </View>
          <Text style={{fontWeight: 400, fontSize: 14, color: "#838BA7"}}>max {name.length}/50</Text>

          <View style={[styles.inputContainer, {marginTop: 20}]}>
            <Text style={{fontWeight: 500, fontSize: 14, color: "#000", marginBottom: 8}}>Description of the situation</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              value={description}
              onChangeText={(text) => {
                if (text.length <= 120) {
                  setDescription(text);
                }
              }}
              placeholder="Tell us about yourself"
              placeholderTextColor="#999"
              multiline
              numberOfLines={4}
              maxLength={120}
              textAlignVertical="top"
            />
          </View>
          <Text style={{fontWeight: 400, fontSize: 14, color: "#838BA7"}}>max {description.length}/120</Text>
        </View>
      </View>

      {/* Bottom Button */}
      <View style={styles.bottomContainer}>
        <TouchableOpacity
          style={[
            styles.updateButton,
            (name && description) && styles.updateButtonActive
          ]}
          disabled={!name || !description || loading}
          onPress={handleUpdateProfile}
        >
          {loading ? (
            <ActivityIndicator color="white" />
          ) : (
            <Text style={[
              styles.updateButtonText,
              (name && description) && styles.updateButtonTextActive
            ]}>
              Save changes
            </Text>
          )}
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  customHeader: {
    paddingTop: 60,
    paddingHorizontal: 20,
    height: 120,
    backgroundColor: "white",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
    color: "black",
  },
  inputContainer: {
    marginBottom: 5,
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
  textArea: {
    height: 120,
    paddingTop: 16,
  },
  bottomContainer: {
    paddingHorizontal: 20,
    paddingBottom: 20,
    backgroundColor: "white",
  },
  updateButton: {
    height: 56,
    borderRadius: 12,
    backgroundColor: "#E8E8E8",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
  updateButtonActive: {
    backgroundColor: "#000000",
  },
  updateButtonText: {
    fontSize: 17,
    fontWeight: "600",
    color: "#A0A0A0",
  },
  updateButtonTextActive: {
    color: "white",
  },
});
