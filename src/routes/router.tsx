import { useLayoutEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';

import NotFoundPage from '@/containers/404';
import PublicRoute from '@/routes/PublicRoutes';
import DashboardPage from '@/containers/dashboard';
import ProposalForm from '@/containers/ProposalForm';

const Router = () => {
  const { pathname } = useLocation();

  useLayoutEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }, [pathname]);

  return (
    <Routes>
      <Route path="/" element={<PublicRoute />}>
        <Route index element={<DashboardPage />} />
        <Route path="proposal/:id" element={<ProposalForm />} />
      </Route>
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default Router;
