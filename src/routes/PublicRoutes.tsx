import React, { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import { ErrorBoundary } from 'react-error-boundary';
import Loader from '@/components/common/loaders/Loader';
import FallbackError from '@/components/common/errors/FallbackError';
import Footer from '@/components/footer/Footer';
import Header from '@/components/header/Header';

const PublicRoute: React.FC = () => {
  return (
    <ErrorBoundary fallback={<FallbackError errorText="An error occurred in the application." />}>
      <Suspense fallback={<Loader />}>
        <Header />
        <Outlet />
        <Footer />
      </Suspense>
    </ErrorBoundary>
  );
};

export default PublicRoute;
