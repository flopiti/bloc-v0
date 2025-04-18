import { setupWorker } from 'msw/browser';
import { handlers } from './handlers';

// Export the worker setup without starting it
export const worker = setupWorker(...handlers); 