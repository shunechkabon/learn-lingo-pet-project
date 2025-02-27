import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import Icon from '../Icon';
import s from './RegisterModal.module.css';

const schema = yup.object({
    name: yup.string()
        .min(2, 'Name must be at least 2 characters')
        .max(32, 'Name must not exceed 32 characters')
        .required('Name is required'),
    email: yup.string()
        .email('Invalid email')
        .required('Email is required'),
    password: yup.string()
        .min(6, 'Password must be at least 6 characters')
        .required('Password is required'),
}).required();

const RegisterModal = ({ isOpen, onClose }) => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm({
        resolver: yupResolver(schema)
    });

    const [showPassword, setShowPassword] = useState(false);
    const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
};

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
                <h2 className={s.loginTitle}>Registration</h2>
                <p className={s.loginText}>Thank you for your interest in our platform! In order to register, we need some information. Please provide us with the following information.</p>

                {/* Login Form */}
                <form onSubmit={handleSubmit(onSubmit)} className={s.loginForm}>
                    <div className={s.nameWrapper}>
                        <input {...register('name')} type="name" placeholder="Name" autoFocus />
                        {errors.name && (
                            <p className={s.errorText}>{errors.name.message}</p>
                        )}
                    </div>
                    <div className={s.emailWrapper}>
                        <input {...register('email')} type="email" placeholder="Email" />
                        {errors.email && (
                            <p className={s.errorText}>{errors.email.message}</p>
                        )}
                    </div>
                    <div className={s.passwordWrapper}>
                        <input {...register('password')} type={showPassword ? "text" : "password"} placeholder="Password" />
                        <button type='button' className={s.toggleBtn} onClick={togglePasswordVisibility}>
                            {showPassword ? (
                                <Icon name='icon-eye-on' width={20} height={20} className={s.iconEyeOn} />
                            ) : (
                                <Icon name='icon-eye-off' width={20} height={20} className={s.iconEyeOff} />
                            )}
                        </button>
                        {errors.password && (
                            <p className={s.errorText}>{errors.password.message}</p>
                        )}
                    </div>
                    <button className={s.submitBtn} type="submit">Sign Up</button>
                </form>
            </div>
        </div>
    );
};

export default RegisterModal;