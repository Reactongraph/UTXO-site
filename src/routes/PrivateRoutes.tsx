import { Suspense } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { ErrorBoundary } from 'react-error-boundary';
import { getItem } from '@/utils/helpers/storageHelper';
import Loader from '@/components/common/loaders/Loader';
import FallbackError from '@/components/common/errors/FallbackError';

function PrivateRoute() {
  const isAuthenticated = getItem('access');

  if (!isAuthenticated) {
    return <Navigate to={'/'} />;
  }

  return (
    <ErrorBoundary fallback={<FallbackError errorText="An error occurred in the application." />}>
      <Suspense fallback={<Loader />}>
        <Outlet />
      </Suspense>
    </ErrorBoundary>
  );
}

export default PrivateRoute;
