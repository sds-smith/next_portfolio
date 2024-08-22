import React from 'react'
import Header from '../header';
import styles from "./page.module.css";

export default function Blog() {
  return (
    <main className={styles.main}>
      <Header />
      <div style={{minHeight: 'inherit', paddingTop: '6rem'}}>
        <h3>Blog currently under construction. Check back soon...</h3>
      </div>
    </main>  
  )  
}
