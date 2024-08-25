
import Grid from "@mui/material/Grid";
import GridComponentMain from "./GridComponentMain";
import Signature from "./Signature";
import Contact from "./contact";

export default function Home() {
  return (
    <GridComponentMain page='home' >
      <Grid item xs={12}></Grid>
      <Signature page='home' />
      <Grid item xs={12}></Grid>
      <Contact />
    </GridComponentMain>
  );
}
