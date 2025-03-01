import { Routes, Route } from "react-router-dom";
import PublicRoute from "./routes/PublicRoute";
import PrivateRoute from "./routes/PrivateRoute";
import Layout from "./components/Layout";
import HomePage from "./pages/HomePage";
import TeachersPage from "./pages/TeachersPage";
import FavoritesPage from "./pages/FavoritesPage";
import NotFoundPage from "./pages/NotFoundPage";

function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <PublicRoute>
            <Layout>
              <HomePage />
            </Layout>
          </PublicRoute>
        }
      />
      <Route
        path="/teachers"
        element={
          <PublicRoute>
            <Layout>
              <TeachersPage />
            </Layout>
          </PublicRoute>
        }
      />
      <Route
        path="/favorites"
        element={
          <PrivateRoute>
            <Layout>
              <FavoritesPage />
            </Layout>
          </PrivateRoute>
        }
      />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default App;
