import React, { useEffect } from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import Location from './Pages/Location';
import Dashboard from './Pages/Dashboard';
import Layout from './components/layout/Layout';
import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  body {
    font-family: 'roboto', sans-serif;
  }
`;

const App: React.FC = () => {
  return (
    <>
      <GlobalStyle />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="add-user" element={<Location />} />
            {/* Redirect from "/" to "/dashboard" */}
            <Route
              index
              element={<Navigate to="dashboard" replace />}
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
