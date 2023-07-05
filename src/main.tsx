import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import 'virtual:windi.css';
import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from 'react-router-dom';

const router = createBrowserRouter(
  [
    {
      path: '/',
      element: <App gameType="daily" />,
      action: async ({ request }) => {
        switch (request.method) {
          case 'POST': {
            let formData = await request.formData();
            const guess = formData.get('guess');
            return guess?.slice(0, 5).toString().toUpperCase();
          }
          default: {
            throw new Response('', { status: 405 });
          }
        }
      },
    },
    {
      path: '/seed',
      element: <App gameType="seedForm" />,
    },
    {
      path: '/:seed',
      element: <App gameType="seeded" />,
      action: async ({ request }) => {
        switch (request.method) {
          case 'POST': {
            let formData = await request.formData();
            const guess = formData.get('guess');
            return guess?.slice(0, 5).toString().toUpperCase();
          }
          default: {
            throw new Response('', { status: 405 });
          }
        }
      },
    },
    {
      path: '*',
      element: <Navigate to="/" />,
    },
  ],
  {
    basename: import.meta.env.BASE_URL,
  }
);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
