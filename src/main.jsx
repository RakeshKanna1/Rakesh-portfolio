import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

// Global error reporter to reveal runtime crashes on-screen (dev mode only)
if (import.meta.env.DEV && typeof window !== 'undefined') {
  const reportError = (message, source, lineno, colno, error) => {
    const container = document.getElementById('error-reporter') || document.createElement('div');
    container.id = 'error-reporter';
    container.style.position = 'fixed';
    container.style.top = '0';
    container.style.left = '0';
    container.style.width = '100%';
    container.style.backgroundColor = '#ef4444';
    container.style.color = '#ffffff';
    container.style.zIndex = '9999999';
    container.style.padding = '24px';
    container.style.fontFamily = 'monospace';
    container.style.fontSize = '14px';
    container.style.lineHeight = '1.5';
    container.style.whiteSpace = 'pre-wrap';
    container.style.boxShadow = '0 10px 15px -3px rgba(0,0,0,0.3)';
    
    container.innerHTML = `
      <div style="font-weight: bold; font-size: 16px; margin-bottom: 8px;">🔴 Runtime Error Detected:</div>
      <div><strong>Message:</strong> ${message}</div>
      <div><strong>Source:</strong> ${source || 'Unknown'} (Line ${lineno || '?'}, Col ${colno || '?'})</div>
      ${error && error.stack ? `<div style="margin-top: 12px; background: rgba(0,0,0,0.2); padding: 12px; border-radius: 4px; overflow-x: auto;"><strong>Stack:</strong><br/>${error.stack}</div>` : ''}
    `;
    
    if (!document.getElementById('error-reporter')) {
      document.body.appendChild(container);
    }
  };

  window.onerror = reportError;
  window.onunhandledrejection = (event) => {
    reportError(
      event.reason ? event.reason.message || String(event.reason) : 'Unhandled promise rejection',
      event.reason ? event.reason.fileName : '',
      event.reason ? event.reason.lineNumber : 0,
      event.reason ? event.reason.columnNumber : 0,
      event.reason
    );
  };
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
