import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.scss'
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { Dashboard } from './views/Dashboard/Dashboard';
import { Join } from './views/Join/Join.tsx';
import { Create } from './views/Create/Create.tsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    // TODO: add errorElement
    children: [
      {
        path: "dashboard/",
        element: <Dashboard />
      },
      {
        path: "create-party/",
        element: <Create />
      },
      {
        path: "join-party/",
        element: <Join />
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
