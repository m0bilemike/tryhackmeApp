import { StyleSheet, Text, TouchableOpacity, ViewStyle } from 'react-native';

interface CustomButtonProps {
  label: string;
  color?: string;
  onPress: () => void;
  style?: ViewStyle;
}

export default function CustomButton({
  label,
  color = '#007bff',
  onPress,
  style,
}: CustomButtonProps) {
  return (
    <TouchableOpacity
      activeOpacity={0.85}
      onPress={onPress}
      style={[styles.button, { backgroundColor: color }, style]}>
      <Text style={styles.text}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    paddingVertical: 14,
    paddingHorizontal: 20,
    marginTop: 10,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
