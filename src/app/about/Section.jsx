import React from 'react'
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import styles from "../page.module.css";

export default function Section({section}) {
  return (
    <Container component='section' className={styles.section} >
     <Typography className={styles.section_title} variant='h5'>{section.title}</Typography>
     {section.copy.map(p => <Typography className={styles.section_paragraph} key={p}>{p}</Typography>)}
    </Container>
  )
}
