import * as React from 'react';

import { BaseFloatingInput } from '@onekey/ui-design/components';
import { createRoot } from 'react-dom/client';

const domElement: HTMLElement | null = document.querySelector('#root');

if (domElement !== null) {
  createRoot(domElement).render(
    <React.StrictMode>
      <BaseFloatingInput label="Email" placeholder="yourmail@example.com" size="sm" />
    </React.StrictMode>,
  );
}
