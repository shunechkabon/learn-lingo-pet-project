import TeachersFilters from "../../components/TeachersFilters/TeachersFilters";
import TeachersList from "../../components/TeachersList/TeachersList";
import s from "./TeachersPage.module.css";

const TeachersPage = () => {
  return (
    <div className={s.container}>
      <TeachersFilters />
      <TeachersList />
      <button>Load more</button>
    </div>
  );
};

export default TeachersPage;
