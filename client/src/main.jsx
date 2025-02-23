import React from 'react';
import ReactDOM from 'react-dom/client';
import { GoogleOAuthProvider } from '@react-oauth/google';
import App from './App';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <GoogleOAuthProvider 
      clientId="984818055474-f79hip0alqp805imlqq9k7suajetvr85.apps.googleusercontent.com"
    >
      <App />
    </GoogleOAuthProvider>
  </React.StrictMode>
); 