import { Navigate, Outlet } from 'react-router-dom';
import { useAppSelector } from '../../app/hooks';

// Blocks non-admin users from admin-only routes (add artist/album/song).
export default function AdminRoute() {
  const user = useAppSelector((s) => s.auth.user);
  if (!user) return <Navigate to="/login" replace />;
  if (user.roleName !== 'Admin') return <Navigate to="/" replace />;
  return <Outlet />;
}
