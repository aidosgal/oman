import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { ImageBackground, Pressable, StyleSheet, Text, View } from 'react-native';
import { useOnboarding } from '../_layout';

export default function OnboardingScreen1() {
  const router = useRouter();
  const { completeOnboarding } = useOnboarding();

  const handleSkip = async () => {
    try {
      await completeOnboarding();
    } catch (error) {
      console.error('Error saving onboarding status:', error);
    }
  };

  const handleNext = () => {
    router.push('/(onboarding)/screen2');
  };

  return (
    <View style={styles.container} >
      <StatusBar style="light" />
      <ImageBackground
        source={require('../../assets/images/mountain.png')}
        style={styles.gradient}
        >
        <View style={styles.content}>
          
          

          <Text style={styles.headline}>Tell Us About 
Your Situation</Text>
          
          <Text style={styles.bodyText}>
Briefly describe what kind of support you need- we’ll review your request and match you with available assistance programs.          </Text>
          <View style={styles.cos}>
          <Pressable style={styles.button} onPress={handleSkip}>
            <Text style={styles.buttonText}>Skip</Text>
          </Pressable>
          <Pressable style={styles.button2} onPress={handleNext}>
            <Text style={styles.buttonText2}>Next</Text>
          </Pressable>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  cos: {
    flexDirection: 'row',
  },
  gradient: {
    flex: 1,
    backgroundColor: '#49B3E4',
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 100,
    paddingBottom: 1,
    
  },
  
 
  headline: {
    fontSize: 32,
    fontWeight: '700',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 5,
    fontFamily: 'Rubik_700Bold',
    paddingHorizontal: 40,
  },
  bodyText: {
    fontSize: 16,
    color: '#FFFFFF',
    textAlign: 'center',
    lineHeight: 24,
    fontWeight: '300',
    fontFamily: 'Rubik_300Regular',
    marginTop: 10,
    paddingHorizontal: 7,

  },
  button: {
    
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    width: 165,
    height: 50,
    alignItems: 'center',
    marginTop: 490,
    marginRight: 10,
    marginLeft: 3,
   
  },
  button2: {
    
    backgroundColor: '#252525',
    borderRadius: 12,
    width: 165,
    height: 50,
    alignItems: 'center',
    marginTop: 490,
   
  },
  buttonText: {
    alignContent: 'center',
    marginTop: 14,
    fontSize: 16,
    fontWeight: '600',
    color: '#000000ff',
    fontFamily: 'Rubik_600Bold',
  },
  buttonText2: {
    alignContent: 'center',
    marginTop: 14,
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffffff',
    fontFamily: 'Rubik_600Bold',
  },
});

