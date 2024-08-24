import React from 'react';
import Grid from '@mui/material/Grid';
import Header from '../header';
import Section from './Section';

import { sections } from './sections';

export default function About() {
  return (
    <Grid container component="main" p={{xs: '3rem 0', md: '6rem 0'}} sx={{minHeight: '100vh'}} >
      <Header />
      <Grid item xs={12} md={2} mt={{xs: '3rem', md: '0'}} textAlign="center">
        <h1>Shawn Smith</h1>
        <h2>Software Engineer</h2>
      </Grid>
      <Grid md={10}></Grid>
      <Grid container item xs={12} md={7} p={{xs: '0 3rem', md: '0 6rem'}}>
         { sections.map(section => (
           <Section
             key={section.title}
             section={section}
           />
         ))}
      </Grid>
    </Grid>  
  )
}
