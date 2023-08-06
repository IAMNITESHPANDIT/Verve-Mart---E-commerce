import { Navigate, useLocation } from 'react-router-native';

export default function ProtectedRoute(props) {
  const { isVerified, redirectPath, children } = props;
  const location = useLocation();

  if (!isVerified) {
    const previousState = location.pathname;
    sessionStorage.setItem('previousUrl', previousState);
    return <Navigate to={redirectPath} replace />;
  }

  if (sessionStorage.getItem('previousUrl')) {
    sessionStorage.removeItem('previousUrl');
  }
  return children;
}
