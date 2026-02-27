import { useEffect, useMemo, useState } from "react";
import styles from "./Countdown.module.css";

function diffParts(targetMs) {
  const now = Date.now();
  const d = Math.max(0, targetMs - now);

  const days = Math.floor(d / (1000 * 60 * 60 * 24));
  const hrs = Math.floor((d / (1000 * 60 * 60)) % 24);
  const mins = Math.floor((d / (1000 * 60)) % 60);
  const secs = Math.floor((d / 1000) % 60);

  return { days, hrs, mins, secs, done: d === 0 };
}

export default function Countdown({ dateISO }) {
  const targetMs = useMemo(() => new Date(dateISO).getTime(), [dateISO]);
  const [t, setT] = useState(() => diffParts(targetMs));

  useEffect(() => {
    // If date is invalid, do nothing (prevents NaN issues)
    if (!Number.isFinite(targetMs)) return;

    // initial tick so UI updates instantly
    setT(diffParts(targetMs));

    const id = setInterval(() => setT(diffParts(targetMs)), 1000);
    return () => clearInterval(id);
  }, [targetMs]);

  return (
    <div className={`${styles.box} glass gborder`}>
      <div className={styles.title}>{t.done ? "Event is live!" : "Countdown to Launch"}</div>

      <div className={styles.grid}>
        <Stat label="Days" value={t.days} />
        <Stat label="Hours" value={t.hrs} />
        <Stat label="Minutes" value={t.mins} />
        <Stat label="Seconds" value={t.secs} />
      </div>

      <div className={styles.hint}>Auto-updates every second</div>
    </div>
  );
}

function Stat({ label, value }) {
  return (
    <div className={styles.stat}>
      <div className={styles.num}>{String(value).padStart(2, "0")}</div>
      <div className={styles.label}>{label}</div>
    </div>
  );
}