import styles from "./NotFound.module.css";
import { Link } from "react-router-dom";

export default function NotFound(){
  return (
    <div className={styles.wrap}>
      <div className={styles.card}>
        <h1 className={styles.h1}>404 — Page not found</h1>
        <p className={styles.p}>Go back to homepage.</p>
        <Link className={styles.btn} to="/">Back Home</Link>
      </div>
    </div>
  );
}