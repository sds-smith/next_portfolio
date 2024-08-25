import React from 'react';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import GridComponentMain from '../GridComponentMain';
import Signature from '../Signature';
import getPostMetadata from '@/utils/getPostMetadata';
import styles from '../page.module.css';

export default function Blog() {
  const postMetadata = getPostMetadata('src/blog');

  return (
    <GridComponentMain page='blog'>
      <Signature page='blog' />
      <Grid container item xs={12} md={7} p={{xs: '0 3rem', md: '0 6rem'}}>
        {postMetadata.length
          ? postMetadata.map(p => (
          <Container key={p.title} className={styles.card} >
            <Typography className={styles.card_h2} variant='h5'>{p.title}<span style={{fontSize: '16px', fontStyle: 'italic'}}>{` -- ${p.date}`}</span></Typography>
            <Typography className={styles.card_p}>{p.bio}</Typography>
            <Link className={styles.card_link} href={`blog/${p.slug}`} >view post<span>-&gt;</span></Link>
          </Container>
        ))
        : 'Blog currently under construction. Please check back soon...'}
      </Grid>
    </GridComponentMain>
  )  
}
