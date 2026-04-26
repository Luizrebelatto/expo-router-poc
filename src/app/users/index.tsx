import { Link } from 'expo-router';
import React from 'react';
import { FlatList, Pressable, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { BottomTabInset, Spacing } from '@/constants/theme';

const USERS = [
  { id: '1', name: 'Ada Lovelace', role: 'Mathematician' },
  { id: '2', name: 'Alan Turing', role: 'Computer Scientist' },
  { id: '3', name: 'Grace Hopper', role: 'Rear Admiral' },
  { id: '4', name: 'Linus Torvalds', role: 'Engineer' },
  { id: '5', name: 'Margaret Hamilton', role: 'Software Engineer' },
];

export type User = (typeof USERS)[number];

export function getUser(id: string): User | undefined {
  return USERS.find((u) => u.id === id);
}

export default function UsersScreen() {
  return (
    <ThemedView style={styles.container}>
      <SafeAreaView style={styles.safeArea} edges={['left', 'right']}>
        <FlatList
          data={USERS}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContent}
          ItemSeparatorComponent={() => <ThemedView style={styles.separator} />}
          renderItem={({ item }) => (
            <Link href={`/users/${item.id}`} asChild>
              <Pressable style={({ pressed }) => pressed && styles.pressed}>
                <ThemedView type="backgroundElement" style={styles.row}>
                  <ThemedText type="defaultSemiBold">{item.name}</ThemedText>
                  <ThemedText type="small" themeColor="textSecondary">
                    {item.role}
                  </ThemedText>
                </ThemedView>
              </Pressable>
            </Link>
          )}
        />
      </SafeAreaView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  safeArea: { flex: 1 },
  listContent: {
    padding: Spacing.four,
    paddingBottom: BottomTabInset + Spacing.four,
    gap: Spacing.three,
  },
  separator: { height: Spacing.two },
  row: {
    padding: Spacing.four,
    borderRadius: Spacing.three,
    gap: Spacing.one,
  },
  pressed: { opacity: 0.7 },
});
