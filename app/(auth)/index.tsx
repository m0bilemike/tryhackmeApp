import { router } from "expo-router";
import { Button, Text, View } from "react-native";

export default function Onboarding() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Welcome to Cyber Quiz 🚀</Text>
      <Button title="Get Started" onPress={() => router.push("/(auth)/login")} />
    </View>
  );
}