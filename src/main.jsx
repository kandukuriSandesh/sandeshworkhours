import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';

import * as Sentry from '@sentry/react';

Sentry.init({
  dsn: 'https://990fa630e8d19866dc59e5a63f536948@o4509441882783744.ingest.de.sentry.io/4509441884487760',
  // Setting this option to true will send default PII data to Sentry.
  // For example, automatic IP address collection on events
  sendDefaultPii: true,
  integrations: [Sentry.browserTracingIntegration()],
  // Tracing
  tracesSampleRate: 1.0, //  Capture 100% of the transactions
  // Set 'tracePropagationTargets' to control for which URLs distributed tracing should be enabled
  tracePropagationTargets: ['localhost', /^https:\/\/yourserver\.io\/api/],
});

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
);
