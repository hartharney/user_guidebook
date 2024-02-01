import React from 'react';
import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from 'react-router-dom';
import Location from './Pages/Location';
import Dashboard from './Pages/Dashboard';
import Layout from './components/layout/Layout';
import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  body {
    font-family: 'roboto', sans-serif;
  }
`;


const router = createBrowserRouter(
    createRoutesFromElements(
         <Route path="/" element={<Layout />}>
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="add-user" element={<Location />} />
      </Route>
    )
);

const App: React.FC = () => {
  return (
  <>
  <GlobalStyle />
  <RouterProvider router={router}/>
  </>
  );
};

export default App;
