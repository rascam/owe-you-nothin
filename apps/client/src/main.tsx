import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import Welcome from './routes/Welcome.tsx'
import Home from './routes/Home.tsx'
import UserPayments from './routes/UserPayments.tsx'
import Payments from './routes/GroupPayments.tsx'
import Schema from './routes/Schema.tsx'
import Members from './routes/Members.tsx'

import ErrorPage from './routes/ErrorPage.tsx'

import './index.css'
import { ActiveUserContextProvider } from './lib/context/activeUserContext.tsx'
// import { ThemeProvider } from './lib/context/themeProvider.tsx'


const router = createBrowserRouter([
  {path: "/", element: < Welcome/>}, // creating a group with input of names and title, after that: redirecting to /groupId
  {path: "/:groupId", element: <Home />}, // if logged in user = null -> select user; otherwise show balance and button for adding payments
  {path: ":groupId/userpayments", element: <UserPayments />}, // overview of all individual spendings
  {path: ":groupId/grouppayments", element: <Payments />}, // overview of all group spendings
  {path: ":groupId/payingschema", element: <Schema />}, // shows the transactions everyone has to do
  {path: ":groupId/members", element: < Members/>}, // shows the group members and their balances
  
  {path: "*", element: < ErrorPage/>}
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    
    <ActiveUserContextProvider>
    {/* <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme"> */}
      <RouterProvider router={router} />
      {/* </ThemeProvider> */}
    </ActiveUserContextProvider>
  </React.StrictMode>,
)


