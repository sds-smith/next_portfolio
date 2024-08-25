import React from 'react'
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import GridComponentMain from '../GridComponentMain';
import Signature from '../Signature';
import { projects } from '../../assets/projects.data';
import styles from "../page.module.css";

export default function Portfolio() {
  return (
    <GridComponentMain page='portfolio' >
      <Signature page='portfolio' />
      <Grid container item xs={12} md={7} p={{xs: '0 3rem', md: '0 6rem'}}>
        {projects.map(p => (
          <Container key={p.id} className={styles.card} >
            <Typography className={styles.card_h2} variant='h5'>{p.name}</Typography>
            <Typography className={styles.card_p}>{p.description}</Typography>
            <Link className={styles.card_link} href={p.repo_link} target='_blank' rel='no-referrer'>{p.action}<span>-&gt;</span></Link>
          </Container>
        ))}
      </Grid>
    </GridComponentMain>  
  )
}
