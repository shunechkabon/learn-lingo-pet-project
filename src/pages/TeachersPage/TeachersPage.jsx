import { useState, useEffect } from "react";
import TeachersFilters from "../../components/TeachersFilters/TeachersFilters";
import TeachersList from "../../components/TeachersList/TeachersList";
import { db, ref, get, child } from "../../firebase";
import s from "./TeachersPage.module.css";

const PAGE_SIZE = 4;

const TeachersPage = () => {
  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filteredTeachers, setFilteredTeachers] = useState([]);
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const [filters, setFilters] = useState({
    language: "Any",
    level: "Any",
    price: "Any",
  });

  // Teachers data upload
  useEffect(() => {
    const fetchTeachers = async () => {
    const dbRef = ref(db);
      try {
        const snapshot = await get(child(dbRef, "teachers"));

        if (snapshot.exists()) {
          const data = snapshot.val();
          const teachersArray = Object.values(data);
          setFilteredTeachers(teachersArray);
          setTeachers(teachersArray.slice(0, PAGE_SIZE));
        } else {
          console.log("No teachers found in Firebase.");
        }
      } catch (error) {
        console.error("Error fetching teachers:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTeachers();
  }, []);

  // Teachers filtration
  useEffect(() => {
    const filtered = filteredTeachers.filter((teacher) =>
      (filters.language === "Any" || teacher.languages.includes(filters.language)) &&
      (filters.level === "Any" || teacher.levels.includes(filters.level)) &&
      (filters.price === "Any" || (teacher.price_per_hour >= filters.price && teacher.price_per_hour < filters.price + 10))
    );
    setTeachers(filtered.slice(0, PAGE_SIZE));
    setVisibleCount(PAGE_SIZE);
  }, [filters, filteredTeachers]);

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

  if (loading) return <p>Loading teachers...</p>;

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
