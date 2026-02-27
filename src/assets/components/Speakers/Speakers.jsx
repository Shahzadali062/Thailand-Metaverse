import { motion } from "framer-motion";
import { Mic, BadgeCheck } from "lucide-react";
import styles from "./Speakers.module.css";

export default function Speakers({ speakers = [] }) {
  const wrap = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.08 } },
  };
  const item = {
    hidden: { opacity: 0, y: 14, scale: 0.98 },
    show: { opacity: 1, y: 0, scale: 1 },
  };

  return (
    <motion.div
      variants={wrap}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.25 }}
      className={styles.grid}
    >
      {speakers.map((s) => (
        <motion.div
          key={s.name}
          variants={item}
          whileHover={{ y: -6, rotateX: 2, rotateY: -2 }}
          transition={{ type: "spring", stiffness: 260, damping: 18 }}
          className={`${styles.card} glass gborder`}
        >
          <div className={styles.top}>
            <div className={styles.avatar} />
            <div className={styles.badges}>
              <span className={styles.pill}><BadgeCheck size={16} /> Featured</span>
              <span className={styles.pill}><Mic size={16} /> Talk</span>
            </div>
          </div>

          <div className={styles.name}>{s.name}</div>
          <div className={styles.role}>{s.role}</div>
          <div className={styles.topic}>
            <span className={styles.topicLabel}>Topic:</span> {s.topic}
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
}