import BackButton from '@/components/BackButton';
import { router, useLocalSearchParams } from 'expo-router';
import { useEffect, useRef } from 'react';
import { Animated, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import QuestionRenderer from '../../../components/QuestionRenderer';
import quizData from '../../../data/cybersecurityBasics.json';
import { useQuizStore } from '../../../stores/quizStore';

export default function QuizScreen() {
  const { quizId } = useLocalSearchParams<{ quizId: string }>();
  const quiz = quizData.quiz;

  const quizState = useQuizStore(s => s.quizzes[quizId]);
  const startQuiz = useQuizStore(s => s.startQuiz);
  const submitAnswer = useQuizStore(s => s.submitAnswer);
  const nextQuestion = useQuizStore(s => s.nextQuestion);
  const completeQuiz = useQuizStore(s => s.completeQuiz);

  if (!quizState) startQuiz(quizId);

  const currentIndex = quizState?.currentQuestionIndex || 0;
  const isCompleted = quizState?.completed || false;
  const question = quiz.questions[currentIndex];

  const progressAnim = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    Animated.timing(progressAnim, {
      toValue: Math.min((currentIndex + 1) / quiz.totalQuestions, 1),
      duration: 600,
      useNativeDriver: false,
    }).start();
  }, [currentIndex]);

  const handleNextQuestion = () => {
    if (currentIndex + 1 >= quiz.totalQuestions) {
      completeQuiz(quizId);
      router.replace('/(app)/home');
    } else {
      nextQuestion(quizId);
    }
  };

  return (
    <SafeAreaView style={styles.safeAreView}>
      <BackButton />
      <View style={styles.container}>
        <Text style={styles.title}>{quiz.title}</Text>

        <View style={styles.progressBarContainer}>
          <Animated.View
            style={[
              styles.progressBar,
              {
                width: progressAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: ['0%', '100%'],
                }),
              },
            ]}
          />
        </View>
        <Text style={styles.questionNumber}>
          Question {Math.min(currentIndex + 1, quiz.totalQuestions)} / {quiz.totalQuestions}
        </Text>

        {isCompleted ? (
          <ScrollView>
            <Text style={styles.quizCompletedText}>Quiz Completed! ✅</Text>
            {quiz.questions.map((q, i) => {
              const userAnswer = quizState.answers.find(a => a.questionId === q.id);
              const correct = userAnswer?.isCorrect;

              return (
                <View
                  key={q.id}
                  style={{
                    backgroundColor: correct ? '#d1fae5' : '#fee2e2',
                    padding: 12,
                    borderRadius: 12,
                    marginBottom: 10,
                  }}>
                  <Text style={styles.bold}>
                    Q{i + 1}: {q.question}
                  </Text>
                  <Text>
                    Your answer: {userAnswer?.answer?.toString() || 'Not answered'}{' '}
                    {correct ? '✅' : '❌'}
                  </Text>
                  <Text>Correct answer: {q.correctAnswer?.toString()}</Text>
                  <Text style={styles.italic}>{q.explanation}</Text>
                </View>
              );
            })}
          </ScrollView>
        ) : (
          question && (
            <QuestionRenderer
              question={question}
              onConfirm={(answer, isCorrect) =>
                submitAnswer(quizId, { questionId: question.id, answer, isCorrect })
              }
              onNext={handleNextQuestion}
            />
          )
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeAreView: {
    flex: 1,
    backgroundColor: '#f0f4f8',
  },
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  progressBarContainer: {
    height: 10,
    backgroundColor: '#dbeafe',
    borderRadius: 5,
    overflow: 'hidden',
    marginBottom: 5,
  },
  progressBar: {
    height: 10,
    borderRadius: 5,
    backgroundColor: '#3b82f6',
  },
  questionNumber: {
    marginBottom: 15,
    fontSize: 16,
    color: '#3b82f6',
  },
  quizCompletedText: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
  },
  bold: {
    fontWeight: 'bold',
  },
  italic: {
    fontStyle: 'italic',
    marginTop: 5,
  },
});
