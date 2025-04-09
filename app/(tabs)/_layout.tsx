import { Tabs } from 'expo-router';
import { Chrome as Home, Search, ShoppingCart, Grid2x2 as Grid } from 'lucide-react-native';
import { useCartStore } from '@/store/cart';

export default function TabLayout() {
  const getTotalItems = useCartStore((state) => state.getTotalItems());

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#ffffff',
          borderTopColor: '#e5e5e5',
        },
        tabBarActiveTintColor: '#22c55e',
        tabBarInactiveTintColor: '#64748b',
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ size, color }) => <Home size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="products"
        options={{
          title: 'Products',
          tabBarIcon: ({ size, color }) => <Grid size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          title: 'Search',
          tabBarIcon: ({ size, color }) => <Search size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="cart"
        options={{
          title: 'Cart',
          tabBarIcon: ({ size, color }) => <ShoppingCart size={size} color={color} />,
          tabBarBadge: getTotalItems > 0 ? getTotalItems : undefined,
        }}
      />
    </Tabs>
  );
}