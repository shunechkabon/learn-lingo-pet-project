import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import Icon from '../Icon';
import s from "./TrialLessonModal.module.css";

const schema = yup.object({
    name: yup.string()
        .min(2, 'Name must be at least 2 characters')
        .max(32, 'Name must not exceed 32 characters')
        .required('Name is required'),
    email: yup.string()
        .email('Invalid email')
        .required('Email is required'),
    phone: yup.string()
        .matches(/^\+?[0-9\s-]{7,15}$/, 'Invalid phone number')
        .required('Phone number is required'),
}).required();

const TrialLessonModal = ({ isOpen, onClose, teacher }) => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm({
        resolver: yupResolver(schema)
    });
    
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
            reset();
        }
        return () => {
            document.body.style.overflow = '';
        };
    }, [isOpen, reset]);

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'Escape') {
                onClose();
                setTimeout(() => document.activeElement.blur(), 0);
            }
        };
        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, [onClose]);

    const onSubmit = () => {
        reset();
        onClose();
    };

    return (
        <div className={`${s.overlay} ${isOpen ? s.overlayVisible : ''}`} onClick={onClose}>
            <div className={`${s.modal} ${isOpen ? s.modalVisible : ''}`} onClick={(e) => e.stopPropagation()}>
                <button className={s.closeBtn} onClick={onClose}>
                    <Icon name="icon-close" width={32} height={32} />
                </button>
                <h2 className={s.modalTitle}>Book trial lesson</h2>
                <p className={s.modalText}>
                    Our experienced tutor will assess your current language level, discuss your learning goals, and tailor the lesson to your specific needs.
                </p>

                {/* Teacher info */}
                {teacher && (
                    <div className={s.teacher}>
                        <img src={teacher.avatar_url} alt={teacher.name} className={s.avatar} />
                        <div className={s.teacherInfo}>
                            <span className={s.who}>Your teacher</span>
                            <p className={s.teacherName}>{teacher.name} {teacher.surname}</p>
                        </div>
                    </div>
                )}

                {/* Form */}
                <form onSubmit={handleSubmit(onSubmit)} className={s.modalForm}>
                    <p className={s.formText}>What is your main reason for learning English?</p>
                    <div className={s.radioGroup}>
                        <label>
                            <input className={s.radio} {...register("reason")} type="radio" value="Career and business" />
                            <span className={s.label}>Career and business</span>
                        </label>
                        <label>
                            <input className={s.radio} {...register("reason")} type="radio" value="Lesson for kids" />
                            <span className={s.label}>Lesson for kids</span>
                        </label>
                        <label>
                            <input className={s.radio} {...register("reason")} type="radio" value="Living abroad" />
                            <span className={s.label}>Living abroad</span>
                        </label>
                        <label>
                            <input className={s.radio} {...register("reason")} type="radio" value="Exams and coursework" />
                            <span className={s.label}>Exams and coursework</span>
                        </label>
                        <label>
                            <input className={s.radio} {...register("reason")} type="radio" value="Culture, travel or hobby" />
                            <span className={s.label}>Culture, travel or hobby</span>
                        </label>
                    </div>
                    <div className={s.inputGroup}>
                        <div className={s.nameWrapper}>
                            <input {...register("name")} type="text" placeholder="Full Name" />
                            {errors.name && (
                                <p className={s.errorText}>{errors.name.message}</p>
                            )}
                        </div>
                        <div className={s.emailWrapper}>
                            <input {...register("email")} type="email" placeholder="Email" />
                            {errors.email && (
                                <p className={s.errorText}>{errors.email.message}</p>
                            )}
                        </div>
                        <div className={s.phoneWrapper}>
                            <input {...register("phone")} type="tel" placeholder="Phone number" />
                            {errors.phone && (
                                <p className={s.errorText}>{errors.phone.message}</p>
                            )}
                        </div>
                    </div>
                    <button type="submit" className={s.bookBtn}>Book</button>
                </form>
            </div>
        </div>
    );
};

export default TrialLessonModal;
