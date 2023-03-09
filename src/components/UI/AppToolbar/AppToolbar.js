import React from 'react';
import {Link} from "react-router-dom";
import {useSelector} from "react-redux";
import {makeStyles} from "tss-react/mui";
import {AppBar, Box, CircularProgress, Grid, Toolbar, Typography} from "@mui/material";
import Anonymous from "./Menu/Anonymous";
import UserMenu from "./Menu/UserMenu";
import BasketIcon from "./BasketIcon/BasketIcon";


const useStyles = makeStyles()(theme => ({
  appBar: {
    background: "green",
    zIndex: "20",
  },
  mainLink: {
    fontFamily: 'Life Savers',
    fontSize: '40px',
    color: 'inherit',
    textDecoration: 'none',
    '&:hover': {
      color: 'inherit'
    },
    [theme.breakpoints.down(550)]: {
      fontSize: "24px"
    }
  },
  staticToolbar: {
    marginBottom: theme.spacing(2)
  },
  link: {
    fontFamily: 'Life Savers',
    color: 'white',
    '&:hover': {
      color: '#71ff25'
    },
  }
}));

const AppToolbar = () => {
  const { classes } = useStyles();
  const user = useSelector(state => state.users.user);
  const loading = useSelector(state => state.users.loading);

  return (
    <>
     <AppBar className={classes.appBar} position="fixed">
       <Toolbar>
         <Grid container justifyContent="space-between" alignItems="center" maxWidth="lg" marginX="auto">
           <Grid item>
             <Typography variant="h6">
               <Link to="/" className={classes.mainLink}>
                 Green Life
               </Link>
             </Typography>
           </Grid>

           <Grid item display="flex" alignItems="center">
             <BasketIcon/>
             {loading ? (
               <Box pt="2px">
                 <CircularProgress size={30} color="inherit"/>
               </Box>
             ) : (
               user ? <UserMenu user={user} link={classes.link}/> : <Anonymous link={classes.link}/>
             )}
           </Grid>
         </Grid>
       </Toolbar>
     </AppBar>
     <Toolbar className={classes.staticToolbar}/>
    </>
  );
};

export default AppToolbar;