import React from 'react';
import Grid from '@mui/material/Grid';
import Header from '../header';
import styles from "./page.module.css";

export default function Blog() {
  return (
    <Grid container component="main" p={{xs: '3rem 0', md: '6rem 0'}} sx={{minHeight: '100vh'}} >
      <Header />
      <Grid item xs={12} p={{xs: '6rem 3rem 0', md: '6rem'}} sx={{minHeight: 'inherit'}}>
        <h3>Blog currently under construction. Check back soon...</h3>
      </Grid>
    </Grid>  
  )  
}
