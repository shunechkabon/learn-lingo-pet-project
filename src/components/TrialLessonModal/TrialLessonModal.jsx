import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from "react-router-dom";
import { yupResolver } from '@hookform/resolvers/yup';
import { toast } from 'react-hot-toast';
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

    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    
    useEffect(() => {
        const disableScroll = (e) => e.preventDefault();
        if (isOpen) {
            document.body.style.overflow = 'hidden';
            document.addEventListener('touchmove', disableScroll, { passive: false });
            setTimeout(() => {
                if (document.activeElement) {
                    document.activeElement.blur();
                }
            }, 0);
        } else {
            document.body.style.overflow = '';
            document.removeEventListener('touchmove', disableScroll);
            reset();
        }
        return () => {
            document.body.style.overflow = '';
            document.removeEventListener('touchmove', disableScroll);
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

    const onSubmit = async (data) => {
        setLoading(true);
        try {
            const response = await fetch("/.netlify/functions/sendEmail", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ ...data, teacher }),
            });

            if (response.ok) {
                toast("Booking request sent successfully!", {
                    style: {
                        borderRadius: "8px",
                        background: "var(--button-primary-color)",
                        color: "#fff",
                    },
                });
                reset();
                onClose();
                navigate("/");
            } else {
                toast("Failed to send booking request.", {
                    style: {
                        borderRadius: "8px",
                        background: "var(--text-secondary-color)",
                        color: "#fff",
                    },
                });
            }
        } catch {
            toast("Something went wrong. Try again.", {
                style: {
                    borderRadius: "8px",
                    background: "var(--text-secondary-color)",
                    color: "#fff",
                },
            });
        } finally {
            setLoading(false);
        }
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
                    <button type="submit" className={s.bookBtn} disabled={loading}>
                        {loading ? 'Booking...' : 'Book'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default TrialLessonModal;
