import { View, Text, ScrollView, StyleSheet, Image, Pressable, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Search, Plus, Minus, CircleAlert as AlertCircle } from 'lucide-react-native';
import { useState } from 'react';
import Animated, { useAnimatedStyle, withSpring } from 'react-native-reanimated';

const CATEGORIES = [
  { id: 1, name: 'Fruits', image: 'https://images.unsplash.com/photo-1619566636858-adf3ef46400b?w=64&h=64&q=80&fit=crop' },
  { id: 2, name: 'Vegetables', image: 'https://images.unsplash.com/photo-1597362925123-77861d3fbac7?w=64&h=64&q=80&fit=crop' },
  { id: 3, name: 'Dairy', image: 'https://images.unsplash.com/photo-1628088062854-d1870b4553da?w=64&h=64&q=80&fit=crop' },
  { id: 4, name: 'Bakery', image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=64&h=64&q=80&fit=crop' },
  { id: 5, name: 'Beverages', image: 'https://images.unsplash.com/photo-1625772299848-391b6a87d7b3?w=64&h=64&q=80&fit=crop' },
];

const FRUITS = [
  {
    id: 1,
    name: 'Organic Bananas',
    price: 4.99,
    unit: 'kg',
    image: 'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=200&h=200&q=80&fit=crop',
    stock: 3,
  },
  {
    id: 2,
    name: 'Fresh Strawberries',
    price: 6.99,
    unit: 'box',
    image: 'https://images.unsplash.com/photo-1464965911861-746a04b4bca6?w=200&h=200&q=80&fit=crop',
    stock: 8,
  },
  {
    id: 3,
    name: 'Red Apples',
    price: 3.99,
    unit: 'kg',
    image: 'https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=200&h=200&q=80&fit=crop',
    stock: 15,
  },
  {
    id: 4,
    name: 'Mangoes',
    price: 5.99,
    unit: 'kg',
    image: 'https://images.unsplash.com/photo-1553279768-865429fa0078?w=200&h=200&q=80&fit=crop',
    stock: 6,
  },
];

const DEALS = [
  {
    id: 1,
    title: 'Fresh Organic Fruits',
    image: 'https://images.unsplash.com/photo-1610832958506-aa56368176cf?w=500&h=300&q=80&fit=crop',
    discount: '20% OFF',
    endTime: '2h 30m',
  },
  {
    id: 2,
    title: 'Farm Fresh Vegetables',
    image: 'https://images.unsplash.com/photo-1566385101042-1a0aa0c1268c?w=500&h=300&q=80&fit=crop',
    discount: '15% OFF',
    endTime: '5h 45m',
  },
];

export default function HomeScreen() {
  const [selectedCategory, setSelectedCategory] = useState('Fruits');
  const [quantities, setQuantities] = useState<Record<number, number>>({});

  const updateQuantity = (id: number, delta: number) => {
    setQuantities(prev => {
      const current = prev[id] || 0;
      const newQuantity = Math.max(0, current + delta);
      return { ...prev, [id]: newQuantity };
    });
  };

  const CategoryButton = ({ category }: { category: typeof CATEGORIES[0] }) => {
    const isSelected = category.name === selectedCategory;
    return (
      <Pressable
        onPress={() => setSelectedCategory(category.name)}
        style={[styles.categoryButton, isSelected && styles.categoryButtonSelected]}>
        <Image source={{ uri: category.image }} style={styles.categoryButtonImage} />
        <Text style={[styles.categoryButtonText, isSelected && styles.categoryButtonTextSelected]}>
          {category.name}
        </Text>
      </Pressable>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.greeting}>Good Morning!</Text>
          <Text style={styles.location}>Delivering to San Francisco</Text>
        </View>

        <Pressable style={styles.searchBar}>
          <Search size={20} color="#64748b" />
          <Text style={styles.searchText}>Search for groceries...</Text>
        </Pressable>

        <View style={styles.categoriesSection}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoriesScroll}>
            {CATEGORIES.map((category) => (
              <CategoryButton key={category.id} category={category} />
            ))}
          </ScrollView>
        </View>

        <View style={styles.fruitsSection}>
          <Text style={styles.sectionTitle}>Fresh Fruits</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.fruitsScroll}>
            {FRUITS.map((fruit) => (
              <View key={fruit.id} style={styles.fruitCard}>
                <Image source={{ uri: fruit.image }} style={styles.fruitImage} />
                <View style={styles.fruitInfo}>
                  <Text style={styles.fruitName}>{fruit.name}</Text>
                  <Text style={styles.fruitPrice}>
                    ${fruit.price.toFixed(2)} / {fruit.unit}
                  </Text>
                  {fruit.stock <= 5 && (
                    <View style={styles.stockWarning}>
                      <AlertCircle size={16} color="#ef4444" />
                      <Text style={styles.stockWarningText}>Only {fruit.stock} left!</Text>
                    </View>
                  )}
                  <View style={styles.quantityControls}>
                    <Pressable
                      style={styles.quantityButton}
                      onPress={() => updateQuantity(fruit.id, -1)}>
                      <Minus size={16} color="#64748b" />
                    </Pressable>
                    <Text style={styles.quantity}>{quantities[fruit.id] || 0}</Text>
                    <Pressable
                      style={styles.quantityButton}
                      onPress={() => updateQuantity(fruit.id, 1)}>
                      <Plus size={16} color="#64748b" />
                    </Pressable>
                  </View>
                </View>
              </View>
            ))}
          </ScrollView>
        </View>

        <View style={styles.dealsSection}>
          <Text style={styles.sectionTitle}>Flash Deals</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.dealsScroll}>
            {DEALS.map((deal) => (
              <Pressable key={deal.id} style={styles.dealCard}>
                <Image source={{ uri: deal.image }} style={styles.dealImage} />
                <View style={styles.dealInfo}>
                  <Text style={styles.dealTitle}>{deal.title}</Text>
                  <View style={styles.dealMeta}>
                    <Text style={styles.dealDiscount}>{deal.discount}</Text>
                    <Text style={styles.dealTimer}>Ends in {deal.endTime}</Text>
                  </View>
                </View>
              </Pressable>
            ))}
          </ScrollView>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  scrollView: {
    flex: 1,
  },
  header: {
    padding: 16,
  },
  greeting: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 24,
    color: '#0f172a',
    marginBottom: 4,
  },
  location: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#64748b',
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    marginHorizontal: 16,
    marginVertical: 8,
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  searchText: {
    marginLeft: 8,
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#94a3b8',
  },
  categoriesSection: {
    marginTop: 8,
    paddingHorizontal: 16,
  },
  categoriesScroll: {
    marginLeft: -8,
  },
  categoryButton: {
    alignItems: 'center',
    marginHorizontal: 8,
    backgroundColor: '#ffffff',
    padding: 12,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  categoryButtonSelected: {
    backgroundColor: '#22c55e',
    borderColor: '#22c55e',
  },
  categoryButtonImage: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginBottom: 8,
  },
  categoryButtonText: {
    fontFamily: 'Inter-Medium',
    fontSize: 12,
    color: '#334155',
  },
  categoryButtonTextSelected: {
    color: '#ffffff',
  },
  fruitsSection: {
    marginTop: 24,
    paddingHorizontal: 16,
  },
  sectionTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 18,
    color: '#0f172a',
    marginBottom: 16,
  },
  fruitsScroll: {
    marginLeft: -8,
  },
  fruitCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    marginHorizontal: 8,
    width: 200,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  fruitImage: {
    width: '100%',
    height: 140,
  },
  fruitInfo: {
    padding: 12,
  },
  fruitName: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 14,
    color: '#0f172a',
    marginBottom: 4,
  },
  fruitPrice: {
    fontFamily: 'Inter-Bold',
    fontSize: 16,
    color: '#22c55e',
    marginBottom: 8,
  },
  stockWarning: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  stockWarningText: {
    fontFamily: 'Inter-Medium',
    fontSize: 12,
    color: '#ef4444',
    marginLeft: 4,
  },
  quantityControls: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f1f5f9',
    borderRadius: 20,
    padding: 4,
  },
  quantityButton: {
    width: 28,
    height: 28,
    backgroundColor: '#ffffff',
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    ...Platform.select({
      web: {
        cursor: 'pointer',
      },
    }),
  },
  quantity: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: '#0f172a',
    marginHorizontal: 12,
  },
  dealsSection: {
    marginTop: 32,
    paddingHorizontal: 16,
    marginBottom: 24,
  },
  dealsScroll: {
    marginLeft: -8,
  },
  dealCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    marginHorizontal: 8,
    width: 280,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  dealImage: {
    width: '100%',
    height: 160,
  },
  dealInfo: {
    padding: 16,
  },
  dealTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#0f172a',
    marginBottom: 8,
  },
  dealMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dealDiscount: {
    fontFamily: 'Inter-Bold',
    fontSize: 14,
    color: '#22c55e',
  },
  dealTimer: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: '#64748b',
  },
});