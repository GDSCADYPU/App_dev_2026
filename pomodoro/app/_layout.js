// app/_layout.js
// ROOT LAYOUT — entry point for Expo Router (Day 2).
// Defines the Stack navigator and global header styles.
// Every app/ directory that contains screens needs a _layout file.

import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { COLORS } from '../constants/theme';

export default function RootLayout() {
  return (
    <>
      {/* Keep status bar icons white on our dark background */}
      <StatusBar style="light" />

      {/*
        Stack navigator (Day 2).
        Screens stack on top of each other.
        screenOptions applies to ALL screens — avoids repeating styles.
      */}
      <Stack
        screenOptions={{
          headerStyle: { backgroundColor: COLORS.bg },
          headerTintColor: COLORS.textPrimary,
          headerTitleStyle: { fontWeight: '700', fontSize: 17 },
          contentStyle: { backgroundColor: COLORS.bg },
        }}
      >
        {/* Screen 1 — Timer (the home screen, route: "/") */}
        <Stack.Screen
          name="index"
          options={{ title: 'Pomodoro Timer' }}
        />

        {/* Screen 2 — History (route: "/history") */}
        <Stack.Screen
          name="history"
          options={{ title: 'Session History' }}
        />
      </Stack>
    </>
  );
}