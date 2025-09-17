import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import Root from './components/Root.jsx';
import App from './App.jsx';
import Home from './pages/Home.jsx';
import About from './pages/About.jsx';
import Shop from './pages/Shop.jsx';
import Category from './pages/Category.jsx';
import Contact from './pages/Contact.jsx';
import './index.css';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    children: [
      { index: true, element: <Home /> },
      { path: 'about', element: <About /> },
      { path: 'shop', element: <Shop /> },
      { path: 'shop/:slug', element: <Category /> },
      { path: 'contact', element: <Contact /> },
      { path: 'product/:slug', element: <App /> },
    ],
  },
]);

createRoot(document.getElementById('root')).render(
  <HelmetProvider>
    <RouterProvider router={router} />
  </HelmetProvider>
);