import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.scss'
import { Navigate, RouterProvider, createBrowserRouter } from 'react-router-dom';
import { Dashboard } from './views/Dashboard/Dashboard';
import { Join } from './views/Join/Join.tsx';
import { Create } from './views/Create/Create.tsx';
import { TimerProvider } from './contexts/TimerContext.tsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    // TODO: add errorElement
    children: [
      {
        index: true,
        element: <Navigate to="dashboard/" replace />,
      },
      {
        path: "dashboard/",
        element: <Dashboard />
      },
      {
        path: "party/",
        element: <Create />
      },
      {
        path: "join/",
        element: <Join />
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <TimerProvider>
      <RouterProvider router={router} />
    </TimerProvider>
  </React.StrictMode>,
)
