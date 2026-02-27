import { motion } from "framer-motion";
import styles from "./Section.module.css";

export default function Section({ id, title, subtitle, children }){
  return (
    <section id={id} className={styles.section}>
      <div className={styles.wrap}>
        <div className={styles.head}>
          <div>
            <h2 className={styles.h2}>{title}</h2>
            {subtitle && <div className={styles.sub}>{subtitle}</div>}
          </div>
        </div>

        <motion.div
          className={styles.body}
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          {children}
        </motion.div>
      </div>
    </section>
  );
}