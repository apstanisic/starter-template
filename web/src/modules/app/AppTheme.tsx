import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import React from 'react';

export function AppTheme({ children }: any) {
  const theme = createMuiTheme({
    palette: {
      //   type: darkTheme ? "dark" : "light",
      type: 'light',
      common: {
        black: '#000',
        white: '#fff',
      },
      background: {
        paper: '#fff',
        default: '#fafafa',
      },
      primary: {
        light: 'rgba(104, 167, 242, 1)',
        main: 'rgba(59, 137, 230, 1)',
        dark: 'rgba(29, 120, 227, 1)',
        contrastText: '#fff',
      },
      secondary: {
        light: 'rgba(109, 116, 216, 1)',
        main: 'rgba(62, 78, 189, 1)',
        dark: 'rgba(11, 9, 194, 1)',
        contrastText: '#fff',
      },
      error: {
        light: '#e57373',
        main: '#f44336',
        dark: '#d32f2f',
        contrastText: '#fff',
      },
      text: {
        primary: 'rgba(0, 0, 0, 0.87)',
        secondary: 'rgba(0, 0, 0, 0.54)',
        disabled: 'rgba(0, 0, 0, 0.38)',
        hint: 'rgba(0, 0, 0, 0.38)',
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      {/* <SnackbarProvider
        hideIconVariant
        anchorOrigin={{
          vertical: "top",
          horizontal: "right"
        }}
      > */}
      {children}
      {/* </SnackbarProvider> */}
    </ThemeProvider>
  );
}
