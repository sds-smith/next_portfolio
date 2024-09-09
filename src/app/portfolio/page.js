import React from 'react'
import Image from 'next/image';
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
      <Grid container item xs={12} md={9} p={{xs: '0 3rem', md: '0 6rem'}} mt={{md: '4rem'}}>
        {projects.map(p => (
          <a key={p.id} className={styles.card_link} href={p.repo_link} target='_blank' rel='no-referrer'>
            <Grid container className={styles.card} >
              <Grid item xs={12} md={3}>
                <Image src={p.background_image} alt={p.id} style={{width: '200px', height: 'auto'}}/>
              </Grid>
              <Grid item xs={12} md={9} >
                <Typography className={styles.card_h2} variant='h5'>{p.name}</Typography>
                <Typography className={styles.card_p}>{p.description}</Typography>
                <Typography className={styles.card_pointer} href={p.repo_link} target='_blank' rel='no-referrer'>{p.action}<span>-&gt;</span></Typography>
              </Grid>
            </Grid >
          </a>
        ))}
      </Grid>
    </GridComponentMain>  
  )
}
