import CustomButton from '@/components/CustomButton';
import { router } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';

export default function Onboarding() {
  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
      <Text>Welcome to Cyber Quiz 🚀</Text>
      </View>
      <CustomButton
        color='#1E90FF'
        label="Get Started"
        onPress={() => router.push('/(auth)/login')}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    // alignItems: 'center',
    padding: 20,
  },
  textContainer: {
    marginBottom: 20,
    alignItems: 'center',
  },
});