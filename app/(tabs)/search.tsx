import { View, Text, TextInput, ScrollView, StyleSheet, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Search as SearchIcon, X } from 'lucide-react-native';
import { useState } from 'react';

const POPULAR_SEARCHES = [
  'Organic fruits',
  'Fresh vegetables',
  'Dairy products',
  'Whole grain bread',
  'Healthy snacks',
];

export default function SearchScreen() {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.searchContainer}>
          <SearchIcon size={20} color="#64748b" />
          <TextInput
            style={styles.searchInput}
            placeholder="Search for groceries..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholderTextColor="#94a3b8"
          />
          {searchQuery.length > 0 && (
            <Pressable onPress={() => setSearchQuery('')}>
              <X size={20} color="#64748b" />
            </Pressable>
          )}
        </View>
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.popularSearches}>
          <Text style={styles.sectionTitle}>Popular Searches</Text>
          <View style={styles.searchTags}>
            {POPULAR_SEARCHES.map((search, index) => (
              <Pressable
                key={index}
                style={styles.searchTag}
                onPress={() => setSearchQuery(search)}>
                <Text style={styles.searchTagText}>{search}</Text>
              </Pressable>
            ))}
          </View>
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
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f1f5f9',
    padding: 12,
    borderRadius: 12,
  },
  searchInput: {
    flex: 1,
    marginLeft: 8,
    marginRight: 8,
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: '#0f172a',
  },
  content: {
    flex: 1,
  },
  popularSearches: {
    padding: 16,
  },
  sectionTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 18,
    color: '#0f172a',
    marginBottom: 16,
  },
  searchTags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -4,
  },
  searchTag: {
    backgroundColor: '#ffffff',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    margin: 4,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  searchTagText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: '#334155',
  },
});