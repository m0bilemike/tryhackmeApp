import { useRef, useState } from 'react';
import {
  Animated,
  StyleSheet,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { Question } from '../types/quiz';

interface Props {
  question: Question;
  onConfirm: (answer: any, isCorrect: boolean) => void;
  onNext: () => void;
}

export default function QuestionRenderer({ question, onConfirm, onNext }: Props) {
  const [answer, setAnswer] = useState<any>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [pressedOption, setPressedOption] = useState<any>(null);

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const shakeAnim = useRef(new Animated.Value(0)).current;

  const checkAnswer = () => {
    let correct = false;

    if (question.type === 'multiple_choice') correct = answer === question.correctAnswer;
    if (question.type === 'true_false') correct = answer === question.correctAnswer;
    if (question.type === 'open_text') {
      const text = answer?.toString().toLowerCase() || '';
      correct =
        !!question.acceptableAnswers?.some(a => text.includes(a.toLowerCase())) ||
        !!question.acceptableKeywords?.some(k => text.includes(k.toLowerCase()));
    }

    setIsCorrect(correct);
    setShowExplanation(true);
    onConfirm(answer, correct);

    fadeAnim.setValue(0);
    Animated.timing(fadeAnim, { toValue: 1, duration: 500, useNativeDriver: true }).start();

    if (!correct) {
      shakeAnim.setValue(0);
      Animated.sequence([
        Animated.timing(shakeAnim, { toValue: 10, duration: 50, useNativeDriver: true }),
        Animated.timing(shakeAnim, { toValue: -10, duration: 50, useNativeDriver: true }),
        Animated.timing(shakeAnim, { toValue: 10, duration: 50, useNativeDriver: true }),
        Animated.timing(shakeAnim, { toValue: 0, duration: 50, useNativeDriver: true }),
      ]).start();
    }
  };

  const handleNext = () => {
    setShowExplanation(false);
    setAnswer(null);
    setPressedOption(null);
    onNext();
  };

  const renderOption = (opt: string | boolean) => {
    const selected = answer === opt;

    const handlePressIn = () => {
      setPressedOption(opt);
      Animated.spring(scaleAnim, { toValue: 0.95, useNativeDriver: true }).start();
    };

    const handlePressOut = () => {
      setPressedOption(null);
      Animated.spring(scaleAnim, { toValue: 1, useNativeDriver: true }).start();
      if (!showExplanation) setAnswer(opt);
    };

    return (
      <TouchableWithoutFeedback
        key={opt.toString()}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}>
        <Animated.View
          style={{
            padding: 12,
            marginVertical: 5,
            borderRadius: 10,
            borderWidth: selected ? 2 : 1,
            borderColor: selected ? '#3b82f6' : '#d1d5db',
            backgroundColor: selected ? '#bfdbfe' : '#fff',
            transform: pressedOption === opt ? [{ scale: scaleAnim }] : [{ scale: 1 }],
          }}>
          <Text style={{ fontSize: 16 }}>{opt.toString()}</Text>
        </Animated.View>
      </TouchableWithoutFeedback>
    );
  };

  const isSubmitDisabled =
    showExplanation ||
    (question.type !== 'open_text' && answer === null) ||
    (question.type === 'open_text' && !answer?.trim());

  return (
    <View style={{ marginVertical: 15 }}>
      <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 10 }}>
        {question.question}
      </Text>

      {!showExplanation && (
        <>
          {question.type === 'multiple_choice' && question.options.map(opt => renderOption(opt))}

          {question.type === 'true_false' && [true, false].map(opt => renderOption(opt))}

          {question.type === 'open_text' && (
            <TextInput
              placeholder="Type your answer"
              value={answer || ''}
              onChangeText={setAnswer}
              style={styles.textInput}
            />
          )}

          <TouchableWithoutFeedback onPress={checkAnswer} disabled={isSubmitDisabled}>
            <Animated.View
              style={[
                styles.submitButton,
                {
                  backgroundColor: isSubmitDisabled ? '#9ca3af' : '#3b82f6',
                },
              ]}>
              <Text style={{ color: '#fff', fontWeight: 'bold' }}>Submit</Text>
            </Animated.View>
          </TouchableWithoutFeedback>
        </>
      )}

      {showExplanation && (
        <Animated.View
          style={{
            opacity: fadeAnim,
            transform: [{ translateX: shakeAnim }],
            marginTop: 15,
            padding: 15,
            borderRadius: 12,
            backgroundColor: isCorrect ? '#d1fae5' : '#fee2e2',
          }}>
          <Text style={styles.answerResult}>{isCorrect ? 'Correct ✅' : 'Incorrect ❌'}</Text>
          <Text style={{ marginTop: 5 }}>{question.explanation}</Text>

          <TouchableWithoutFeedback onPress={handleNext}>
            <Animated.View style={styles.nextButton}>
              <Text style={{ color: '#fff', fontWeight: 'bold' }}>Next Question</Text>
            </Animated.View>
          </TouchableWithoutFeedback>
        </Animated.View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  textInput: {
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 10,
    padding: 10,
    fontSize: 16,
    backgroundColor: '#fff',
  },
  answerResult: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  submitButton: {
    marginTop: 10,
    padding: 12,
    borderRadius: 10,
    alignItems: 'center',
  },
  nextButton: {
    marginTop: 10,
    padding: 12,
    borderRadius: 10,
    backgroundColor: '#3b82f6',
    alignItems: 'center',
  },
});
