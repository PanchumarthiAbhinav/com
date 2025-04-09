import { View, Text, Pressable, StyleSheet } from 'react-native';
import { Minus, Plus } from 'lucide-react-native';
import { useCartStore } from '@/store/cart';

interface QuantityControlProps {
  productId: number;
  size?: 'small' | 'large';
}

export function QuantityControl({ productId, size = 'small' }: QuantityControlProps) {
  const { getItemQuantity, updateQuantity } = useCartStore();
  const quantity = getItemQuantity(productId);

  if (quantity === 0) {
    return null;
  }

  const buttonSize = size === 'small' ? 28 : 36;
  const iconSize = size === 'small' ? 16 : 20;
  const fontSize = size === 'small' ? 14 : 16;

  return (
    <View style={styles.container}>
      <Pressable
        style={[styles.button, { width: buttonSize, height: buttonSize }]}
        onPress={() => updateQuantity(productId, -1)}>
        <Minus size={iconSize} color="#64748b" />
      </Pressable>
      <Text style={[styles.quantity, { fontSize }]}>{quantity}</Text>
      <Pressable
        style={[styles.button, { width: buttonSize, height: buttonSize }]}
        onPress={() => updateQuantity(productId, 1)}>
        <Plus size={iconSize} color="#64748b" />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f1f5f9',
    borderRadius: 20,
    padding: 4,
  },
  button: {
    backgroundColor: '#ffffff',
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  quantity: {
    fontFamily: 'Inter-Medium',
    color: '#0f172a',
    marginHorizontal: 12,
  },
});