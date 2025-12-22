import AsyncStorage from '@react-native-async-storage/async-storage';
import { DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack, useRouter, useSegments } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { createContext, useContext, useEffect, useRef, useState } from 'react';
import 'react-native-reanimated';

export const unstable_settings = {
  anchor: '(tabs)',
};

interface OnboardingContextType {
  completeOnboarding: () => Promise<void>;
  isOnboardingComplete: boolean | null;
}

const OnboardingContext = createContext<OnboardingContextType>({
  completeOnboarding: async () => {},
  isOnboardingComplete: null,
});

export const useOnboarding = () => useContext(OnboardingContext);

export default function RootLayout() {
  const [isOnboardingComplete, setIsOnboardingComplete] = useState<boolean | null>(null);
  const router = useRouter();
  const segments = useSegments();
  const isNavigating = useRef(false);

  useEffect(() => {
    checkOnboarding();
  }, []);

  const checkOnboarding = async () => {
    try {
      const value = await AsyncStorage.getItem('onboarding_complete');
      setIsOnboardingComplete(value === 'true');
    } catch (error) {
      console.error('Error checking onboarding status:', error);
      setIsOnboardingComplete(false);
    }
  };

  const completeOnboarding = async () => {
    try {
      await AsyncStorage.setItem('onboarding_complete', 'true');
      setIsOnboardingComplete(true);
    } catch (error) {
      console.error('Error saving onboarding status:', error);
    }
  };

  useEffect(() => {
    if (isOnboardingComplete === null || isNavigating.current) return;

    const inOnboarding = segments[0] === '(onboarding)';

    // Redirect to onboarding if not complete and not already there
    if (!isOnboardingComplete && !inOnboarding) {
      isNavigating.current = true;
      router.replace('/(onboarding)/screen1');
      setTimeout(() => {
        isNavigating.current = false;
      }, 500);
    }
    // Redirect to auth if onboarding is complete but still in onboarding
    else if (isOnboardingComplete && inOnboarding) {
      isNavigating.current = true;
      router.replace('/(auth)');
      setTimeout(() => {
        isNavigating.current = false;
      }, 500);
    }
  }, [isOnboardingComplete, segments]);

  if (isOnboardingComplete === null) {
    return null;
  }

  return (
    <OnboardingContext.Provider value={{ completeOnboarding, isOnboardingComplete }}>
      <ThemeProvider value={DefaultTheme}>
        <Stack>
          <Stack.Screen name="(onboarding)" options={{ headerShown: false }} />
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        </Stack>
        <StatusBar style="auto" />
      </ThemeProvider>
    </OnboardingContext.Provider>
  );
}
