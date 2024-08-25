
import Grid from "@mui/material/Grid";

const md = {
    home: [12, 0],
    about: [2, 10],
    portfolio: [2, 10],
    blog: [2, 10],
}

export default function Signature({page}) {
    return (
        <>
            <Grid item xs={12} md={md[page][0]} textAlign="center" m={{xs: '3rem 0 4rem 0', md: '0'}} >
                <h1>Shawn Smith</h1>
                <h2>Software Engineer</h2>
            </Grid>
            <Grid md={md[page][1]}></Grid>
        </>
    )
}