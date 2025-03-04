import TeachersCard from "../TeachersCard/TeachersCard";
import s from "./TeachersList.module.css";

const TeachersList = ({ teachers }) => {
    return (
        <ul className={s.list}>
            {teachers.length > 0 ? (
                teachers.map((teacher, index) => <TeachersCard key={index} teacher={teacher} />)
            ) : (
                <p className={s.noResults}>No teachers found.</p>
            )}
        </ul>
    );
};

export default TeachersList;
