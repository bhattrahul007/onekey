import { CssBaseline, CssVarsProvider } from '@mui/joy';
import * as React from 'react';
import theme from './theme';

export interface ThemeProviderProps {
  children: Readonly<React.ReactNode>;
}

export class ThemeProvider extends React.PureComponent<Readonly<ThemeProviderProps>, unknown> {
  render(): React.ReactElement {
    const { children } = this.props;
    return (
      <CssVarsProvider theme={theme}>
        <CssBaseline />
        {children}
      </CssVarsProvider>
    );
  }
}

export default ThemeProvider;
