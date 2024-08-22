
import Grid from "@mui/material/Grid";
import styles from "./page.module.css";

export default function Header() {
  return (
    <Grid container item xs={12} className={styles.header}>
      <Grid item xs={1} md={9}></Grid>
      <Grid container item xs={11} md={3}>
          <Grid item xs={3}><a href="/">Home</a></Grid>
          <Grid item xs={3}><a href="/about">About</a></Grid>
          <Grid item xs={3}><a href="/portfolio">Portfolio</a></Grid>
          <Grid item xs={3}><a href="/blog">Blog</a></Grid>
      </Grid>
    </Grid>
  )
}
