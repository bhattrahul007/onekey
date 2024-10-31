import { extendTheme } from '@mui/joy';

declare module '@mui/joy/styles' {
  interface TypographySystemOverrides {
    h4: false;
    'title-lg': false;
    'title-md': false;
    'title-sm': false;
    'body-lg': false;
    'body-md': false;
    'body-sm': false;
    'body-xs': false;
    heading: true;
    subheading: true;
    description: true;
    body: true;
  }
}

export const theme = extendTheme({
  components: {
    JoyTypography: {
      defaultProps: {
        level: 'body',
        levelMapping: {
          subheading: 'h4',
          description: 'p',
          body: 'p',
        },
      },
    },
  },

  fontFamily: {
    display: "'Inter', 'sans-serif'",
    body: "'Inter', 'sans-serif'",
  },

  typography: {
    h1: {
      fontSize: '2.25rem' /* 36px */,
      fontWeight: 700 /* Bold */,
      lineHeight: 1.2 /* 120% */,
    },
    h2: {
      fontSize: '1.875rem' /* 30px */,
      fontWeight: 700 /* Bold */,
      lineHeight: 1.3 /* 130% */,
    },

    h3: {
      fontSize: '1.5rem' /* 24px */,
      fontWeight: 600 /* Semi-Bold */,
      lineHeight: 1.4 /* 140% */,
    },

    subheading: {
      fontSize: '1.25rem',
      fontWeight: 600,
      lineHeight: 1.5,
    },

    description: {
      fontSize: '.875rem',
      fontWeight: 400,
      lineHeight: 1.5,
    },

    body: {
      fontSize: '1rem',
      fontWeight: 400,
      lineHeight: 1.6,
    },
  },
});

export default theme;
