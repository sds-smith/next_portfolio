import React from 'react'
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import styles from "../page.module.css";

export default function Section({section}) {
  return (
    <Grid container item xs={12} spacing={3} component='section' className={styles.section} >
      <Grid item xs={12}>
        <Typography className={styles.section_title} variant='h5'>{section.title}</Typography>
      </Grid>
     {section.copy.map(p => (
      <Grid item xs={12} key={p}>
        <Typography className={styles.section_paragraph}>{p}</Typography>
      </Grid>
    ))}
    </Grid>
  )
}
