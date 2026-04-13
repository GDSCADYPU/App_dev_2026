// constants/theme.js
// Central place for all colours, spacing and timer durations.
// Students: If you want to retheme the app, just change values here
// and every screen picks them up automatically.

export const COLORS = {
  // Backgrounds
  bg: '#0F1923',          // dark navy — main background
  surface: '#1A2535',     // card / panel background
  surfaceAlt: '#212E40',  // alternate surface for list rows

  // Accent — changes based on mode
  focus: '#E05C43',       // tomato red  — Focus mode
  focusDim: '#4A1F18',    // muted red   — Focus ring track
  breakColor: '#34A853',  // GDG green   — Break mode
  breakDim: '#0D3320',    // muted green — Break ring track

  // Text
  textPrimary: '#F0F4F8',
  textSecondary: '#8A9BB0',
  textMuted: '#4A5C70',

  // UI
  border: '#2A3A50',
  white: '#FFFFFF',
};

export const SPACING = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};

export const RADIUS = {
  sm: 8,
  md: 12,
  lg: 20,
  full: 999,
};

// ── Timer durations in seconds ────────────────────────────────────
// Change these numbers to make sessions longer or shorter
export const DURATIONS = {
  focus: 25 * 60,   // 25 minutes
  short: 5 * 60,    //  5 minutes
  long: 15 * 60,    // 15 minutes — given after 4 focus sessions
};

// How many focus sessions before a long break
export const SESSIONS_BEFORE_LONG_BREAK = 4;
