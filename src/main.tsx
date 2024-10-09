import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import SignUp from './pages/SignUp/SignUp.tsx';
import SignIn from './pages/SignIn/SignIn.tsx';
import DashboardRead from './pages/DashboardRead/DashboardRead.tsx';
import Show from './components/Api/Show/Show.tsx';
import Read from './components/Api/Read/Read.tsx';
import Create from './components/Api/Create/Create.tsx';
import Update from './components/Api/Update/Update.tsx';
const routes = createBrowserRouter([
  {
    path: '/Task-5-Adv/',
    element: <App />,
    children: [
      {
        path: '/Task-5-Adv/',
        element: <DashboardRead />,
        children: [
          {
            index: true,
            element: <Read />
          },
          {
            element: <Show />,
            path: 'show/:id'
          },
          {
            element: <Create />,
            path: 'create'
          },
          {
            element: <Update />,
            path: 'update/:id'
          },
        ]
      },
      {
        element: <SignUp />,
        path: '/Task-5-Adv/signUp'
      },
      {
        element: <SignIn />,
        path: '/Task-5-Adv/signIn'
      }
    ]
  }
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={routes} />
  </StrictMode>,
)
