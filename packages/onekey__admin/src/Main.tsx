import { BaseFloatingInput } from '@onekey/ui-design/components';
import { createRoot } from 'react-dom/client';
import React from 'react';

const domElement: HTMLElement | null = document.querySelector('#root');

createRoot(domElement!).render(
  <React.StrictMode>
    <BaseFloatingInput label="email" placeholder="bhattrahul270@gmail.com" size="sm" />
  </React.StrictMode>,
);
