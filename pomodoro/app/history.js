// app/history.js
// HISTORY SCREEN — shows all completed focus sessions.
//
// Day 1 concepts used:  View, Text, StyleSheet, Pressable
// Day 2 concepts used:  useState, useEffect, FlatList, Expo Router
// Day 3 concepts used:  AsyncStorage (via loadSessions / clearSessions),
//                       reusable SessionBadge component, JSON data

import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Pressable,
  Alert,
} from 'react-native';

import SessionBadge from '../components/SessionBadge';
import { loadSessions, clearSessions } from '../constants/storage';
import { COLORS, SPACING, RADIUS } from '../constants/theme';

export default function HistoryScreen() {
  // ── State (Day 2 — useState) ──────────────────────────────────
  const [sessions, setSessions] = useState([]);   // array of session records
  const [loading, setLoading] = useState(true);   // show loading state while fetching

  // ── Load sessions from AsyncStorage on mount (Day 2 — useEffect) ─
  // Empty dependency array [] = run ONCE when screen first appears
  useEffect(() => {
    async function fetchSessions() {
      const data = await loadSessions();
      setSessions(data);
      setLoading(false);
    }
    fetchSessions();
  }, []); // [] = run once on mount — Day 2 useEffect concept

  // ── Clear all sessions ────────────────────────────────────────
  function handleClear() {
    Alert.alert(
      'Clear History',
      'Are you sure you want to delete all session records?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Clear All',
          style: 'destructive',
          onPress: async () => {
            await clearSessions();
            setSessions([]); // update state so UI re-renders immediately
          },
        },
      ]
    );
  }

  // ── Total minutes helper ──────────────────────────────────────
  const totalMinutes = sessions.reduce((sum, s) => sum + Math.floor(s.duration / 60), 0);

  // ── Render ────────────────────────────────────────────────────
  return (
    <View style={styles.container}>

      {/* ── Stats bar ── */}
      <View style={styles.statsRow}>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>{sessions.length}</Text>
          <Text style={styles.statLabel}>Sessions</Text>
        </View>
        <View style={[styles.statCard, styles.statCardMiddle]}>
          <Text style={styles.statNumber}>{totalMinutes}</Text>
          <Text style={styles.statLabel}>Minutes focused</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>
            {Math.floor(totalMinutes / 60)}h {totalMinutes % 60}m
          </Text>
          <Text style={styles.statLabel}>Total time</Text>
        </View>
      </View>

      {/* ── FlatList of sessions (Day 2 — FlatList concept) ── */}
      <FlatList
        data={sessions}                           // array of items to render
        keyExtractor={(item) => item.id}          // unique key per item
        renderItem={({ item, index }) => (        // what to render per item
          <SessionBadge session={item} index={index} />
        )}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}

        // ListHeaderComponent — rendered above all items (Day 2 FlatList prop)
        ListHeaderComponent={
          sessions.length > 0 ? (
            <Text style={styles.listHeading}>
              {sessions.length} completed session{sessions.length !== 1 ? 's' : ''}
            </Text>
          ) : null
        }

        // ListEmptyComponent — shown when data is empty (Day 2 FlatList prop)
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyTitle}>
              {loading ? 'Loading...' : 'No sessions yet'}
            </Text>
            <Text style={styles.emptySubtitle}>
              {loading
                ? 'Fetching your history'
                : 'Complete a focus session on the timer screen to see it here.'}
            </Text>
          </View>
        }
      />

      {/* ── Clear button — only show if there are sessions ── */}
      {sessions.length > 0 && (
        <Pressable onPress={handleClear} style={styles.clearBtn}>
          <Text style={styles.clearBtnText}>Clear All History</Text>
        </Pressable>
      )}
    </View>
  );
}

// ── Styles (Day 1 — StyleSheet.create) ───────────────────────────
const styles = StyleSheet.create({
  container: {
    flex: 1,                        // take full screen height — Day 1 Flexbox
    backgroundColor: COLORS.bg,
    paddingHorizontal: SPACING.lg,
    paddingTop: SPACING.md,
  },

  // Stats bar
  statsRow: {
    flexDirection: 'row',           // Day 1 Flexbox — row
    gap: SPACING.sm,
    marginBottom: SPACING.lg,
  },
  statCard: {
    flex: 1,                        // equal width — Day 1 Flexbox
    backgroundColor: COLORS.surface,
    borderRadius: RADIUS.md,
    padding: SPACING.md,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  statCardMiddle: {
    borderColor: COLORS.focus,
    borderWidth: 1.5,
  },
  statNumber: {
    color: COLORS.focus,
    fontSize: 22,
    fontWeight: '800',
    marginBottom: 2,
  },
  statLabel: {
    color: COLORS.textSecondary,
    fontSize: 11,
    textAlign: 'center',
  },

  // List
  listContent: {
    paddingBottom: SPACING.xxl,
  },
  listHeading: {
    color: COLORS.textMuted,
    fontSize: 12,
    letterSpacing: 1,
    textTransform: 'uppercase',
    marginBottom: SPACING.md,
  },

  // Empty state
  emptyContainer: {
    alignItems: 'center',
    paddingTop: SPACING.xxl * 2,
  },
  emptyTitle: {
    color: COLORS.textPrimary,
    fontSize: 18,
    fontWeight: '700',
    marginBottom: SPACING.sm,
  },
  emptySubtitle: {
    color: COLORS.textSecondary,
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 22,
    paddingHorizontal: SPACING.xl,
  },

  // Clear button
  clearBtn: {
    margin: SPACING.lg,
    padding: SPACING.md,
    borderRadius: RADIUS.md,
    borderWidth: 1,
    borderColor: '#6B2020',
    alignItems: 'center',
  },
  clearBtnText: {
    color: '#E05C43',
    fontSize: 14,
    fontWeight: '600',
  },
});
