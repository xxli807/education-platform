import React from 'react';
import ReactDOM from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { RouterProvider } from '@tanstack/react-router';
import { router } from './router';
import './styles/tailwind.css';

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      {/* <StyledEngineProvider injectFirst> */}
      <RouterProvider router={router} />
      {/* </StyledEngineProvider> */}
    </QueryClientProvider>
  </React.StrictMode>
);
