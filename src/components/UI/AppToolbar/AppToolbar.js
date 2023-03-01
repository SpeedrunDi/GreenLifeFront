import React from 'react';
import {Link} from "react-router-dom";
import {useSelector} from "react-redux";
import {makeStyles} from "tss-react/mui";
import {AppBar, Box, Grid, Toolbar, Typography} from "@mui/material";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import Anonymous from "./Menu/Anonymous";
import UserMenu from "./Menu/UserMenu";


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
  },
  staticToolbar: {
    marginBottom: theme.spacing(2)
  },
}));

const AppToolbar = () => {
  const { classes } = useStyles();
  const user = useSelector(state => state.users.user);

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

           <Grid item display="flex">
             <Box sx={{margin: "6px 30px 0", color: "inherit"}} component={Link} to="/basket">
               <ShoppingBasketIcon/>
             </Box>
             {user ? <UserMenu user={user}/> : <Anonymous/>}
           </Grid>
         </Grid>
       </Toolbar>
     </AppBar>
     <Toolbar className={classes.staticToolbar}/>
    </>
  );
};

export default AppToolbar;