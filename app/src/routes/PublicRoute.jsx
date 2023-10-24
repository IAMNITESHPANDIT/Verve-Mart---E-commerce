import { Navigate } from 'react-router-native';


export default function PublicRoute(props) {
  const { isVerified, redirectPath, children } = props;

  if (isVerified) {
    return <Navigate to={redirectPath} replace />;
  }

  return children;
}
