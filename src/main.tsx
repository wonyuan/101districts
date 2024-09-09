import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import CreateTrip from './page/create-trip/index.tsx'
import Header from './components/ui/custom/header.tsx'
import { Toaster } from './components/ui/sonner.tsx'

const router = createBrowserRouter([
  {
    path:'/',
    element: <App />
  },
  {
    path:'/create-trip',
    element: <CreateTrip  />
  }
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Header />
    <Toaster />
    <RouterProvider router={router}/>
  </StrictMode>,
)

