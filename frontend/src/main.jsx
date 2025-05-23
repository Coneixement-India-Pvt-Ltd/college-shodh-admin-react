import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { ToastContainer} from 'react-toastify';
import './index.css'
import 'react-toastify/dist/ReactToastify.css';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
const queryClient = new QueryClient();
ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
  <>
   <QueryClientProvider client={queryClient}>
    
    <App />
    <ToastContainer/>
   </QueryClientProvider>
   </>
  // </React.StrictMode>,
)
