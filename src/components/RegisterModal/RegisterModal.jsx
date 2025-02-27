import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import s from './RegisterModal.module.css';

const schema = yup.object({
    name: yup.string().required('Name is required'),
    email: yup.string().email('Invalid email').required('Email is required'),
    password: yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
}).required();

const RegisterModal = ({ isOpen, onClose }) => {
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    });

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'Escape') onClose();
        };
        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, [onClose]);

    if (!isOpen) return null;

    return (
        <div className={s.overlay} onClick={onClose}>
            <div className={s.modal} onClick={(e) => e.stopPropagation()}>
                <button className={s.closeButton} onClick={onClose}>&times;</button>
                <h2 className={s.registerTitle}>Registration</h2>
                <p className={s.registerText}>Thank you for your interest in our platform! In order to register, we need some information. Please provide us with the following information.</p>
                <form onSubmit={handleSubmit(() => { })} className={s.registerForm}>
                    <input {...register('name')} type="text" placeholder="Name" />
                    <p>{errors.name?.message}</p>
                    <input {...register('email')} type="email" placeholder="Email" />
                    <p>{errors.email?.message}</p>
                    <input {...register('password')} type="password" placeholder="Password" />
                    <p>{errors.password?.message}</p>
                    <button className={s.submitButton} type="submit">Sign Up</button>
                </form>
            </div>
        </div>
    );
};

export default RegisterModal;