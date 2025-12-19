import { router } from "expo-router";
import { Button, FlatList, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAuthStore } from "../../stores/authStore";
import { useQuizStore } from "../../stores/quizStore";

const quizzes = Array.from({ length: 10 }, (_, i) => ({
  id: `quiz-${i + 1}`,
  title: `Quiz ${i + 1}`,
}));

export default function Home() {
  const startQuiz = useQuizStore((s) => s.startQuiz);
  const resetQuiz = useQuizStore((s) => s.resetQuiz);
  const logout = useAuthStore((s) => s.logout);

  return (
    <SafeAreaView style={{ flex: 1, padding: 20 }}>
    <View>
      <Text>Available Quizzes</Text>

      <FlatList
        data={quizzes}
        keyExtractor={(item) => item.id}
        renderItem={({ item, index }) => (
          <Button
            title={item.title}
            disabled={index !== 0}
            onPress={() => {
              startQuiz(item.id);
              router.push(`/quiz/${item.id}`);
            }}
          />
        )}
      />

      <Button
        title="Logout"
        onPress={() => {
          resetQuiz();
          logout();
          router.replace("/");
        }}
      />
    </View>
    </SafeAreaView>
  );
}