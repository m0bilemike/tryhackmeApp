import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { TouchableOpacity } from 'react-native';

interface BackButtonProps {
  color?: string;
  size?: number;
}

export default function BackButton({ color = '#1f2937', size = 28 }: BackButtonProps) {
  const router = useRouter();

  return (
    <TouchableOpacity
      onPress={() => router.back()}
      accessibilityRole="button"
      style={{
        padding: 8,
        borderRadius: 10,
        backgroundColor: 'rgba(255,255,255,0.2)',
        position: 'absolute',
        top: 40,
        left: 20,
        zIndex: 10,
      }}>
      <Ionicons name="arrow-back" size={size} color={color} />
    </TouchableOpacity>
  );
}
