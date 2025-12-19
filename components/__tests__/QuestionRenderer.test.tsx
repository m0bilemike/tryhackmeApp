import { Question } from '@/types/quiz';
import { act, fireEvent, render } from '@testing-library/react-native';
import QuestionRenderer from '../QuestionRenderer';

const sampleQuestion: Question = {
  id: 1,
  type: 'multiple_choice',
  question: 'What is 2 + 2?',
  options: ['3', '4', '5'],
  correctAnswer: '4',
  explanation: '2 + 2 equals 4',
  points: 1,
};

describe('QuestionRenderer', () => {
  it('allows selecting an option, submitting, showing explanation, and moving to next question', () => {
    const onConfirm = jest.fn();
    const onNext = jest.fn();

    const { getByText, queryByText } = render(
      <QuestionRenderer question={sampleQuestion} onConfirm={onConfirm} onNext={onNext} />
    );

    expect(queryByText(/Correct|Incorrect/)).toBeNull();

    const correctOption = getByText('4');
    act(() => {
      fireEvent.press(correctOption);
    });

    const submitButton = getByText('Submit');
    act(() => {
      fireEvent.press(submitButton);
    });

    expect(getByText(/Correct/)).toBeTruthy();
    expect(getByText(/2 \+ 2 equals 4/)).toBeTruthy();

    expect(onConfirm).toHaveBeenCalledWith('4', true);

    const nextButton = getByText('Next Question');
    act(() => {
      fireEvent.press(nextButton);
    });

    expect(onNext).toHaveBeenCalled();

    expect(queryByText(/Correct|Incorrect/)).toBeNull();
  });
});
