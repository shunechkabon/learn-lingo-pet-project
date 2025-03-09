import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { loginUser, clearError } from '../../redux/auth/authSlice';
import Icon from '../Icon';
import s from './LoginModal.module.css';

const schema = yup.object({
    email: yup.string().email('Invalid email').required('Email is required'),
    password: yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
}).required();

const LoginModal = ({ isOpen, onClose, onSuccess }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { loading, error } = useSelector((state) => state.auth);
    const { register, handleSubmit, setValue, formState: { errors }, reset } = useForm({
        resolver: yupResolver(schema)
    });

    const [showPassword, setShowPassword] = useState(false);
    const togglePasswordVisibility = () => {
        setShowPassword((prev) => !prev);
    };

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
            dispatch(clearError());
            setTimeout(() => {
                if (document.activeElement) {
                    document.activeElement.blur();
                }
            }, 0);
        } else {
            document.body.style.overflow = '';
            reset();
        }
        return () => {
            document.body.style.overflow = '';
        };
    }, [isOpen, reset, dispatch]);

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
        const resultAction = await dispatch(loginUser(data));

        if (loginUser.fulfilled.match(resultAction)) {
            reset();
            onClose();
            navigate("/");
            onSuccess();
        } else {
            setValue('password', '');
        }
    };

    return (
        <div className={`${s.overlay} ${isOpen ? s.overlayVisible : ''}`} onClick={onClose}>
            <div className={`${s.modal} ${isOpen ? s.modalVisible : ''}`} onClick={(e) => e.stopPropagation()}>
                <button className={s.closeBtn} onClick={onClose}>
                    <Icon name="icon-close" width={32} height={32} />
                </button>
                <h2 className={s.loginTitle}>Log In</h2>
                <p className={s.loginText}>Welcome back! Please enter your credentials to access your account and continue your search for an teacher.</p>

                {/* Login Form */}
                <form onSubmit={handleSubmit(onSubmit)} className={s.loginForm}>
                    <div className={s.emailWrapper}>
                        <input {...register('email')} type="email" placeholder="Email" autoComplete="username" autoFocus />
                        {errors.email && (
                            <p className={s.errorText}>{errors.email.message}</p>
                        )}
                    </div>
                    <div className={s.passwordWrapper}>
                        <input {...register('password')} type={showPassword ? "text" : "password"} placeholder="Password" autoComplete="current-password" />
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
                        {error && <p className={s.errorText}>Incorrect password. Please, try again.</p>}
                    </div>

                    <button className={s.submitBtn} type="submit" disabled={loading}>
                        {loading ? "Logging in..." : "Log In"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default LoginModal;