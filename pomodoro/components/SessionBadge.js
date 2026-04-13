// components/SessionBadge.js
// Renders ONE session record inside the FlatList on the History screen.
// Students: This is the renderItem component (Day 2 — FlatList).
// It's a pure display component — receives data via props, shows it.
// No state inside — the parent screen handles state.

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS, SPACING, RADIUS } from '../constants/theme';

// Props:
//   session — { id, date, duration, mode }
//   index   — position in the list (to show session number)

export default function SessionBadge({ session, index }) {
  const minutes = Math.floor(session.duration / 60);

  return (
    // flexDirection: 'row' — Day 1 Flexbox, lays children left-to-right
    <View style={styles.card}>

      {/* Left: session number */}
      <View style={styles.numberCircle}>
        <Text style={styles.numberText}>#{index + 1}</Text>
      </View>

      {/* Centre: takes remaining space with flex: 1 (Day 1 Flexbox) */}
      <View style={styles.info}>
        <Text style={styles.dateText}>{session.date}</Text>
        <Text style={styles.durationText}>Focus · {minutes} min</Text>
      </View>

      <View style={styles.statusDot} />
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',     // lay children in a row — Day 1 Flexbox
    alignItems: 'center',
    backgroundColor: COLORS.surface,
    borderRadius: RADIUS.md,
    padding: SPACING.md,
    marginBottom: SPACING.sm,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  numberCircle: {
    width: 42,
    height: 42,
    borderRadius: RADIUS.full,
    backgroundColor: COLORS.focusDim,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: SPACING.md,
  },
  numberText: {
    color: COLORS.focus,
    fontSize: 11,
    fontWeight: '700',
  },
  info: {
    flex: 1, // stretch to fill remaining row space — Day 1 Flexbox
  },
  dateText: {
    color: COLORS.textPrimary,
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 2,
  },
  durationText: {
    color: COLORS.textSecondary,
    fontSize: 12,
  },
  statusDot: {
    width: 12,
    height: 12,
    borderRadius: RADIUS.full,
    backgroundColor: COLORS.focus,
    marginLeft: SPACING.sm,
  },
});
