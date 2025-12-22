import { FontAwesome } from '@expo/vector-icons';
import { StyleSheet, View } from 'react-native';

interface DefaultAvatarProps {
  size?: number;
  iconSize?: number;
  backgroundColor?: string;
  iconColor?: string;
}

export default function DefaultAvatar({ 
  size = 100, 
  iconSize = 50, 
  backgroundColor = '#49B3E4', 
  iconColor = 'white' 
}: DefaultAvatarProps) {
  return (
    <View style={[styles.avatarContainer, { width: size, height: size, backgroundColor, borderRadius: size / 5 }]}>
      <FontAwesome name="user" size={iconSize} color={iconColor} />
    </View>
  );
}

const styles = StyleSheet.create({
  avatarContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
