import React from 'react';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import Header from '../header';
import getPostMetadata from '@/utils/getPostMetadata';
import styles from './page.module.css';

export default function Blog() {
  const postMetadata = getPostMetadata('src/blog');

  return (
    <Grid container component="main" p={{xs: '3rem 0', md: '6rem 0'}} sx={{minHeight: '100vh'}} >
      <Header />
      <Grid item xs={12} p={{xs: '6rem 3rem 0', md: '6rem'}} sx={{minHeight: 'inherit'}}>
        {postMetadata.length
          ? postMetadata.map(p => (
          <Container key={p.title} className={styles.card} >
            <Typography className={styles.card_h2} variant='h5'>{p.title}</Typography>
            <Typography className={styles.card_p}>{p.bio}</Typography>
            <Link className={styles.card_link} href={`blog/${p.slug}`} >view post<span>-&gt;</span></Link>
          </Container>
        ))
        : 'Blog currently under construction. Please check back soon...'}
      </Grid>
    </Grid>  
  )  
}
