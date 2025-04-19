
import { createRoot } from 'react-dom/client';
import App from './App.tsx'
import './index.css'
import { StrictMode } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();  

async function enableMocking() {
  if (import.meta.env.DEV) {
    const { worker } = await import('./mocks/browser')
    return worker.start({
      onUnhandledRequest: 'bypass',
      serviceWorker: {
        url: '/mockServiceWorker.js',
      },
    })
  }
  return Promise.resolve();
}

enableMocking().then(() => {
  createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </StrictMode>,
  )
})
