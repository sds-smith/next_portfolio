
import Grid from "@mui/material/Grid";
import Header from "./header";
import Center from "./center";
import Contact from "./contact";
import styles from "./page.module.css";

export default function Home() {
  return (
    <Grid container component="main" className={styles.main}>
      <Header />
      <Center />
      <Contact />
    </Grid>
  );
}
