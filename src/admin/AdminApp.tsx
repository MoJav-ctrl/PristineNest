import { Routes, Route } from 'react-router-dom';
import { AdminAuthProvider } from '../context/AdminAuthContext';
import { ADMIN_BASE_PATH } from '../lib/adminConfig';
import RequireAuth from './components/RequireAuth';
import LoginPage from './pages/LoginPage';
import ChangePasswordPage from './pages/ChangePasswordPage';
import PostsListPage from './pages/PostsListPage';
import PostEditorPage from './pages/PostEditorPage';
import StaffPage from './pages/StaffPage';

export default function AdminApp() {
  return (
    <AdminAuthProvider>
      <Routes>
        <Route path={`/${ADMIN_BASE_PATH}`} element={<LoginPage />} />
        <Route
          path={`/${ADMIN_BASE_PATH}/change-password`}
          element={
            <RequireAuth>
              <ChangePasswordPage />
            </RequireAuth>
          }
        />
        <Route
          path={`/${ADMIN_BASE_PATH}/posts`}
          element={
            <RequireAuth>
              <PostsListPage />
            </RequireAuth>
          }
        />
        <Route
          path={`/${ADMIN_BASE_PATH}/posts/new`}
          element={
            <RequireAuth>
              <PostEditorPage />
            </RequireAuth>
          }
        />
        <Route
          path={`/${ADMIN_BASE_PATH}/posts/:id/edit`}
          element={
            <RequireAuth>
              <PostEditorPage />
            </RequireAuth>
          }
        />
        <Route
          path={`/${ADMIN_BASE_PATH}/staff`}
          element={
            <RequireAuth>
              <StaffPage />
            </RequireAuth>
          }
        />
      </Routes>
    </AdminAuthProvider>
  );
}
