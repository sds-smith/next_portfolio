import React from 'react';
import Grid from '@mui/material/Grid';
import GridComponentMain from '../GridComponentMain';
import Signature from '../Signature';
import Section from './Section';

import { sections } from './sections';

export default function About() {
  return (
    <GridComponentMain page='about' >
      <Signature page='about' />
      <Grid container item xs={12} md={7} p={{xs: '0 3rem 3rem 3rem', md: '0 6rem'}}>
         { sections.map(section => (
           <Section
             key={section.title}
             section={section}
           />
         ))}
      </Grid>
    </GridComponentMain>  
  )
}
