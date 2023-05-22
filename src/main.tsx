import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import 'virtual:windi.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
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
]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
