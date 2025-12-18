import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import axios from 'axios'

import {QueryClient, QueryClientProvider} from '@tanstack/react-query'  
axios.defaults.baseURL = `${import.meta.env.VITE_API_BASE_URL}/api`;
axios.defaults.withCredentials = true;
const queryClient = new QueryClient();
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
          <App />
       
      </QueryClientProvider>
    </BrowserRouter>
  </StrictMode>,
)
