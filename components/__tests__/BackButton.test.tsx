import { fireEvent, render } from '@testing-library/react-native';
import { useRouter } from 'expo-router';
import BackButton from '../BackButton';

jest.mock('expo-router', () => ({
  useRouter: jest.fn(),
}));

describe('BackButton', () => {
  it('renders and calls router.back on press', () => {
    const mockBack = jest.fn();
    (useRouter as jest.Mock).mockReturnValue({ back: mockBack });

    const { getByRole } = render(<BackButton />);
    const button = getByRole('button');

    expect(button).toBeTruthy();
    fireEvent.press(button);
    expect(mockBack).toHaveBeenCalled();
  });

  it('renders with custom color and size', () => {
    const mockBack = jest.fn();
    (useRouter as jest.Mock).mockReturnValue({ back: mockBack });

    const { getByRole } = render(<BackButton color="red" size={40} />);
    const button = getByRole('button');
    expect(button).toBeTruthy();
  });
});
