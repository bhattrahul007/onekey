import { MinLengthValidator } from '@onekey/ui-design/core/validators';
import { BaseFloatingInput } from '@onekey/ui-design/components';
import { ThemeProvider } from '@onekey/ui-design/styles';
import { Mail } from 'lucide-react';
import ReactDOM from 'react-dom/client';
import '@onekey/ui-design/index.css';
import * as React from 'react';

const domElement = document.querySelector('#root');
if (domElement) {
  ReactDOM.createRoot(domElement).render(
    <React.StrictMode>
      <ThemeProvider>
        <BaseFloatingInput
          onChange={(values) => {
            console.log(values);
          }}
          label="Email"
          placeholder="yourmail@example.com"
          size="sm"
          startIcon={<Mail size={'18px'} />}
          validationTrigger={['typing']}
          validators={[new MinLengthValidator(8)]}
        />
      </ThemeProvider>
    </React.StrictMode>,
  );
}
