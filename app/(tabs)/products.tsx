import { View, Text, ScrollView, StyleSheet, Image, Pressable, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Search, Plus } from 'lucide-react-native';
import { useState } from 'react';
import { useCartStore } from '@/store/cart';
import { QuantityControl } from '@/components/QuantityControl';

const CATEGORIES = [
  { id: 'all', name: 'All Items' },
  { id: 'fruits', name: 'Fresh Fruits' },
  { id: 'vegetables', name: 'Vegetables' },
  { id: 'dairy', name: 'Dairy & Eggs' },
  { id: 'bakery', name: 'Bakery' },
  { id: 'beverages', name: 'Beverages' },
  { id: 'snacks', name: 'Snacks' },
];

const PRODUCTS = [
  {
    id: 1,
    name: 'Organic Bananas',
    price: 4.99,
    unit: 'kg',
    category: 'fruits',
    image: 'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=200&h=200&q=80&fit=crop',
  },
  {
    id: 2,
    name: 'Fresh Strawberries',
    price: 6.99,
    unit: 'box',
    category: 'fruits',
    image: 'https://images.unsplash.com/photo-1464965911861-746a04b4bca6?w=200&h=200&q=80&fit=crop',
  },
  {
    id: 3,
    name: 'Whole Milk',
    price: 3.49,
    unit: 'gallon',
    category: 'dairy',
    image: 'https://images.unsplash.com/photo-1563636619-e9143da7973b?w=200&h=200&q=80&fit=crop',
  },
  {
    id: 4,
    name: 'Fresh Bread',
    price: 2.99,
    unit: 'loaf',
    category: 'bakery',
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=200&h=200&q=80&fit=crop',
  },
  {
    id: 5,
    name: 'Bell Peppers',
    price: 1.99,
    unit: 'piece',
    category: 'vegetables',
    image: 'https://images.unsplash.com/photo-1563565375-f3fdfdbefa83?w=200&h=200&q=80&fit=crop',
  },
  {
    id: 6,
    name: 'Orange Juice',
    price: 4.99,
    unit: 'bottle',
    category: 'beverages',
    image: 'https://images.unsplash.com/photo-1621506289937-a8e4df240d0b?w=200&h=200&q=80&fit=crop',
  },
];

export default function ProductsScreen() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const { addItem, getItemQuantity } = useCartStore();

  const filteredProducts = PRODUCTS.filter(product => {
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>All Products</Text>
        <View style={styles.searchBar}>
          <Search size={20} color="#64748b" />
          <TextInput
            style={styles.searchInput}
            placeholder="Search products..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholderTextColor="#94a3b8"
          />
        </View>
      </View>

      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        style={styles.categoriesContainer}>
        {CATEGORIES.map((category) => (
          <Pressable
            key={category.id}
            style={[
              styles.categoryButton,
              selectedCategory === category.id && styles.categoryButtonSelected,
            ]}
            onPress={() => setSelectedCategory(category.id)}>
            <Text
              style={[
                styles.categoryButtonText,
                selectedCategory === category.id && styles.categoryButtonTextSelected,
              ]}>
              {category.name}
            </Text>
          </Pressable>
        ))}
      </ScrollView>

      <ScrollView style={styles.productsContainer}>
        <View style={styles.productsGrid}>
          {filteredProducts.map((product) => {
            const quantity = getItemQuantity(product.id);
            return (
              <View key={product.id} style={styles.productCard}>
                <Image source={{ uri: product.image }} style={styles.productImage} />
                <View style={styles.productInfo}>
                  <Text style={styles.productName}>{product.name}</Text>
                  <Text style={styles.productUnit}>per {product.unit}</Text>
                  <View style={styles.productBottom}>
                    <Text style={styles.productPrice}>${product.price.toFixed(2)}</Text>
                    {quantity === 0 ? (
                      <Pressable
                        style={styles.addButton}
                        onPress={() => addItem(product)}>
                        <Plus size={20} color="#ffffff" />
                      </Pressable>
                    ) : (
                      <QuantityControl productId={product.id} />
                    )}
                  </View>
                </View>
              </View>
            );
          })}
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
    marginBottom: 12,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f1f5f9',
    padding: 12,
    borderRadius: 12,
  },
  searchInput: {
    flex: 1,
    marginLeft: 8,
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: '#0f172a',
  },
  categoriesContainer: {
    backgroundColor: '#ffffff',
    paddingVertical: 12,
  },
  categoryButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginHorizontal: 4,
    borderRadius: 20,
    backgroundColor: '#f1f5f9',
  },
  categoryButtonSelected: {
    backgroundColor: '#22c55e',
  },
  categoryButtonText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: '#64748b',
  },
  categoryButtonTextSelected: {
    color: '#ffffff',
  },
  productsContainer: {
    flex: 1,
    padding: 8,
  },
  productsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  productCard: {
    width: '50%',
    padding: 8,
  },
  productImage: {
    width: '100%',
    height: 150,
    borderRadius: 12,
  },
  productInfo: {
    padding: 8,
  },
  productName: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 14,
    color: '#0f172a',
  },
  productUnit: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: '#64748b',
    marginTop: 2,
  },
  productBottom: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  productPrice: {
    fontFamily: 'Inter-Bold',
    fontSize: 16,
    color: '#22c55e',
  },
  addButton: {
    backgroundColor: '#22c55e',
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
});