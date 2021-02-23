import React from 'react';
import { AppBar, Toolbar} from "@material-ui/core";
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
