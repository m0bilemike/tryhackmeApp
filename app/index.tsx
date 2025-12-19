import { router } from "expo-router";
import { useEffect } from "react";
import { ActivityIndicator, View } from "react-native";
import { useAuthStore } from "../stores/authStore";

export default function Index() {
  const { isLoggedIn, hasHydrated } = useAuthStore();

  useEffect(() => {
    if (!hasHydrated) return;

    setTimeout(() => {
      router.replace(isLoggedIn ? "/(app)/home" : "/(auth)");
    }, 0);
  }, [hasHydrated, isLoggedIn]);

  return (
    <View style={{ flex: 1, justifyContent: "center" }}>
      <ActivityIndicator size="large" />
    </View>
  );
}