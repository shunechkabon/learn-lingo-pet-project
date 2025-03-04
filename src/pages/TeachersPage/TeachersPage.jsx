import { useState, useEffect } from "react";
import TeachersFilters from "../../components/TeachersFilters/TeachersFilters";
import TeachersList from "../../components/TeachersList/TeachersList";
import teachersData from "../../data/teachers.json";
import s from "./TeachersPage.module.css";

const PAGE_SIZE = 4;

const TeachersPage = () => {
  const [teachers, setTeachers] = useState([]);
  const [filteredTeachers, setFilteredTeachers] = useState([]);
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const [filters, setFilters] = useState({
    language: "Any",
    level: "Any",
    price: "Any",
  });

  useEffect(() => {
    setFilteredTeachers(teachersData);
    setTeachers(teachersData.slice(0, PAGE_SIZE));
  }, []);

  useEffect(() => {
    const filtered = teachersData.filter((teacher) =>
      (filters.language === "Any" || teacher.languages.includes(filters.language)) &&
      (filters.level === "Any" || teacher.levels.includes(filters.level)) &&
      (filters.price === "Any" || (teacher.price_per_hour >= filters.price && teacher.price_per_hour < filters.price + 10))
    );
    setFilteredTeachers(filtered);
    setTeachers(filtered.slice(0, PAGE_SIZE));
    setVisibleCount(PAGE_SIZE);
  }, [filters]);

  const handleLoadMore = () => {
    const newCount = visibleCount + PAGE_SIZE;
    setTeachers(filteredTeachers.slice(0, newCount));
    setVisibleCount(newCount);
  };

  const handleFilters = (newFilters) => {
    setFilters({
      language: newFilters.language,
      level: newFilters.level,
      price: newFilters.price === "Any" ? "Any" : Number(newFilters.price),
    });
  };

  return (
    <div className={s.container}>
      <TeachersFilters onFilterChange={handleFilters}/>
      <TeachersList teachers={teachers} />
      {visibleCount < filteredTeachers.length && (
        <button onClick={handleLoadMore} className={s.loadMoreBtn}>Load more</button>
      )}
    </div>
  );
};

export default TeachersPage;
