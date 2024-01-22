import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { GoogleOAuthProvider } from '@react-oauth/google';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    
<GoogleOAuthProvider clientId="914495623585-5lr625ccb9pcu36j851fbvq3gadmpfm8.apps.googleusercontent.com">
<App />
</GoogleOAuthProvider>
   
  </React.StrictMode>,
)
