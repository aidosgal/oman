import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Dimensions, ImageBackground, Pressable, StyleSheet, Text, View } from 'react-native';
import { useOnboarding } from '../_layout';

const { width } = Dimensions.get('window');

export default function OnboardingScreen2() {
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
    router.push('/(onboarding)/screen3');
  };

  return (
     <ImageBackground
              source={require('../../assets/images/phone.png')}
              style={styles.gradient}
              resizeMode='contain'
              >
                

      <StatusBar style="dark" />
     
      <View style={styles.content}>
        <Text style={styles.headline}>Receive Your Personal QR Code</Text>
        
        <Text
          style={styles.bodyText}>
          
We’ll generate a unique QR code that you can show to donors, charities, or partner organizations.</Text>
       
        
        
        
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
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a98ffff',
  },

  gradient: {
    flex: 1,
    backgroundColor: '#49B3E4',
    height: '145%',
    width: '110%',
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 70,
    paddingBottom: 360,
    
   
  },
  headline: {
    fontSize: 30,
    fontWeight: '700',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 5,
    marginTop: 50,
    fontFamily: 'Rubik_700Bold',
    paddingHorizontal: 5,
    marginRight: 30,
  },
  bodyText: {
    fontSize: 14,
    color: '#FFFFFF',
    textAlign: 'center',
    lineHeight: 24,
    fontWeight: '300',
    fontFamily: 'Rubik_300Regular',
    marginTop: 10,
    paddingHorizontal: 7,
    marginRight: 30,

  },
 
  
  button: {
    
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    width: 165,
    height: 50,
    alignItems: 'center',
    marginTop: 500,
    marginRight: 10,
    marginLeft: 3,
   
  },
  button2: {
    
    backgroundColor: '#000000ff',
    borderRadius: 12,
    width: 165,
    height: 50,
    alignItems: 'center',
    marginTop: 500,
   
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
  cos: {
    flexDirection: 'row',
  }
});

