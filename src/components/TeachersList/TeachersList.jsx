import TeachersCard from "../TeachersCard/TeachersCard";

const dummyTeachers = [
  {
    id: 1,
    name: "Jane Smith",
    languages: ["German", "French"],
    lessonsDone: 1098,
    rating: 4.8,
    price: 30,
  },
  {
    id: 2,
    name: "David Johnson",
    languages: ["Mandarin Chinese"],
    lessonsDone: 1203,
    rating: 4.2,
    price: 35,
  },
];

const TeachersList = () => {
  return (
    <ul>
      {dummyTeachers.map((teacher) => (
        <TeachersCard key={teacher.id} teacher={teacher} />
      ))}
    </ul>
  );
};

export default TeachersList;
