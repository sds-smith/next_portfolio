
import Grid from "@mui/material/Grid";

const mainStyles = {
    display: 'flex',
    flexDirection: 'column',
    minHeight: 'calc(100vh - 110px)',
  }

const align = {
    home: 'center',
    about: 'flex-start',
    portfolio: 'flex-start',
    blog: 'flex-start'
}

const justify = {
  home: 'space-between',
  about: 'flex-start',
  portfolio: 'flex-start',
  blog: 'flex-start'
}

export default function GridComponentMain({page, children}) {
  return (
    <Grid 
      container 
      component="main" 
      sx={mainStyles} 
      p={{xs: '3rem 0 0 0 ', md: '6rem'}} 
      alignItems={{xs: 'center', md: align[page]}} 
      justifyContent={{xs: 'flex-start', md: justify[page]}} 
    >
      { children }
    </Grid>
  );
}