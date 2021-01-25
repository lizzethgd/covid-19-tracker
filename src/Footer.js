//import { AppBar, Toolbar, Container, Typography} from "@material-ui/core";
import React from 'react';
import { AppBar, Toolbar, Typography, Container} from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    appBar: {
      top: 'auto',
      bottom: 0,
      alignItems: 'center',
    }
  }));

const Footer = () =>{
    const classes = useStyles();
    return (
        <AppBar position="fixed" color="primary" className={classes.appBar}>
        <Toolbar>
      <h3>© 2021 LizzethGD</h3>
        </Toolbar>
      </AppBar>


)
}


export default Footer

{/* 
    <AppBar position="sticky">
        <Toolbar>Lizzeth</Toolbar>
      </AppBar>
    
    <AppBar position="static" color="primary">
<Container maxWidth="md">
  <Toolbar>
    <Typography variant="body1" color="inherit">
      © 2021 LizzethGD
    </Typography>
  </Toolbar>
</Container>
</AppBar> */}