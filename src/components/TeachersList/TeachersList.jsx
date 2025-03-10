import TeachersCard from "../TeachersCard/TeachersCard";
import s from "./TeachersList.module.css";

const TeachersList = ({ teachers }) => {
    if (teachers.length === 0) {
        return <p className={s.noResults}>No teachers found.</p>;
    }

    return (
        <ul className={s.list}>
            {teachers.map((teacher, index) =>
                <TeachersCard key={index} teacher={teacher} />
            )}
        </ul>
    );
};

export default TeachersList;
