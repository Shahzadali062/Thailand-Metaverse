import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import styles from "./RegisterModal.module.css";

const TICKET_OPTIONS = ["General", "Student", "VIP", "Online Pass"];

export default function RegisterModal({ open, onClose, eventName }) {
  const [done, setDone] = useState(false);
  const [ticket, setTicket] = useState("Student");

  function submit(e) {
    e.preventDefault();
    setDone(true);
    e.target.reset();
    setTicket("Student");

    setTimeout(() => {
      setDone(false);
      onClose();
    }, 1200);
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className={styles.backdrop}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onMouseDown={onClose}
        >
          <motion.div
            className={styles.modal}
            initial={{ opacity: 0, y: 14, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.98 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            onMouseDown={(e) => e.stopPropagation()}
          >
            <div className={styles.top}>
              <div>
                <div className={styles.title}>Register</div>
                <div className={styles.sub}>for {eventName}</div>
              </div>

              <button
                type="button"
                className={styles.close}
                onClick={onClose}
                aria-label="Close register modal"
              >
                ✕
              </button>
            </div>

            <form className={styles.form} onSubmit={submit}>
              <Field label="Full Name" name="name" required />
              <Field label="Email" name="email" type="email" required />
              <Field label="Phone (optional)" name="phone" />

              <CustomSelect
                label="Ticket Type"
                name="ticket"
                options={TICKET_OPTIONS}
                value={ticket}
                onChange={setTicket}
              />

              <Textarea label="What do you want to learn?" name="message" />

              <button className={styles.btn} type="submit">
                Submit
              </button>

              {done && <div className={styles.done}>✅ Submitted! (demo)</div>}
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function Field({ label, ...props }) {
  return (
    <label className={styles.field}>
      <span className={styles.label}>{label}</span>
      <input className={styles.input} {...props} />
    </label>
  );
}

function Textarea({ label, ...props }) {
  return (
    <label className={styles.field}>
      <span className={styles.label}>{label}</span>
      <textarea className={styles.textarea} rows={3} {...props} />
    </label>
  );
}

function CustomSelect({ label, name, options, value, onChange }) {
  const [open, setOpen] = useState(false);
  const wrapRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(e) {
      if (wrapRef.current && !wrapRef.current.contains(e.target)) {
        setOpen(false);
      }
    }

    function handleEscape(e) {
      if (e.key === "Escape") {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  function choose(option) {
    onChange(option);
    setOpen(false);
  }

  return (
    <div className={styles.field}>
      <span className={styles.label}>{label}</span>

      <div className={styles.ddWrap} ref={wrapRef}>
        <input type="hidden" name={name} value={value} />

        <button
          type="button"
          className={styles.ddButton}
          onClick={() => setOpen((prev) => !prev)}
          aria-haspopup="listbox"
          aria-expanded={open}
        >
          <span className={styles.ddValue}>{value}</span>
          <span className={`${styles.ddChevron} ${open ? styles.ddChevronOpen : ""}`}>
            ▾
          </span>
        </button>

        <AnimatePresence>
          {open && (
            <motion.div
              className={styles.ddList}
              role="listbox"
              initial={{ opacity: 0, y: -6, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -6, scale: 0.98 }}
              transition={{ duration: 0.16, ease: "easeOut" }}
            >
              {options.map((option) => (
                <button
                  key={option}
                  type="button"
                  className={`${styles.ddItem} ${option === value ? styles.ddActive : ""}`}
                  onClick={() => choose(option)}
                  role="option"
                  aria-selected={option === value}
                >
                  <span>{option}</span>
                  {option === value && <span className={styles.ddCheck}>✓</span>}
                </button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}