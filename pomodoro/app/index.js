// app/index.js
// TIMER SCREEN — the main screen of the app.
//
// Day 1 concepts used:  View, Text, Pressable, StyleSheet, ScrollView
// Day 2 concepts used:  useState, useEffect, useLayoutEffect, props,
//                       reusable components, Expo Router (useRouter)
// Day 3 concepts used:  AsyncStorage (via saveSession helper),
//                       structured JSON data, reusable components

import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  Alert,
} from 'react-native';
import { useRouter, useNavigation } from 'expo-router';

import CircularProgress from '../components/CircularProgress';
import ControlButton from '../components/ControlButton';
import { COLORS, SPACING, RADIUS, DURATIONS, SESSIONS_BEFORE_LONG_BREAK } from '../constants/theme';
import { saveSession } from '../constants/storage';

const DURATION_PRESETS = {
  focus: [15, 25, 30, 45, 60],
  short: [3, 5, 10, 15],
  long: [10, 15, 20, 30],
};

// ── Helpers ───────────────────────────────────────────────────────

// Format seconds into "MM:SS" string — e.g. 1500 → "25:00"
function formatTime(seconds) {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  // padStart ensures "05" instead of "5"
  return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
}

// Human-readable date for session records — e.g. "Sun, Apr 6 · 2:30 PM"
function getReadableDate() {
  return new Date().toLocaleString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  });
}

// ── Component ─────────────────────────────────────────────────────
export default function TimerScreen() {
  const router = useRouter();       // Expo Router — Day 2
  const navigation = useNavigation();

  // ── State (Day 2 — useState) ────────────────────────────────────
  const [mode, setMode] = useState('focus');         // 'focus' | 'short' | 'long'
  const [durations, setDurations] = useState(DURATIONS);
  const [timeLeft, setTimeLeft] = useState(DURATIONS.focus); // seconds remaining
  const [isRunning, setIsRunning] = useState(false); // is the countdown ticking?
  const [sessionCount, setSessionCount] = useState(0); // completed focus sessions

  // ── Mode configuration ──────────────────────────────────────────
  // Each mode has a label, duration, and accent colours.
  const modes = {
    focus: {
      label: 'FOCUS',
      duration: durations.focus,
      color: COLORS.focus,
      trackColor: COLORS.focusDim,
    },
    short: {
      label: 'SHORT BREAK',
      duration: durations.short,
      color: COLORS.breakColor,
      trackColor: COLORS.breakDim,
    },
    long: {
      label: 'LONG BREAK',
      duration: durations.long,
      color: COLORS.breakColor,
      trackColor: COLORS.breakDim,
    },
  };

  // Derived values (computed from state — no extra state needed)
  const currentMode = modes[mode];
  const progress = timeLeft / currentMode.duration; // 1.0 → 0.0 as time counts down

  // ── Add "History" button to the header ──────────────────────────
  // useLayoutEffect runs synchronously before the screen paints,
  // which is the right time to configure the header.
  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Pressable onPress={() => router.push('/history')} style={styles.headerBtn}>
          <Text style={styles.headerBtnText}>History</Text>
        </Pressable>
      ),
    });
  }, [navigation, router]);

  // ── Countdown logic (Day 2 — useEffect) ─────────────────────────
  // This effect runs every time isRunning or timeLeft changes.
  // It sets up a 1-second interval to decrement timeLeft.
  // The cleanup function (return) clears the interval to prevent memory leaks.
  useEffect(() => {
    // Only tick if the timer is running
    if (!isRunning) return;

    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        // Session complete!
        if (prev <= 1) {
          clearInterval(interval);
          handleSessionComplete();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    // Cleanup — clears the interval when component unmounts or isRunning changes
    return () => clearInterval(interval);
  }, [isRunning]); // dependency: re-run when isRunning changes

  // ── Session complete handler ─────────────────────────────────────
  // useCallback prevents re-creating this function on every render
  const handleSessionComplete = useCallback(async () => {
    setIsRunning(false);

    if (mode === 'focus') {
      const newCount = sessionCount + 1;
      setSessionCount(newCount);

      // Save to AsyncStorage (Day 3)
      await saveSession({
        id: Date.now().toString(),
        date: getReadableDate(),
        duration: durations.focus,
        mode: 'focus',
      });

      // After 4 sessions → long break, otherwise → short break
      const nextMode = newCount % SESSIONS_BEFORE_LONG_BREAK === 0 ? 'long' : 'short';
      Alert.alert(
        'Session Complete',
        `Great work! ${newCount % SESSIONS_BEFORE_LONG_BREAK === 0
          ? `Time for a long break (${Math.floor(durations.long / 60)} min)!`
          : `Time for a short break (${Math.floor(durations.short / 60)} min)!`}`,
        [{ text: 'Start Break', onPress: () => switchMode(nextMode) }]
      );
    } else {
      // Break finished — go back to focus
      Alert.alert(
        'Break Over',
        'Ready to focus again?',
        [{ text: 'Start Focus', onPress: () => switchMode('focus') }]
      );
    }
  }, [durations.focus, durations.long, durations.short, mode, sessionCount]);

  // ── Switch between modes ─────────────────────────────────────────
  function switchMode(newMode) {
    setIsRunning(false);
    setMode(newMode);
    setTimeLeft(modes[newMode].duration);
  }

  // ── Reset current timer ──────────────────────────────────────────
  function handleReset() {
    setIsRunning(false);
    setTimeLeft(currentMode.duration);
  }

  function handleDurationChange(newMinutes) {
    const nextDuration = newMinutes * 60;
    setDurations((prev) => ({
      ...prev,
      [mode]: nextDuration,
    }));
    setIsRunning(false);
    setTimeLeft(nextDuration);
  }

  // ── Render ───────────────────────────────────────────────────────
  return (
    // ScrollView (Day 1) — makes content scrollable on small screens
    <ScrollView
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}
    >

      {/* ── Session counter ── */}
      <View style={styles.sessionRow}>
        {/* Show a filled dot for each completed session, outline for remaining */}
        {Array.from({ length: SESSIONS_BEFORE_LONG_BREAK }).map((_, i) => (
          <Text key={i} style={styles.sessionDot}>
            {i < sessionCount % SESSIONS_BEFORE_LONG_BREAK || (sessionCount > 0 && sessionCount % SESSIONS_BEFORE_LONG_BREAK === 0) && i < SESSIONS_BEFORE_LONG_BREAK
              ? '●' : '○'}
          </Text>
        ))}
        <Text style={styles.sessionCount}>
          {sessionCount} session{sessionCount !== 1 ? 's' : ''} today
        </Text>
      </View>

      {/* ── Circular progress ring — reusable component (Day 1 + Day 3) ── */}
      <View style={styles.ringContainer}>
        <CircularProgress
          progress={progress}
          size={280}
          strokeWidth={16}
          color={currentMode.color}
          trackColor={currentMode.trackColor}
          label={formatTime(timeLeft)}
          sublabel={currentMode.label}
          labelColor={currentMode.color}
        />
      </View>

      {/* ── Mode selector tabs ── */}
      <View style={styles.modeRow}>
        {Object.entries(modes).map(([key]) => (
          <Pressable
            key={key}
            onPress={() => switchMode(key)}
            style={[
              styles.modeTab,
              mode === key && { backgroundColor: currentMode.color },
            ]}
          >
            <Text style={[
              styles.modeTabText,
              mode === key && { color: COLORS.white },
            ]}>
              {/* Shorter labels for the tabs */}
              {key === 'focus' ? 'Focus' : key === 'short' ? 'Short' : 'Long'}
            </Text>
          </Pressable>
        ))}
      </View>

      <View style={styles.durationCard}>
        <Text style={styles.durationTitle}>
          {mode === 'focus' ? 'Focus length' : mode === 'short' ? 'Short break length' : 'Long break length'}
        </Text>
        <View style={styles.durationOptions}>
          {DURATION_PRESETS[mode].map((minutes) => {
            const isSelected = currentMode.duration === minutes * 60;

            return (
              <Pressable
                key={minutes}
                onPress={() => handleDurationChange(minutes)}
                style={[
                  styles.durationChip,
                  isSelected && { backgroundColor: currentMode.color, borderColor: currentMode.color },
                ]}
              >
                <Text
                  style={[
                    styles.durationChipText,
                    isSelected && styles.durationChipTextActive,
                  ]}
                >
                  {minutes} min
                </Text>
              </Pressable>
            );
          })}
        </View>
      </View>

      {/* ── Controls — reusable ControlButton components (Day 1 + Day 3) ── */}
      <View style={styles.controlRow}>
        <ControlButton label="Reset" onPress={handleReset} variant="ghost" />
        <ControlButton
          label={isRunning ? 'Pause' : 'Start'}
          onPress={() => setIsRunning((prev) => !prev)}
          variant="primary"
          color={currentMode.color}
        />
      </View>

      {/* ── Info card ── */}
      <View style={styles.infoCard}>
        <Text style={styles.infoTitle}>How Pomodoro Works</Text>
        <Text style={styles.infoText}>
          1. Work focused for {Math.floor(durations.focus / 60)} minutes.{'\n'}
          2. Take a {Math.floor(durations.short / 60)}-minute short break.{'\n'}
          3. After 4 sessions, take a {Math.floor(durations.long / 60)}-minute long break.{'\n'}
          4. Repeat — your sessions are saved automatically!
        </Text>
      </View>

    </ScrollView>
  );
}

// ── Styles (Day 1 — StyleSheet.create) ───────────────────────────
const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: 'center',
    paddingHorizontal: SPACING.lg,
    paddingTop: SPACING.xl,
    paddingBottom: SPACING.xxl,
    backgroundColor: COLORS.bg,
  },

  // Header button
  headerBtn: {
    marginRight: SPACING.sm,
    paddingHorizontal: SPACING.sm,
    paddingVertical: SPACING.xs,
  },
  headerBtnText: {
    color: COLORS.focus,
    fontSize: 15,
    fontWeight: '600',
  },

  // Session dots row
  sessionRow: {
    flexDirection: 'row',   // Day 1 Flexbox — row layout
    alignItems: 'center',
    marginBottom: SPACING.xl,
    gap: SPACING.sm,
  },
  sessionDot: {
    fontSize: 18,
  },
  sessionCount: {
    color: COLORS.textMuted,
    fontSize: 13,
    marginLeft: SPACING.sm,
  },

  // Ring
  ringContainer: {
    marginBottom: SPACING.xl,
    // Shadow on Android
    elevation: 8,
  },

  // Mode tabs
  modeRow: {
    flexDirection: 'row',
    backgroundColor: COLORS.surface,
    borderRadius: RADIUS.full,
    padding: SPACING.xs,
    marginBottom: SPACING.xl,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  modeTab: {
    paddingVertical: SPACING.sm,
    paddingHorizontal: SPACING.md,
    borderRadius: RADIUS.full,
  },
  modeTabText: {
    color: COLORS.textSecondary,
    fontSize: 13,
    fontWeight: '600',
  },

  // Buttons
  controlRow: {
    flexDirection: 'row',
    gap: SPACING.md,
    marginBottom: SPACING.xl,
  },

  // Duration picker
  durationCard: {
    width: '100%',
    backgroundColor: COLORS.surface,
    borderRadius: RADIUS.lg,
    padding: SPACING.lg,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginBottom: SPACING.xl,
  },
  durationTitle: {
    color: COLORS.textPrimary,
    fontSize: 16,
    fontWeight: '700',
    marginBottom: SPACING.md,
  },
  durationOptions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: SPACING.sm,
  },
  durationChip: {
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: RADIUS.full,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    backgroundColor: COLORS.bg,
  },
  durationChipText: {
    color: COLORS.textSecondary,
    fontSize: 13,
    fontWeight: '600',
  },
  durationChipTextActive: {
    color: COLORS.white,
  },

  // Info card
  infoCard: {
    width: '100%',
    backgroundColor: COLORS.surface,
    borderRadius: RADIUS.lg,
    padding: SPACING.lg,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  infoTitle: {
    color: COLORS.textPrimary,
    fontSize: 15,
    fontWeight: '700',
    marginBottom: SPACING.sm,
  },
  infoText: {
    color: COLORS.textSecondary,
    fontSize: 13,
    lineHeight: 22,
  },
});
