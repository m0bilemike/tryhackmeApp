import { router } from 'expo-router';
import { useEffect, useRef } from 'react';
import { Animated, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import quizData from '../../data/cybersecurityBasics.json';
import { useAuthStore } from '../../stores/authStore';
import { useQuizStore } from '../../stores/quizStore';

export default function Home() {
  const logout = useAuthStore(s => s.logout);
  const resetQuiz = useQuizStore(s => s.resetQuiz);
  const quizzesProgress = useQuizStore(s => s.quizzes);

  const quizzes = [
    {
      id: 'quiz-1',
      title: quizData.quiz.title,
      difficulty: quizData.quiz.difficulty,
      totalQuestions: quizData.quiz.totalQuestions,
    },
    { id: 'quiz-2', title: 'Networking Quiz', difficulty: 'medium', totalQuestions: 10 },
    { id: 'quiz-3', title: 'Programming Quiz', difficulty: 'hard', totalQuestions: 15 },
  ];

  const handleStartQuiz = (quizId: string) => {
    router.push(`/(app)/quiz/${quizId}`);
  };

  const handleLogout = () => {
    quizzes.forEach(q => resetQuiz(q.id));
    logout();
    router.replace('/(auth)');
  };

  return (
    <SafeAreaView style={styles.safeAreView}>
      <View style={styles.container}>
        <Text style={styles.title}>Try hack me</Text>

        <ScrollView>
          {quizzes.map((quiz, index) => {
            const progress = quizzesProgress[quiz.id]?.answers.length || 0;
            const correctAnswers =
              quizzesProgress[quiz.id]?.answers.filter(a => a.isCorrect).length || 0;
            const isCompleted = quizzesProgress[quiz.id]?.completed || false;
            const isLocked = index > 0;

            const passed = isCompleted && correctAnswers / quiz.totalQuestions >= 0.8;

            const progressAnim = useRef(new Animated.Value(0)).current;
            useEffect(() => {
              Animated.timing(progressAnim, {
                toValue: progress / quiz.totalQuestions,
                duration: 800,
                useNativeDriver: false,
              }).start();
            }, [progress]);

            return (
              <TouchableOpacity
                key={quiz.id}
                onPress={() => handleStartQuiz(quiz.id)}
                disabled={isLocked}
                style={styles.quizCard}>
                <Animated.View
                  style={{
                    padding: 20,
                    backgroundColor: isLocked
                      ? '#d1d5db'
                      : isCompleted
                        ? passed
                          ? '#10b981'
                          : '#f59e0b'
                        : '#3b82f6',
                  }}>
                  <Text style={styles.cardTitle}>
                    {quiz.title}{' '}
                    {isLocked ? '🔒' : isCompleted ? (passed ? '✅ Pass' : '❌ Fail') : '🚀'}
                  </Text>
                  <Text style={styles.quizDifficulty}>Difficulty: {quiz.difficulty}</Text>

                  {!isLocked && !isCompleted && (
                    <View
                      style={{
                        height: 10,
                        backgroundColor: 'lightblue',
                        borderRadius: 5,
                        marginBottom: 5,
                      }}>
                      <Animated.View
                        style={[
                          styles.quizProgressBar,
                          {
                            width: progressAnim.interpolate({
                              inputRange: [0, 1],
                              outputRange: ['0%', '100%'],
                            }),
                          },
                        ]}
                      />
                    </View>
                  )}

                  {!isLocked && isCompleted && (
                    <Text style={{ color: '#fff', fontSize: 14 }}>
                      Score: {correctAnswers}/{quiz.totalQuestions} ✔️
                    </Text>
                  )}

                  {!isLocked && !isCompleted && (
                    <Text style={{ color: '#dbeafe', fontSize: 14 }}>
                      Progress: {progress}/{quiz.totalQuestions}
                    </Text>
                  )}
                </Animated.View>
              </TouchableOpacity>
            );
          })}
        </ScrollView>

        <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
          <Text style={styles.buttonText}>Logout</Text>
        </TouchableOpacity>
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
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  quizCard: {
    marginBottom: 20,
    borderRadius: 15,
    overflow: 'hidden',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  cardTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 5,
  },
  quizDifficulty: {
    color: '#dbeafe',
    marginBottom: 10,
  },
  quizProgressBar: {
    height: 10,
    borderRadius: 5,
    backgroundColor: '#fff',
  },
  logoutButton: {
    backgroundColor: '#ef4444',
    padding: 15,
    borderRadius: 15,
    alignItems: 'center',
    marginTop: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
