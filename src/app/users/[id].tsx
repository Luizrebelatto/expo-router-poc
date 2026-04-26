import { useLocalSearchParams, Link, Stack } from 'expo-router';
import React from 'react';
import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Spacing } from '@/constants/theme';

import { getUser } from './index';

export default function UserDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const user = getUser(id);

  return (
    <ThemedView style={styles.container}>
      <Stack.Screen options={{ title: user?.name ?? `User ${id}` }} />
      <SafeAreaView style={styles.safeArea} edges={['left', 'right']}>
        {user ? (
          <ThemedView type="backgroundElement" style={styles.card}>
            <ThemedText type="title">{user.name}</ThemedText>
            <ThemedText themeColor="textSecondary">{user.role}</ThemedText>
            <ThemedText type="small">
              id: <ThemedText type="code">{user.id}</ThemedText>
            </ThemedText>
          </ThemedView>
        ) : (
          <ThemedView style={styles.card}>
            <ThemedText type="subtitle">User not found</ThemedText>
            <ThemedText type="small">
              No user with id <ThemedText type="code">{id}</ThemedText>
            </ThemedText>
            <Link href="/users">
              <ThemedText type="linkPrimary">Back to list</ThemedText>
            </Link>
          </ThemedView>
        )}
      </SafeAreaView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  safeArea: { flex: 1, padding: Spacing.four },
  card: {
    padding: Spacing.four,
    borderRadius: Spacing.three,
    gap: Spacing.two,
  },
});
