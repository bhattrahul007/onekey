import { BaseFloatingInput } from '@onekey/ui-design/components';
import { ThemeProvider } from '@onekey/ui-design/styles';
import { Mail } from '@mui/icons-material';
import ReactDOM from 'react-dom/client';
import '@onekey/ui-design/index.css';
import * as React from 'react';

const domElement = document.querySelector('#root');
if (domElement) {
  ReactDOM.createRoot(domElement).render(
    <React.StrictMode>
      <ThemeProvider>
        <BaseFloatingInput
          label="Email"
          placeholder="yourmail@example.com"
          size="sm"
          startIcon={<Mail sx={{ width: 20, height: 20 }} />}
        />
      </ThemeProvider>
    </React.StrictMode>,
  );
}
