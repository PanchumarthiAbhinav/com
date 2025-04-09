import { View, Text, ScrollView, StyleSheet, TextInput, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useCartStore } from '@/store/cart';
import { useState } from 'react';
import { router } from 'expo-router';
import { useAuthStore } from '@/store/auth';
import { db } from '@/lib/firebase';
import { collection, addDoc } from 'firebase/firestore';

interface CheckoutForm {
  name: string;
  phone: string;
  alternatePhone: string;
  address: string;
  city: string;
  zipCode: string;
  instructions: string;
}

export default function CheckoutScreen() {
  const { user } = useAuthStore();
  const { items, getTotalPrice, clearCart } = useCartStore();
  const [form, setForm] = useState<CheckoutForm>({
    name: user?.name || '',
    phone: '',
    alternatePhone: '',
    address: '',
    city: '',
    zipCode: '',
    instructions: '',
  });

  if (!user) {
    router.replace('/(auth)/sign-in');
    return null;
  }

  const subtotal = getTotalPrice();
  const deliveryFee = 2.99;
  const total = subtotal + deliveryFee;

  const handleSubmit = async () => {
    try {
      const order = {
        userId: user.id,
        items,
        totalAmount: total,
        deliveryDetails: form,
        status: 'pending',
        createdAt: new Date().toISOString(),
      };

      await addDoc(collection(db, 'orders'), order);

      clearCart();
      router.push('/order-success');
    } catch (error) {
      console.error('Failed to create order:', error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Checkout</Text>
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Delivery Details</Text>
          <View style={styles.form}>
            <View style={styles.formGroup}>
              <Text style={styles.label}>Full Name</Text>
              <TextInput
                style={styles.input}
                value={form.name}
                onChangeText={(text) => setForm({ ...form, name: text })}
                placeholder="Enter your full name"
              />
            </View>

            <View style={styles.formGroup}>
              <Text style={styles.label}>Phone Number</Text>
              <TextInput
                style={styles.input}
                value={form.phone}
                onChangeText={(text) => setForm({ ...form, phone: text })}
                placeholder="Enter your phone number"
                keyboardType="phone-pad"
              />
            </View>

            <View style={styles.formGroup}>
              <Text style={styles.label}>Alternate Phone Number</Text>
              <TextInput
                style={styles.input}
                value={form.alternatePhone}
                onChangeText={(text) => setForm({ ...form, alternatePhone: text })}
                placeholder="Enter alternate phone number"
                keyboardType="phone-pad"
              />
            </View>

            <View style={styles.formGroup}>
              <Text style={styles.label}>Delivery Address</Text>
              <TextInput
                style={styles.input}
                value={form.address}
                onChangeText={(text) => setForm({ ...form, address: text })}
                placeholder="Enter your street address"
              />
            </View>

            <View style={styles.row}>
              <View style={[styles.formGroup, { flex: 2, marginRight: 8 }]}>
                <Text style={styles.label}>City</Text>
                <TextInput
                  style={styles.input}
                  value={form.city}
                  onChangeText={(text) => setForm({ ...form, city: text })}
                  placeholder="Enter city"
                />
              </View>

              <View style={[styles.formGroup, { flex: 1 }]}>
                <Text style={styles.label}>ZIP Code</Text>
                <TextInput
                  style={styles.input}
                  value={form.zipCode}
                  onChangeText={(text) => setForm({ ...form, zipCode: text })}
                  placeholder="ZIP code"
                  keyboardType="number-pad"
                />
              </View>
            </View>

            <View style={styles.formGroup}>
              <Text style={styles.label}>Delivery Instructions (Optional)</Text>
              <TextInput
                style={[styles.input, styles.textArea]}
                value={form.instructions}
                onChangeText={(text) => setForm({ ...form, instructions: text })}
                placeholder="Add any special instructions"
                multiline
                numberOfLines={3}
              />
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Order Summary</Text>
          {items.map((item) => (
            <View key={item.id} style={styles.orderItem}>
              <View style={styles.orderItemLeft}>
                <Text style={styles.orderItemQuantity}>{item.quantity}x</Text>
                <Text style={styles.orderItemName}>{item.name}</Text>
              </View>
              <Text style={styles.orderItemPrice}>
                ${(item.price * item.quantity).toFixed(2)}
              </Text>
            </View>
          ))}
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <View style={styles.totalSection}>
          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Subtotal</Text>
            <Text style={styles.totalValue}>${subtotal.toFixed(2)}</Text>
          </View>
          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Delivery Fee</Text>
            <Text style={styles.totalValue}>${deliveryFee.toFixed(2)}</Text>
          </View>
          <View style={[styles.totalRow, styles.finalTotal]}>
            <Text style={styles.finalTotalLabel}>Total</Text>
            <Text style={styles.finalTotalValue}>${total.toFixed(2)}</Text>
          </View>
        </View>

        <Pressable style={styles.placeOrderButton} onPress={handleSubmit}>
          <Text style={styles.placeOrderButtonText}>Place Order (Cash on Delivery)</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  header: {
    padding: 16,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
  },
  headerTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 24,
    color: '#0f172a',
  },
  content: {
    flex: 1,
  },
  section: {
    backgroundColor: '#ffffff',
    marginTop: 16,
    padding: 16,
  },
  sectionTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 18,
    color: '#0f172a',
    marginBottom: 16,
  },
  form: {
    gap: 16,
  },
  formGroup: {
    gap: 8,
  },
  label: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: '#64748b',
  },
  input: {
    backgroundColor: '#f8fafc',
    borderRadius: 8,
    padding: 12,
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: '#0f172a',
  },
  textArea: {
    height: 80,
    textAlignVertical: 'top',
  },
  row: {
    flexDirection: 'row',
    gap: 16,
  },
  orderItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
  },
  orderItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  orderItemQuantity: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: '#64748b',
    marginRight: 8,
  },
  orderItemName: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#0f172a',
  },
  orderItemPrice: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: '#0f172a',
  },
  footer: {
    backgroundColor: '#ffffff',
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#e2e8f0',
  },
  totalSection: {
    marginBottom: 16,
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  totalLabel: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#64748b',
  },
  totalValue: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: '#0f172a',
  },
  finalTotal: {
    marginTop: 8,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: '#e2e8f0',
  },
  finalTotalLabel: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 18,
    color: '#0f172a',
  },
  finalTotalValue: {
    fontFamily: 'Inter-Bold',
    fontSize: 18,
    color: '#22c55e',
  },
  placeOrderButton: {
    backgroundColor: '#22c55e',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  placeOrderButtonText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#ffffff',
  },
});