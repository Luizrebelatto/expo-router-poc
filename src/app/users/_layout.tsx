import { Stack } from 'expo-router';
import React from 'react';

export default function UsersLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: 'Users' }} />
      <Stack.Screen name="[id]" options={{ title: 'User' }} />
    </Stack>
  );
}
