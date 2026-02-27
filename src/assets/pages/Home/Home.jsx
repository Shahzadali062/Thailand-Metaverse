import { useMemo, useState } from "react";

import Navbar from "../../components/Navbar/Navbar.jsx";
import Hero from "../../components/Hero/Hero.jsx";
import Section from "../../components/Section/Section.jsx";
import Countdown from "../../components/Countdown/Countdown.jsx";
import Speakers from "../../components/Speakers/Speakers.jsx";
import Schedule from "../../components/Schedule/Schedule.jsx";
import FAQ from "../../components/FAQ/FAQ.jsx";
import RegisterModal from "../../components/RegisterModal/RegisterModal.jsx";
import Footer from "../../components/Footer/Footer.jsx";

import { event } from "../../data/event.js";
import styles from "./Home.module.css";

export default function Home(){
  const sectionIds = useMemo(() => ["about","speakers","schedule","faq","contact"], []);
  const [open, setOpen] = useState(false);

  return (
    <div className={styles.shell}>
      <Navbar sectionIds={sectionIds} onRegister={() => setOpen(true)} />
      <Hero onRegister={() => setOpen(true)} />

      <div className={styles.main}>
        <Section id="about" title="About the Event">
          <div className={styles.aboutGrid}>
            <div className={styles.card}>
              <p className={styles.p}>
                Thailand Metaverse is a one-day hybrid event focused on immersive technology and digital innovation.
                Expect keynotes, live demos, and hands-on sessions across education, tourism, culture, and business.
              </p>
              <div className={styles.tags}>
                {event.highlights.map((t) => (
                  <span key={t} className={styles.tag}>{t}</span>
                ))}
              </div>
            </div>

            <div className={styles.card}>
              <Countdown dateISO={event.dateISO} />
            </div>
          </div>
        </Section>

        <Section id="speakers" title="Featured Speakers" subtitle="Replace with real speakers any time">
          <Speakers speakers={event.speakers} />
        </Section>

        <Section id="schedule" title="Schedule" subtitle="Interactive tabs for sessions">
          <Schedule items={event.schedule} />
        </Section>

        <Section id="faq" title="FAQ" subtitle="Tap to expand">
          <FAQ items={event.faq} />
        </Section>

        <Section id="contact" title="Contact" subtitle="Let people reach you fast">
          <div className={styles.contactCard}>
            <div>
              <div className={styles.label}>Email</div>
              <div className={styles.value}>{event.email}</div>
            </div>
            <div>
              <div className={styles.label}>Venue</div>
              <div className={styles.value}>{event.venue}</div>
            </div>

            <button className={styles.cta} onClick={() => setOpen(true)}>
              Register Now
            </button>
          </div>
        </Section>
      </div>

      <Footer />
      <RegisterModal open={open} onClose={() => setOpen(false)} eventName={event.name} />
    </div>
  );
}