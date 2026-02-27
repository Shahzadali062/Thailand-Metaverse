import useScrollSpy from "../../hooks/useScrollSpy";
import { motion, useScroll } from "framer-motion";
import { Sparkles, Info, Users, CalendarDays, HelpCircle, Mail } from "lucide-react";
import styles from "./Navbar.module.css";

export default function Navbar({ sectionIds = [], onRegister }) {
  const active = useScrollSpy(sectionIds);
  const { scrollYProgress } = useScroll();

  const links = [
    { id: "about", label: "About", Icon: Info },
    { id: "speakers", label: "Speakers", Icon: Users },
    { id: "schedule", label: "Schedule", Icon: CalendarDays },
    { id: "faq", label: "FAQ", Icon: HelpCircle },
    { id: "contact", label: "Contact", Icon: Mail },
  ];

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (!el) return;
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <button className={styles.brand} onClick={() => scrollTo("about")} type="button">
          <div className={styles.brandIcon} aria-hidden="true" />
          <div className={styles.brandText}>
            <div className={styles.brandTitle}>Thailand Metaverse</div>
            <div className={styles.brandSub}>Immersive Tech Event</div>
          </div>
        </button>

        <nav className={styles.nav}>
          {links.map(({ id, label, Icon }) => (
            <button
              key={id}
              type="button"
              onClick={() => scrollTo(id)}
              className={active === id ? `${styles.link} ${styles.active}` : styles.link}
            >
              <Icon size={16} />
              {label}
            </button>
          ))}
        </nav>

        <button className={styles.cta} onClick={onRegister} type="button">
          <Sparkles size={18} />
          Register
        </button>
      </div>

      <motion.div className={styles.progress} style={{ scaleX: scrollYProgress }} />
    </header>
  );
}