import { motion } from "framer-motion";
import s from "./Stats.module.css";

const stats = [
    { id: 1, number: "32,000", label: "Experienced tutors" },
    { id: 2, number: "300,000", label: "5-star tutor reviews" },
    { id: 3, number: "120", label: "Subjects taught" },
    { id: 4, number: "200", label: "Tutor nationalities" },
];

const StatsSection = () => {
    return (
        <section className={s.stats}>
            <div className={s.container}>
                {stats.map((stat) => (
                    <motion.div
                        key={stat.id}
                        className={s.statItem}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: stat.id * 0.2 }}
                    >
                        <span className={s.number}>{stat.number} +</span>
                        <span className={s.label}>{stat.label}</span>
                    </motion.div>
                ))}
            </div>
        </section>
    );
};

export default StatsSection;
