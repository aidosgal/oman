import { useRouter } from 'expo-router';
import { Dimensions, ImageBackground, Pressable, StyleSheet, Text, View } from 'react-native';
import { useOnboarding } from '../_layout';

const { width } = Dimensions.get('window');

export default function OnboardingScreen3() {
  const router = useRouter();
  const { completeOnboarding } = useOnboarding();

  const handleContinue = async () => {
    try {
      await completeOnboarding();
    } catch (error) {
      console.error('Error saving onboarding status:', error);
    }
  };

  return (
    <ImageBackground
                  source={require('../../assets/images/hands.png')}
                  style={styles.gradient}
                  
                  >
    
      <View style={styles.content}>
        
        
        
        <View >
        <Text style={styles.headline}>Oman</Text>
        <Text style={styles.headline2}>Charity</Text>
        </View>
        
        <View>
        <Text style={styles.bodyText}> Help easily.</Text>
        <Text style={styles.bodyText2}> Receive help transparently.</Text>
        </View>
        
        <View style={styles.cos}>
          
          
          <Pressable style={styles.button2} onPress={handleContinue}>
            <Text style={styles.buttonText2}>Ready to start</Text>
          </Pressable>
        </View>

        
      </View>
    
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#49B3E4',
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 60,
    paddingBottom: 40,
   
  },
  gradient: {
    flex: 1,
    backgroundColor: '#49B3E4',
    
  },
  
  headline: {
    fontSize: 55,
    fontWeight: '700',
    color: '#FFFFFF',
    textAlign: 'left',
    marginTop: 270,
    fontFamily: 'Rubik_800Bold',
    paddingHorizontal: 60,
  },
  headline2: {
    fontSize: 55,
    fontWeight: '700',
    color: '#FFFFFF',
    textAlign: 'right',
    fontFamily: 'Rubik_800Bold',
    paddingHorizontal: 60,
  },

  bodyText: {
    fontSize: 16,
    color: '#FFFFFF',
    textAlign: 'right',
    lineHeight: 24,
    fontWeight: '400',
    fontFamily: 'Rubik_300Regular',
    marginTop: 0,
    paddingHorizontal: 60,
},
 bodyText2: {
    fontSize: 16,
    color: '#FFFFFF',
    textAlign: 'right',
    lineHeight: 24,
    fontWeight: '400',
    fontFamily: 'Rubik_300Regular',
    paddingHorizontal: 20,
    marginRight: 40,

  },
 
  
  
  button2: {
    
    backgroundColor: '#252525',
    borderRadius: 12,
    width: 350,
    height: 50,
    alignItems: 'center',
    marginTop: 260,
   
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
  },
});

