import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import styles from "./RegisterModal.module.css";

export default function RegisterModal({ open, onClose, eventName }){
  const [done, setDone] = useState(false);

  function submit(e){
    e.preventDefault();
    setDone(true);
    e.target.reset();
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
              <button className={styles.close} onClick={onClose}>✕</button>
            </div>

            <form className={styles.form} onSubmit={submit}>
              <Field label="Full Name" name="name" required />
              <Field label="Email" name="email" type="email" required />
              <Field label="Phone (optional)" name="phone" />
              <Select label="Ticket Type" name="ticket" options={["General","Student","VIP","Online Pass"]} />
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

function Field({ label, ...props }){
  return (
    <label className={styles.field}>
      <span className={styles.label}>{label}</span>
      <input className={styles.input} {...props} />
    </label>
  );
}
function Textarea({ label, ...props }){
  return (
    <label className={styles.field}>
      <span className={styles.label}>{label}</span>
      <textarea className={styles.textarea} rows={3} {...props} />
    </label>
  );
}
function Select({ label, options, ...props }){
  return (
    <label className={styles.field}>
      <span className={styles.label}>{label}</span>
      <select className={styles.select} {...props}>
        {options.map((o) => <option key={o} value={o}>{o}</option>)}
      </select>
    </label>
  );
}