import { motion } from "framer-motion";
import { Calendar, Clock, MapPin, ArrowRight } from "lucide-react";
import { event } from "../../data/event";
import styles from "./Hero.module.css";

export default function Hero({ onRegister }) {
  return (
    <section className={styles.hero}>
      <div className={styles.wrap}>
        <motion.div
          className={`${styles.left} glass gborder`}
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <div className={styles.badge}>
            <span className={styles.dot} />
            Bangkok
          </div>

          <h1 className={styles.h1}>
            {event.name}
            <br />
            <span className={styles.sub}>{event.tagline}</span>
          </h1>

          <p className={styles.lead}>
            Keynotes, demos, workshops, and networking, explore XR, digital twins, AI avatars, and virtual tourism.
          </p>

          <div className={styles.meta}>
            <div className={styles.metaItem}>
              <Calendar size={18} />
              <div><b>Date:</b> {event.dateText}</div>
            </div>
            <div className={styles.metaItem}>
              <Clock size={18} />
              <div><b>Time:</b> {event.timeText}</div>
            </div>
            <div className={styles.metaItem}>
              <MapPin size={18} />
              <div><b>Venue:</b> {event.venue}</div>
            </div>
          </div>

          <div className={styles.actions}>
            <button className={styles.primary} onClick={onRegister} type="button">
              Get Your Pass <ArrowRight size={18} />
            </button>
            <a className={styles.secondary} href="#schedule">
              See Schedule
            </a>
          </div>
        </motion.div>

        <motion.div
          className={`${styles.right} glass gborder`}
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.65, ease: "easeOut", delay: 0.05 }}
        >
          <div className={styles.aurora} />
          <div className={styles.panel}>
            <div className={styles.panelTitle}>Live Demo Zone</div>
            <div className={styles.panelText}>
              VR/AR • Digital Twins • AI Avatars • Creator Booths
            </div>

            <div className={styles.stats}>
              <Stat label="Workshops" value="6+" />
              <Stat label="Speakers" value="12+" />
              <Stat label="Demos" value="20+" />
            </div>

            <div className={styles.panelHint}>
              Sponsor logos here.
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function Stat({ label, value }) {
  return (
    <div className={styles.stat}>
      <div className={styles.statValue}>{value}</div>
      <div className={styles.statLabel}>{label}</div>
    </div>
  );
}