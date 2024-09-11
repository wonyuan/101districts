import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Header from './components/ui/custom/header.tsx'
import { Toaster } from './components/ui/sonner.tsx'
import { GoogleOAuthProvider } from '@react-oauth/google';
import ViewTrip from './page/view-trip/[tripId]/index.tsx'
import CreateTrip from './page/create-trip/index.tsx'

const router = createBrowserRouter([
  {
    path:'/',
    element: <App />
  },
  {
    path:'/create-trip',
    element: <CreateTrip  />
  },
  {
    path:'/view-trip/:tripId',
    element: <ViewTrip />
  }
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_AUTH_CLIENT_ID}>
      <Header />
      <Toaster />
      <RouterProvider router={router}/>
    </GoogleOAuthProvider>;
  </StrictMode>,
)

