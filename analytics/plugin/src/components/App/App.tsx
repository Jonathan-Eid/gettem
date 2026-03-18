import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { AppRootProps } from '@grafana/data';
import { ROUTES } from '../../constants';
import { RefreshProvider } from '../../hooks/useRefreshInterval';
import { RefreshPicker } from '../RefreshPicker';

const Overview = React.lazy(() => import('../../pages/PageOne'));
const Cards = React.lazy(() => import('../../pages/PageTwo'));
const Trends = React.lazy(() => import('../../pages/PageThree'));
const Audience = React.lazy(() => import('../../pages/PageFour'));
const Pages = React.lazy(() => import('../../pages/PageFive'));

function App(_props: AppRootProps) {
  return (
    <RefreshProvider>
      <RefreshPicker />
      <Routes>
        <Route path={ROUTES.Cards} element={<Cards />} />
        <Route path={ROUTES.Trends} element={<Trends />} />
        <Route path={ROUTES.Audience} element={<Audience />} />
        <Route path={ROUTES.Pages} element={<Pages />} />
        <Route path="*" element={<Overview />} />
      </Routes>
    </RefreshProvider>
  );
}

export default App;
