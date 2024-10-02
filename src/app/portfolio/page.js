import React from 'react'
import Image from 'next/image';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import GridComponentMain from '../GridComponentMain';
import Signature from '../Signature';
import { projects } from '../../assets/projects.data';
import styles from "../page.module.css";

const imageStyle = {
  true: {height: '200px', width: 'auto', margin: '0 auto'},
  false: {height: 'auto', width: '200px'}
}

export default function Portfolio() {
  return (
    <GridComponentMain page='portfolio' >
      <Signature page='portfolio' />
      <Grid container item xs={12} md={9} p={{xs: '0 3rem', md: '0 6rem'}} mt={{md: '4rem'}}>
        {projects.map(p => (
          <a key={p.id} className={styles.card_link} href={p.repo_link} target='_blank' rel='no-referrer'>
            <Grid container className={styles.card} >
              <Grid container item xs={12} md={3}>
                <Image src={p.background_image} alt={p.id} style={imageStyle[p.image_orientation === 'portrait']}/>
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
