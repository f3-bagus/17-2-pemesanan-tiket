import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { UserProvider } from './UserContext';

const rootElement = document.getElementById('root');
const root = createRoot(rootElement);

root.render(
  <React.StrictMode>
    <UserProvider>
      <App />
    </UserProvider>
  </React.StrictMode>
);