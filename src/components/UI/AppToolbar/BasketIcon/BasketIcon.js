import React from 'react';
import {Box, Typography} from "@mui/material";
import {Link} from "react-router-dom";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import {useSelector} from "react-redux";
import {makeStyles} from "tss-react/mui";

const useStyles = makeStyles()(() => ({
  basket: {
    '&:hover': {
      color: '#71ff25'
    },
  }
}));

const BasketIcon = () => {
  const {classes} = useStyles();
  const basket = useSelector(state => state.users.basket)

  return (
    <Box sx={{margin: "6px 30px 0", color: "inherit", position: "relative"}} component={Link} to="/basket">
      <ShoppingBasketIcon className={classes.basket} sx={{fontSize: "35px"}}/>
      {basket?.length !== 0 && (
        <Typography
          variant="span"
          fontWeight="700"
          fontSize="14px"
          bgcolor="red"
          position="absolute"
          top="20px"
          right="-10px"
          color="white"
          padding="3px 7px"
          lineHeight="1"
          borderRadius="50%"
          border="solid 2px white"
        >
          {basket.length}
        </Typography>
      )}
    </Box>
  );
};

export default BasketIcon;