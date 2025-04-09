import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { auth, googleProvider } from '@/lib/firebase';
import { signInWithPopup, signOut as firebaseSignOut } from 'firebase/auth';

interface User {
  id: string;
  name: string;
  email: string;
  photoUrl: string;
}

interface AuthState {
  user: User | null;
  isLoading: boolean;
  error: string | null;
  signInWithGoogle: () => Promise<void>;
  signOut: () => Promise<void>;
  checkAuth: () => Promise<void>;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isLoading: true,
      error: null,

      signInWithGoogle: async () => {
        try {
          set({ isLoading: true, error: null });
          
          const result = await signInWithPopup(auth, googleProvider);
          const user = result.user;
          
          set({
            user: {
              id: user.uid,
              name: user.displayName || '',
              email: user.email || '',
              photoUrl: user.photoURL || '',
            },
            isLoading: false,
          });
        } catch (error) {
          console.error('Google Sign In Error:', error);
          set({ error: 'Failed to sign in with Google', isLoading: false });
        }
      },

      signOut: async () => {
        try {
          await firebaseSignOut(auth);
          set({ user: null, error: null });
        } catch (error) {
          console.error('Sign Out Error:', error);
          set({ error: 'Failed to sign out' });
        }
      },

      checkAuth: async () => {
        try {
          set({ isLoading: true, error: null });
          
          auth.onAuthStateChanged((user) => {
            if (user) {
              set({
                user: {
                  id: user.uid,
                  name: user.displayName || '',
                  email: user.email || '',
                  photoUrl: user.photoURL || '',
                },
                isLoading: false,
              });
            } else {
              set({ user: null, isLoading: false });
            }
          });
        } catch (error) {
          console.error('Check Auth Error:', error);
          set({ user: null, isLoading: false });
        }
      },
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);