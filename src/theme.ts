import { alpha, createTheme, type Theme } from '@mui/material/styles'

// Palette lifted from the Kubus design language.
const darkColors = {
  primary: '#6e8bfb',
  secondary: '#2dd4bf',
  bgDefault: '#1b1b1f',
  bgPaper: '#232328',
  divider: 'rgba(255, 255, 255, 0.08)',
  textPrimary: '#e6e6ea',
  textSecondary: '#9d9da7',
  scrollThumb: 'rgba(255, 255, 255, 0.16)',
  scrollThumbHover: 'rgba(255, 255, 255, 0.30)',
}

const lightColors = {
  primary: '#3b66f5',
  secondary: '#0d9488',
  bgDefault: '#fafafa',
  bgPaper: '#ffffff',
  divider: 'rgba(0, 0, 0, 0.08)',
  textPrimary: '#1c1c21',
  textSecondary: '#6e6e78',
  scrollThumb: 'rgba(0, 0, 0, 0.18)',
  scrollThumbHover: 'rgba(0, 0, 0, 0.34)',
}

export function buildTheme(mode: 'light' | 'dark'): Theme {
  const c = mode === 'dark' ? darkColors : lightColors

  return createTheme({
    palette: {
      mode,
      primary: { main: c.primary },
      secondary: { main: c.secondary },
      divider: c.divider,
      background: { default: c.bgDefault, paper: c.bgPaper },
      text: { primary: c.textPrimary, secondary: c.textSecondary },
    },
    shape: { borderRadius: 8 },
    typography: {
      fontFamily: '"Inter Variable", -apple-system, "Segoe UI", "Roboto", "Helvetica", "Arial", sans-serif',
      h1: { fontWeight: 700, letterSpacing: -1, fontSize: 'clamp(2.2rem, 5vw, 3.2rem)' },
      h2: { fontWeight: 650, letterSpacing: -0.5, fontSize: '1.6rem' },
      h6: { fontWeight: 600, letterSpacing: -0.2 },
      subtitle1: { fontWeight: 600 },
      button: { fontWeight: 550 },
    },
    components: {
      MuiCssBaseline: {
        styleOverrides: {
          '*': {
            scrollbarWidth: 'thin',
            scrollbarColor: `${c.scrollThumb} transparent`,
          },
          '*::-webkit-scrollbar': { width: 10, height: 10 },
          '*::-webkit-scrollbar-track': { background: 'transparent' },
          '*::-webkit-scrollbar-thumb': {
            backgroundColor: c.scrollThumb,
            borderRadius: 8,
            border: '2px solid transparent',
            backgroundClip: 'content-box',
            '&:hover': { backgroundColor: c.scrollThumbHover },
          },
          '*::-webkit-scrollbar-corner': { background: 'transparent' },
          '::selection': { backgroundColor: alpha(c.primary, 0.3) },
        },
      },
      MuiPaper: {
        defaultProps: { elevation: 0 },
        styleOverrides: { root: { backgroundImage: 'none' } },
      },
      MuiButton: {
        styleOverrides: { root: { textTransform: 'none', borderRadius: 7 } },
      },
      MuiChip: {
        defaultProps: { size: 'small' },
        styleOverrides: { root: { fontWeight: 500 } },
      },
      MuiTooltip: {
        defaultProps: { arrow: true },
        styleOverrides: {
          tooltip: { backgroundColor: '#2e2e34', fontSize: 12, padding: '6px 10px', borderRadius: 6 },
          arrow: { color: '#2e2e34' },
        },
      },
      MuiCard: {
        defaultProps: { variant: 'outlined' },
        styleOverrides: {
          root: {
            borderRadius: 10,
            borderColor: c.divider,
            height: '100%',
            transition: 'border-color 120ms ease, transform 120ms ease',
            '&:hover': {
              borderColor: alpha(c.primary, 0.5),
              transform: 'translateY(-2px)',
            },
          },
        },
      },
    },
  })
}
