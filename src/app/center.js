
import Container from "@mui/material/Container";
// import Typography from "@mui/material/Typography";
import styles from "./page.module.css";

export default function Center() {
    return (
        <Container className={styles.center} >
          <h1>Shawn Smith</h1>
          <h2>Software Engineer</h2>
        </Container>
    )
}