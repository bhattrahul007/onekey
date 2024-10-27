import * as React from 'react';

import { CssBaseline, CssVarsProvider } from '@mui/joy';

export interface ThemeProviderProps {
  children: Readonly<React.ReactNode>;
}

export class ThemeProvider extends React.PureComponent<Readonly<ThemeProviderProps>, unknown> {
  render(): React.ReactElement {
    const { children } = this.props;
    return (
      <CssVarsProvider>
        <CssBaseline />
        {children}
      </CssVarsProvider>
    );
  }
}

export default ThemeProvider;
