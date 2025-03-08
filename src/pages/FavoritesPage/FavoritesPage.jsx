import { useFavorites } from "../../hook/useFavorites";
import TeachersList from "../../components/TeachersList/TeachersList";
import s from './FavoritesPage.module.css';

const FavoritesPage = () => {
  const favorites = useFavorites();

  return (
    <section className={s.container}>
      {favorites.length > 0 ? (
        <TeachersList teachers={favorites} />
      ) : (
        <p className={s.empty}>You haven`t added any favorite teachers yet.</p>
      )}
    </section>);
};

export default FavoritesPage;
