// components/CircularProgress.js
// A reusable SVG circular progress ring — Day 1 concept: REUSABLE COMPONENTS.
// This component has NO internal state. It just receives props and renders.
// The parent (Timer screen) owns the state and passes values down as props.

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Svg, { Circle } from 'react-native-svg';

// Props this component expects (Day 2 concept: props):
//   progress   — number 0–1  (e.g. 0.6 = 60% done)
//   size       — diameter in px
//   strokeWidth — ring thickness in px
//   color      — active arc colour (changes with mode)
//   trackColor — background arc colour
//   label      — big centre text (the "MM:SS" countdown)
//   sublabel   — small text below (mode name)
//   labelColor — colour for the big label

export default function CircularProgress({
  progress,
  size,
  strokeWidth,
  color,
  trackColor,
  label,
  sublabel,
  labelColor,
}) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;

  // How much of the ring to draw: 0 = empty, circumference = full
  const strokeDashoffset = circumference * (1 - progress);

  return (
    // View wraps SVG and the text overlay — Day 1 component
    <View style={{ width: size, height: size, alignItems: 'center', justifyContent: 'center' }}>

      {/* SVG ring drawn behind the text */}
      <Svg width={size} height={size} style={StyleSheet.absoluteFillObject}>

        {/* Track ring (always full, muted colour) */}
        <Circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={trackColor}
          strokeWidth={strokeWidth}
          fill="transparent"
        />

        {/* Progress arc — starts from 12 o'clock via rotation */}
        <Circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={color}
          strokeWidth={strokeWidth}
          fill="transparent"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          transform={`rotate(-90, ${size / 2}, ${size / 2})`}
        />
      </Svg>

      {/* Centred text overlay — View + Text from Day 1 */}
      <View style={styles.textContainer}>
        <Text style={[styles.timerLabel, { color: labelColor }]}>{label}</Text>
        <Text style={styles.modeLabel}>{sublabel}</Text>
      </View>
    </View>
  );
}

// StyleSheet.create — Day 1 concept
const styles = StyleSheet.create({
  textContainer: {
    alignItems: 'center',
  },
  timerLabel: {
    fontSize: 56,
    fontWeight: 'bold',
    letterSpacing: 2,
    fontFamily: 'Courier New', // monospaced so digits don't shift in width
  },
  modeLabel: {
    fontSize: 13,
    color: '#8A9BB0',
    letterSpacing: 3,
    textTransform: 'uppercase',
    marginTop: 6,
  },
});
