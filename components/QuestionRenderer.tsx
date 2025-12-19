import { useState } from "react";
import { Button, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Question } from "../types/quiz";

interface Props {
  question: Question;
  onConfirm: (answer: any, isCorrect: boolean) => void;
  onNext: () => void;
}

export default function QuestionRenderer({
  question,
  onConfirm,
  onNext,
}: Props) {
  const [answer, setAnswer] = useState<any>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  const checkAnswer = () => {
    let correct = false;

    if (question.type === "multiple_choice") {
      correct = answer === question.correctAnswer;
    }

    if (question.type === "true_false") {
      correct = answer === question.correctAnswer;
    }

    if (question.type === "open_text") {
      const text = answer.toLowerCase();
      correct =
        question.acceptableAnswers?.some((a) =>
          text.includes(a.toLowerCase())
        ) ||
        question.acceptableKeywords?.some((k) =>
          text.includes(k.toLowerCase())
        );
    }

    setIsCorrect(!!correct);
    setShowExplanation(true);
    onConfirm(answer, !!correct);
  };

  return (
    <SafeAreaView style={{ flex: 1, padding: 20 }}>
    <View style={{ flex: 1 }}>
      <Text>{question.question}</Text>

      {/* Render inputs based on type */}
      {question.type === "multiple_choice" &&
        question.options.map((opt) => (
          <Button key={opt} title={opt} onPress={() => setAnswer(opt)} />
        ))}

      {question.type === "true_false" && (
        <>
          <Button title="True" onPress={() => setAnswer(true)} />
          <Button title="False" onPress={() => setAnswer(false)} />
        </>
      )}

      {question.type === "open_text" && (
        <TextInput
          placeholder="Type your answer"
          onChangeText={setAnswer}
        />
      )}

      {!showExplanation && (
        <Button title="Submit" onPress={checkAnswer} />
      )}

      {showExplanation && (
        <>
          <Text>{isCorrect ? "Correct ✅" : "Incorrect ❌"}</Text>
          <Text>{question.explanation}</Text>
          <Button title="Next" onPress={onNext} />
        </>
      )}
    </View>
    </SafeAreaView>
  );
}