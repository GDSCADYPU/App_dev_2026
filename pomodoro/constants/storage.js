// constants/storage.js
// Helper functions that wrap AsyncStorage (Day 3 concept).
// AsyncStorage is a simple key-value store that saves data on the device
// even after the app is closed — like localStorage on the web.
//
// We keep all storage logic in one file so screens stay clean.

import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = 'pomodoro_sessions';

// ── Save a completed session ──────────────────────────────────────
// session = { id, date, duration, mode }
export async function saveSession(session) {
  try {
    // 1. Load whatever sessions already exist
    const existing = await loadSessions();
    // 2. Add the new session at the front (newest first)
    const updated = [session, ...existing];
    // 3. Stringify and save — AsyncStorage only stores strings
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch (error) {
    console.error('saveSession failed:', error);
  }
}

// ── Load all saved sessions ───────────────────────────────────────
export async function loadSessions() {
  try {
    const raw = await AsyncStorage.getItem(STORAGE_KEY);
    // If nothing saved yet, return empty array
    return raw ? JSON.parse(raw) : [];
  } catch (error) {
    console.error('loadSessions failed:', error);
    return [];
  }
}

// ── Delete all sessions ───────────────────────────────────────────
export async function clearSessions() {
  try {
    await AsyncStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.error('clearSessions failed:', error);
  }
}
