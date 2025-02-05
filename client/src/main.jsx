import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Toaster } from './components/ui/sonner.jsx'
import { SocketProvider } from './context/SocketContext.jsx'

createRoot(document.getElementById('root')).render(
  <SocketProvider>
    <App />
    <Toaster closeButton toastOptions={{
      classNames: {
        error: 'bg-red-400 text-white',
        success: 'text-green-400',
        warning: 'text-yellow-400',
        info: 'bg-blue-400',
        // toast: 'bg-blue-400',
        // title: 'text-red-400 text-2xl',
        description: 'text-red-400',
        actionButton: 'bg-zinc-400',
        cancelButton: 'bg-orange-400',
        closeButton: 'bg-black text-white hover:bg-gray-400',
      },
    }}
    />
  </SocketProvider>
  

)
