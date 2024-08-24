import React from 'react'
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import Header from '../header';
import { projects } from '../../assets/projects.data';
import styles from "./page.module.css";

export default function Portfolio() {
  return (
    <Grid container component="main" p={{xs: '3rem 0', md: '6rem 0'}} sx={{minHeight: '100vh'}} >
      <Header />
      <Grid item xs={12} md={2} textAlign="center">
        <h1>Shawn Smith</h1>
        <h2>Software Engineer</h2>
      </Grid>
      <Grid md={10}></Grid>
      <Grid container item xs={12} md={7} p={{xs: '0 3rem', md: '0 6rem'}}>
        {projects.map(p => (
          <Container key={p.id} className={styles.card} >
            <Typography className={styles.card_h2} variant='h5'>{p.name}</Typography>
            <Typography className={styles.card_p}>{p.description}</Typography>
            <Link className={styles.card_link} href={p.repo_link} target='_blank' rel='no-referrer'>{p.action}<span>-&gt;</span></Link>
          </Container>
        ))}
      </Grid>
    </Grid>  
  )
}
