
import Grid from "@mui/material/Grid";

const headerStyles = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  fontSize: '0.85rem',
  width: '100%',
  height: '110px',
  zIndex: '2',
  fontFamily: 'var(--font-mono)',
}

export default function Header() {
  return (
    <Grid container item xs={12} sx={headerStyles} p={{xs: '6rem 0 0 0', md: '6rem 6rem 0 6rem'}}>
      <Grid item xs={1} md={9}></Grid>
      <Grid container item xs={11} md={3}>
          <Grid item xs={3}><a href="/">Home</a></Grid>
          <Grid item xs={3}><a href="/about">About</a></Grid>
          <Grid item xs={3}><a href="/portfolio">Portfolio</a></Grid>
          <Grid item xs={3}><a href="/blog">Blog</a></Grid>
      </Grid>
    </Grid>
  )
}
