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
                    <div className={s.teacherInfo}>
                        <img src={teacher.avatar_url} alt={teacher.name} className={s.avatar} />
                        <div>
                            <span className={s.label}>Your teacher</span>
                            <p className={s.teacherName}>{teacher.name} {teacher.surname}</p>
                        </div>
                    </div>
                )}

                {/* Form */}
                <form onSubmit={handleSubmit(onSubmit)}>
                    <label>What is your main reason for learning English?</label>
                    <div className={s.radioGroup}>
                        <label><input {...register("reason")} type="radio" value="Career and business" /> Career and business</label>
                        <label><input {...register("reason")} type="radio" value="Lesson for kids" /> Lesson for kids</label>
                        <label><input {...register("reason")} type="radio" value="Living abroad" /> Living abroad</label>
                        <label><input {...register("reason")} type="radio" value="Exams and coursework" /> Exams and coursework</label>
                        <label><input {...register("reason")} type="radio" value="Culture, travel or hobby" /> Culture, travel or hobby</label>
                    </div>
                    <div>
                        <input {...register("name")} type="text" placeholder="Full Name" />
                        {errors.name && (
                            <p className={s.errorText}>{errors.name.message}</p>
                        )}
                        <input {...register("email")} type="email" placeholder="Email" />
                        {errors.email && (
                            <p className={s.errorText}>{errors.email.message}</p>
                        )}
                        <input {...register("phone")} type="tel" placeholder="Phone number" />
                        {errors.phone && (
                            <p className={s.errorText}>{errors.phone.message}</p>
                        )}
                    </div>
                    <button type="submit" className={s.bookButton}>Book</button>
                </form>
            </div>
        </div>
    );
};

export default TrialLessonModal;
