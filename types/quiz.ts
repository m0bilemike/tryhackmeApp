export type QuestionType = 'multiple_choice' | 'true_false' | 'open_text';

export interface BaseQuestion {
  id: number;
  type: QuestionType;
  points: number;
  question: string;
  explanation: string;
}

export interface MultipleChoiceQuestion extends BaseQuestion {
  type: 'multiple_choice';
  options: string[];
  correctAnswer: string;
}

export interface TrueFalseQuestion extends BaseQuestion {
  type: 'true_false';
  correctAnswer: boolean;
}

export interface OpenTextQuestion extends BaseQuestion {
  type: 'open_text';
  acceptableKeywords?: string[];
  acceptableAnswers?: string[];
  sampleAnswer: string;
}

export type Question = MultipleChoiceQuestion | TrueFalseQuestion | OpenTextQuestion;

export interface Quiz {
  title: string;
  difficulty: string;
  totalQuestions: number;
  totalPoints: number;
  questions: Question[];
}
