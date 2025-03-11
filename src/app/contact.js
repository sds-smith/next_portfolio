
import styles from "./page.module.css";

export default function Contact() {
    return (
        <div className={styles.grid}>
          
          <a
            href="https://www.linkedin.com/in/sds-smith/"
            className={styles.card}
            target="_blank"
            rel="noopener noreferrer"
          >
            <h2>
              LinkedIn <span>-&gt;</span>
            </h2>
            <p>linkedin.com/in/sds-smith</p>
          </a>
          
          <a
            href="https://github.com/sds-smith"
            className={styles.card}
            target="_blank"
            rel="noopener noreferrer"
          >
            <h2>
              Github <span>-&gt;</span>
            </h2>
            <p>github.com/sds-smith</p>
          </a>

          <a
            href="https://stackoverflow.com/users/20012607/sds-smith"
            className={styles.card}
            target="_blank"
            rel="noopener noreferrer"
          >
            <h2>
              StackOverflow <span>-&gt;</span>
            </h2>
            <p>stackoverflow.com/users</p>
            <p>/20012607/sds-smith</p>
          </a>

          <a
            href="mailto:sds.smith24@gmail.com'"
            className={styles.card}
            target="_blank"
            rel="noopener noreferrer"
          >
            <h2>
              Email <span>-&gt;</span>
            </h2>
            <p>sds.smith24@gmail.com</p>
          </a>

        </div>
    )
}