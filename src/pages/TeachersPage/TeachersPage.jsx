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
  const [displayedTeachers, setDisplayedTeachers] = useState([]);
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
          const teachersArray = Object.entries(data).map(([id, teacher]) => ({
            id,
            ...teacher,
          }));
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
    setDisplayedTeachers(filtered);
    setTeachers(filtered.slice(0, PAGE_SIZE));
    setVisibleCount(Math.min(PAGE_SIZE, filtered.length));
  }, [filters, filteredTeachers]);

  const handleLoadMore = () => {
    const newCount = visibleCount + PAGE_SIZE;
    setTeachers((prev) => [...prev, ...displayedTeachers.slice(prev.length, newCount)]);
    setVisibleCount(newCount);
  };

  const handleFilters = (newFilters) => {
    setFilters({
      language: newFilters.language,
      level: newFilters.level,
      price: newFilters.price === "Any" ? "Any" : Number(newFilters.price),
    });
    setVisibleCount(PAGE_SIZE); 
  };

  if (loading) return <p>Loading teachers...</p>;

  return (
    <section className={s.container}>
      <TeachersFilters onFilterChange={handleFilters}/>
      <TeachersList teachers={teachers} />
      {teachers.length < displayedTeachers.length && (
        <button onClick={handleLoadMore} className={s.loadMoreBtn}>Load more</button>
      )}
    </section>
  );
};

export default TeachersPage;
