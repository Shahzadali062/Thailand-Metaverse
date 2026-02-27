import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";
import styles from "./FAQ.module.css";

export default function FAQ({ items = [] }) {
  const [open, setOpen] = useState(0);

  return (
    <div className={styles.wrap}>
      {items.map((x, i) => {
        const isOpen = open === i;
        return (
          <div key={x.q} className={`${styles.row} glass gborder`}>
            <button
              type="button"
              className={styles.q}
              onClick={() => setOpen(isOpen ? -1 : i)}
            >
              <span>{x.q}</span>
              <span className={styles.icon}>
                {isOpen ? <Minus size={18} /> : <Plus size={18} />}
              </span>
            </button>

            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  className={styles.a}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.22, ease: "easeOut" }}
                >
                  {x.a}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}