// components/ControlButton.js
// Reusable button for the timer controls.
// Students: We use Pressable instead of Button because it lets us
// fully control the styling — a tip from Day 1.

import React from 'react';
import { Pressable, Text, StyleSheet } from 'react-native';
import { COLORS, RADIUS, SPACING } from '../constants/theme';

// Props:
//   label    — button text
//   onPress  — function called when tapped
//   variant  — 'primary' (filled) or 'ghost' (outlined)
//   color    — override the primary fill colour (used to switch red/green with mode)

export default function ControlButton({ label, onPress, variant = 'ghost', color }) {
  const isPrimary = variant === 'primary';

  // Use the passed colour or fall back to the default focus red
  const bgColor = color || COLORS.focus;

  return (
    // Pressable — Day 1. The function style prop gives us a "pressed" state.
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.base,
        isPrimary ? [styles.primary, { backgroundColor: bgColor }] : styles.ghost,
        pressed && styles.pressed,
      ]}
    >
      <Text style={[styles.label, isPrimary ? styles.labelPrimary : styles.labelGhost]}>
        {label}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    paddingVertical: SPACING.sm + 4,
    paddingHorizontal: SPACING.xl,
    borderRadius: RADIUS.full,
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 120,
  },
  primary: {
    // backgroundColor set inline from props
  },
  ghost: {
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  pressed: {
    opacity: 0.7,
  },
  label: {
    fontSize: 15,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  labelPrimary: {
    color: COLORS.white,
  },
  labelGhost: {
    color: COLORS.textSecondary,
  },
});
