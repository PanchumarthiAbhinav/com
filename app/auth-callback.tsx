import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { useEffect } from 'react';
import { router } from 'expo-router';
import { useAuthStore } from '@/store/auth';

export default function AuthCallback() {
  const checkAuth = useAuthStore(state => state.checkAuth);

  useEffect(() => {
    const handleCallback = async () => {
      await checkAuth();
      router.replace('/(tabs)');
    };

    handleCallback();
  }, []);

  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#22c55e" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
});