import { Routes, Route } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import TeachersPage from '../pages/TeachersPage';
import FavoritesPage from '../pages/FavoritesPage';
import NotFoundPage from '../pages/NotFoundPage';

const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/teachers" element={<TeachersPage />} />
            <Route path="/favorites" element={<FavoritesPage />} />
            <Route path="*" element={<NotFoundPage />} /> {/* 404 */}
        </Routes>
    );
};

export default AppRoutes;
