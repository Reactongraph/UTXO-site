import React from 'react';
import App from '@/App.tsx';
import ReactDOM from 'react-dom/client';
import { StoreProvider } from '@/store/store';
import { BrowserRouter } from 'react-router-dom';
import { ThemeContextProvider } from '@/utils/theme/theme.tsx';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <StoreProvider>
      <BrowserRouter>
        <ThemeContextProvider>
          <App />
        </ThemeContextProvider>
      </BrowserRouter>
    </StoreProvider>
  </React.StrictMode>
);