import { Suspense } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { ErrorBoundary } from 'react-error-boundary';
import Loader from '@/components/common/loaders/Loader';
import FallbackError from '@/components/common/errors/FallbackError';
import Header from '@/components/header/Header';
import Footer from '@/components/footer/Footer';
import useIsLogged from '@/hooks/useIsLogged';

function PrivateRoute() {
  const { isLogged } = useIsLogged();

  if (isLogged === false) {
    return <Navigate to={'/'} />;
  }

  return (
    <ErrorBoundary fallback={<FallbackError errorText="An error occurred in the application." />}>
      <Suspense fallback={<Loader />}>
        <Header />
        <Outlet />
        <Footer />
      </Suspense>
    </ErrorBoundary>
  );
}

export default PrivateRoute;
