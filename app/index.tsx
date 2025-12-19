import { router } from 'expo-router';
import { useEffect } from 'react';
import { ActivityIndicator, StatusBar, View } from 'react-native';
import { useAuthStore } from '../stores/authStore';

export default function Index() {
  const { isLoggedIn, hasHydrated } = useAuthStore();

  useEffect(() => {
    if (!hasHydrated) return;

    setTimeout(() => {
      router.replace(isLoggedIn ? '/(app)/home' : '/(auth)');
    }, 0);
  }, [hasHydrated, isLoggedIn]);

  return (
    <View style={{ flex: 1, justifyContent: 'center' }}>
      <StatusBar barStyle="default" />
      <ActivityIndicator size="large" />
    </View>
  );
}
