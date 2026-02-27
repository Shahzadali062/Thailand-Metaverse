import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Sun, Sunset, Moon, ArrowRight } from "lucide-react";
import styles from "./Schedule.module.css";

export default function Schedule({ items = [] }) {
  const tabs = useMemo(
    () => [
      { key: "Morning", Icon: Sun },
      { key: "Afternoon", Icon: Sunset },
      { key: "Evening", Icon: Moon },
    ],
    []
  );

  const [tab, setTab] = useState("Morning");

  const filtered = useMemo(() => {
    return items.filter((x) => {
      const h = parseInt(x.time.split(":")[0], 10);
      if (tab === "Morning") return h < 12;
      if (tab === "Afternoon") return h >= 12 && h < 17;
      return h >= 17;
    });
  }, [items, tab]);

  const wrap = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.07 } },
  };
  const row = {
    hidden: { opacity: 0, y: 10 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <div>
      <div className={styles.tabs}>
        {tabs.map(({ key, Icon }) => (
          <button
            key={key}
            type="button"
            className={tab === key ? `${styles.tab} ${styles.active}` : styles.tab}
            onClick={() => setTab(key)}
          >
            <Icon size={16} />
            {key}
          </button>
        ))}
      </div>

      <motion.div
        variants={wrap}
        initial="hidden"
        animate="show"
        className={styles.list}
      >
        {filtered.map((it) => (
          <motion.div
            key={it.time + it.title}
            variants={row}
            className={`${styles.item} glass gborder`}
            whileHover={{ y: -2 }}
          >
            <div className={styles.time}>{it.time}</div>
            <div className={styles.content}>
              <div className={styles.title}>
                {it.title} <ArrowRight size={16} className={styles.arrow} />
              </div>
              <div className={styles.note}>{it.note}</div>
            </div>
          </motion.div>
        ))}

        {!filtered.length && (
          <div className={styles.empty}>No sessions in this block.</div>
        )}
      </motion.div>
    </div>
  );
}