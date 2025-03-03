import { useState } from "react";
import PropTypes from "prop-types";
import Icon from '../Icon';
import TrialLessonModal from "../TrialLessonModal/TrialLessonModal";
import s from "./TeachersCard.module.css";

const TeachersCard = ({ teacher }) => {
    const { 
        name, surname, avatar_url, languages, rating, lessons_done, price_per_hour,
        lesson_info, conditions, experience, levels, reviews
    } = teacher;

    const [isExpanded, setIsExpanded] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => {
        setIsModalOpen(true);
    };

    return (
        <div className={s.card}>
            {/* Photo */}
            <div className={s.avatarWrapper}>
                <img src={avatar_url} alt={`${name} ${surname}`} className={s.photo} />
                <Icon name='icon-online' width={12} height={12} className={s.onlineIcon} />
            </div>

            <div className={s.info}>
                {/* Header */}
                <div className={s.header}>
                    <div className={s.labelWrapper}>
                        <p className={s.label}>Languages</p>
                        <h3 className={s.name}>{name} {surname}</h3>
                    </div>
                    <div className={s.statsWrapper}>
                        <ul className={s.stats}>
                            <li className={`${s.statItem} ${s.statIconSet}`}>
                                <Icon name='icon-book' width={16} height={16} style={{fill: 'none', stroke: 'var(--text-primary-color)'}} />
                                Lessons online
                            </li>
                            <li className={s.statItem}>Lessons done: {lessons_done}</li>
                            <li className={`${s.statItem} ${s.statIconSet}`}>
                                <Icon name='icon-star' width={16} height={16} />
                                Rating: {rating}
                            </li>
                            <li className={s.statItem}>Price / 1 hour: <span className={s.price}>{price_per_hour}$</span></li>
                        </ul>
                        <button className={s.favoriteBtn}>
                            <Icon name='icon-heart' className={s.favoriteIcon} width={26} height={26} />
                        </button>
                    </div>
                </div>
    
                {/* Lesson info */}
                <div className={s.lesson}>
                    <ul className={s.lessonDescrList}>
                        <li className={s.lessonDescrItem}>
                            Speaks: <span className={s.languages}>{languages.join(", ")}</span>
                        </li>
                        <li className={s.lessonDescrItem}>
                            Lesson Info: <span>{lesson_info}</span>
                        </li>
                        <li className={s.lessonDescrItem}>
                            Conditions: <span>{conditions.join(" ")}</span>
                        </li>
                    </ul>
        
                    {/* "Read more" button */}
                    {!isExpanded && (
                        <button className={s.readMoreBtn} onClick={() => setIsExpanded(true)}>
                            Read more
                        </button>
                    )}
        
                    {/* Expanded description + reviews */}
                    <div className={`${s.expandable} ${isExpanded ? s.expanded : ""}`}>
                        <p className={s.fullDescr}>{experience}</p>
    
                        {/* Reviews */}
                        <div className={s.reviews}>
                            {reviews.map(({ reviewer_name, reviewer_rating, comment }, index) => (
                                <div key={index} className={s.review}>
                                    <div className={s.reviewer}>
                                        <div className={s.reviewerPhoto}>
                                            {/* <Icon name='icon-user' width={20} height={20} /> */}
                                        </div>
                                        <div className={s.reviwerName}>
                                            <p className={s.reviewAuthor}>{reviewer_name}</p>
                                            <p className={s.reviewRate}>
                                                <Icon name='icon-star' width={16} height={16} />
                                                <span>{reviewer_rating}.0</span>
                                            </p>
                                        </div>
                                    </div>
                                    <p className={s.reviewerComment}>{comment}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
    
                {/* Level tags */}
                <div className={s.levels}>
                    {levels.map((level, index) => (
                        <span key={index} className={s.levelTag}>
                            #{level}
                        </span>
                    ))}
                </div>
    
                {/* "Book trial lesson" Button */}
                {isExpanded &&
                    <button type="button" className={s.bookLessonBtn} onClick={openModal}>Book trial lesson</button>
                }
                <TrialLessonModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} teacher={teacher} />
            </div>
        </div>
    );
};

TeachersCard.propTypes = {
    teacher: PropTypes.shape({
        name: PropTypes.string.isRequired,
        surname: PropTypes.string.isRequired,
        avatar_url: PropTypes.string.isRequired,
        languages: PropTypes.arrayOf(PropTypes.string).isRequired,
        rating: PropTypes.number.isRequired,
        lessons_done: PropTypes.number.isRequired,
        price_per_hour: PropTypes.number.isRequired,
        lesson_info: PropTypes.string.isRequired,
        conditions: PropTypes.arrayOf(PropTypes.string).isRequired,
        experience: PropTypes.string.isRequired,
        levels: PropTypes.arrayOf(PropTypes.string).isRequired,
        reviews: PropTypes.arrayOf(
            PropTypes.shape({
                reviewer_name: PropTypes.string.isRequired,
                reviewer_rating: PropTypes.number.isRequired,
                comment: PropTypes.string.isRequired,
            })
        ).isRequired,
    }).isRequired,
};

export default TeachersCard;
