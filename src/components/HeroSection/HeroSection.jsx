import { useNavigate } from 'react-router-dom';
import s from './HeroSection.module.css';

const HeroSection = () => {
    const navigate = useNavigate();
    
    const handleNavigate = () => {
        navigate('/teachers');
    };

    return (
        <section className={s.hero}>
            <div className={s.container}>
                <div className={s.textBlock}>
                    <h1>
                        Unlock your potential with the best <span className={s.highlight}>language</span> tutors
                    </h1>
                    <p>
                        Embark on an Exciting Language Journey with Expert Language Tutors: Elevate your language proficiency to new heights by connecting with highly qualified and experienced tutors.
                    </p>
                    <button className={s.heroBtn} onClick={handleNavigate}>Get started</button>
                </div>
                <div className={s.imageBlock}>
                    <img
                        src="/src/assets/images/user-homepage.png"
                        srcSet='/src/assets/images/user-homepage.png 1x, /src/assets/images/user-homepage@2x.png 2x'
                        alt="Tutor Avatar"
                        className={s.emoji}
                    />
                    <img src="/src/assets/images/Mac.png" alt="Macbook" className={s.mac} />
                </div>
            </div>
        </section>
    );
};

export default HeroSection;