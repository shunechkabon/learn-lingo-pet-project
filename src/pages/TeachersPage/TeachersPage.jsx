import { useState, useEffect } from "react";
import TeachersFilters from "../../components/TeachersFilters/TeachersFilters";
import TeachersList from "../../components/TeachersList/TeachersList";
import teachersData from "../../data/teachers.json";
import s from "./TeachersPage.module.css";

const PAGE_SIZE = 4;

const TeachersPage = () => {
  const [teachers, setTeachers] = useState([]);
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  useEffect(() => {
    setTeachers(teachersData.slice(0, PAGE_SIZE));
  }, []);

  const handleLoadMore = () => {
    const newCount = visibleCount + PAGE_SIZE;
    setTeachers(teachersData.slice(0, newCount));
    setVisibleCount(newCount);
  };

  return (
    <div className={s.container}>
      <TeachersFilters />
      <TeachersList teachers={teachers} />
      {visibleCount < teachersData.length && (
        <button onClick={handleLoadMore} className={s.loadMoreBtn}>Load more</button>
      )}
    </div>
  );
};

export default TeachersPage;
