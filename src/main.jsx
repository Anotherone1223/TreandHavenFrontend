import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { RouterProvider } from 'react-router-dom'
import router from './routers/Router.jsx'
import 'remixicon/fonts/remixicon.css'

import { Provider } from 'react-redux'
import { store } from './redux/store.js'
import { GoogleOAuthProvider } from '@react-oauth/google'

const CLIENT_ID = "713406832493-nq74tlbu3rf3qmm4eoc87jkobiv8lsrl.apps.googleusercontent.com"

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <GoogleOAuthProvider clientId={CLIENT_ID}>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider >
    </GoogleOAuthProvider>
  </StrictMode>
)
