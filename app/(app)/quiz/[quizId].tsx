import BackButton from "@/components/BackButton";
import { useLocalSearchParams } from "expo-router";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import QuestionRenderer from "../../../components/QuestionRenderer";
import quizData from "../../../data/cybersecurityBasics.json";
import { useQuizStore } from "../../../stores/quizStore";

export default function QuizScreen({ params }: { params: { quizId: string } }) {
  const { quizId } = useLocalSearchParams<{ quizId: string }>();
  const quiz = quizData.quiz; // load the quiz JSON
  const quizState = useQuizStore((s) => s.quizzes[quizId]);
  const startQuiz = useQuizStore((s) => s.startQuiz);
  const submitAnswer = useQuizStore((s) => s.submitAnswer);
  const nextQuestion = useQuizStore((s) => s.nextQuestion);

  if (!quizState) startQuiz(quizId);

  const currentIndex = quizState?.currentQuestionIndex || 0;
  const question = quiz.questions[currentIndex];

  if (!question) {
    return <Text>Quiz completed 🎉</Text>;
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
    <View style={{ flex: 1, padding: 20 }}>
      <BackButton />
      <Text>Question {currentIndex + 1} / {quiz.totalQuestions}</Text>

      <QuestionRenderer
        question={question}
        onConfirm={(answer, isCorrect) => {
          submitAnswer(quizId, {
            questionId: question.id,
            answer,
            isCorrect,
          });
        }}
        onNext={() => nextQuestion(quizId)}
      />
    </View>
    </SafeAreaView>
  );
}