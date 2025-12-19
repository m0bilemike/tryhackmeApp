import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

interface Answer {
  questionId: number;
  answer: string | boolean;
  isCorrect: boolean;
}

interface QuizProgress {
  currentQuestionIndex: number;
  answers: Answer[];
  completed: boolean;
}

interface QuizState {
  quizzes: Record<string, QuizProgress>;
  startQuiz: (quizId: string) => void;
  submitAnswer: (quizId: string, answer: Answer) => void;
  nextQuestion: (quizId: string) => void;
  completeQuiz: (quizId: string) => void;
  resetQuiz: (quizId: string) => void;
}

export const useQuizStore = create<QuizState>()(
  persist(
    (set) => ({
      quizzes: {},

      startQuiz: (quizId) =>
        set((state) => ({
          quizzes: {
            ...state.quizzes,
            [quizId]: state.quizzes[quizId] || {
              currentQuestionIndex: 0,
              answers: [],
              completed: false,
            },
          },
        })),

      submitAnswer: (quizId, answer) =>
        set((state) => ({
          quizzes: {
            ...state.quizzes,
            [quizId]: {
              ...state.quizzes[quizId],
              answers: [...(state.quizzes[quizId]?.answers || []), answer],
            },
          },
        })),

      nextQuestion: (quizId) =>
        set((state) => ({
          quizzes: {
            ...state.quizzes,
            [quizId]: {
              ...state.quizzes[quizId],
              currentQuestionIndex: (state.quizzes[quizId]?.currentQuestionIndex || 0) + 1,
            },
          },
        })),

      completeQuiz: (quizId) =>
        set((state) => ({
          quizzes: {
            ...state.quizzes,
            [quizId]: { ...state.quizzes[quizId], completed: true },
          },
        })),

      resetQuiz: (quizId) =>
        set((state) => ({
          quizzes: {
            ...state.quizzes,
            [quizId]: { currentQuestionIndex: 0, answers: [], completed: false },
          },
        })),
    }),
    {
      name: 'quiz-storage',
      storage: createJSONStorage(
        () => require('@react-native-async-storage/async-storage').default
      ),
    }
  )
);
