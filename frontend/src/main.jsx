import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import "./style.scss"
import App from './App.jsx'
import { Authprovider } from './features/auth/auth.context.jsx'

createRoot(document.getElementById('root')).render(
 <Authprovider>


     <App />
 </Authprovider>
)
