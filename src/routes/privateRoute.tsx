import { Navigate } from "react-router-dom";
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';

const PrivateRoute = ({ children }: { children: JSX.Element }) => {
  const { isAuthenticated } = useSelector((state: RootState) => state.user);
  return isAuthenticated ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
