import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import "../src/style.scss";

import {
  createBrowserRouter,
  RouterProvider,
  Navigate
} from "react-router-dom";
import Swipe from './views/Swipe';
import Gallery from './views/Gallery';

const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      {
        path: "/",
        element: <Navigate to="/swipe" replace />
      },
      {
        path: "swipe",
        element: <Swipe />
      },
      {
        path: "gallery",
        element: <Gallery/>
      }

    ]
  },
]);

ReactDOM.render(
  <React.StrictMode>
    <RouterProvider router={router} /> 
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
