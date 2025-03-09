import { useNavigate } from 'react-router-dom';
import userImage from '/src/assets/images/user-homepage.png';
import userImage2x from '/src/assets/images/user-homepage@2x.png';
import macImage from '/src/assets/images/Mac.png';
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
                        src={userImage}
                        srcSet={`${userImage} 1x, ${userImage2x} 2x`}
                        alt="Tutor Avatar"
                        className={s.emoji}
                    />
                    <img src={macImage} alt="Macbook" className={s.mac} />
                </div>
            </div>
        </section>
    );
};

export default HeroSection;