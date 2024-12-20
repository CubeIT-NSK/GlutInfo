import { Route, Routes } from 'react-router-dom';
import { AuthProvider, AuthContext } from './providers/AuthContext';
import DeniedPage from '../pages/DeniedPage';
import AuthenticatedRoutes from './routes/AuthenticatedRoutes';
import UnauthenticatedRoutes from './routes/UnauthenticatedRoutes';
import { Layout } from '../shared/components/Layout';
import HomePage from '../pages/HomePage';

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />

          <Route
            path="/*"
            element={
              <AuthContext.Consumer>
                {({ isAuthenticated }) =>
                  isAuthenticated ? (
                    <AuthenticatedRoutes />
                  ) : (
                    <UnauthenticatedRoutes />
                  )
                }
              </AuthContext.Consumer>
            }
          />

          <Route path="access-denied" element={<DeniedPage />} />
        </Route>
      </Routes>
    </AuthProvider>
  );
}

export default App;
