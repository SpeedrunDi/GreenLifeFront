import React, {useState} from 'react';
import {Box, Button, Typography} from "@mui/material";
import {makeStyles} from "tss-react/mui";
import Grid from "@mui/material/Grid";
import FormElement from "../UI/Form/FormElement/FormElement";
import {useSelector} from "react-redux";

const useStyles = makeStyles()(() => ({
  orderBlock: {
    padding: "30px",
    background: "#ffffff",
    boxShadow: "20px 20px 80px rgba(0, 0, 0, 0.4)",
    borderRadius: "5px",
    border: "solid 2px #eee",
    textAlign: "center"
  },
  title: {
    fontSize: "32px",
    marginBottom: "20px"
  }
}));

const Order = ({totalPrice, onSendOrder}) => {
  const {classes} = useStyles();
  const loading = useSelector(state => state.orders.loading)
  const [userData, setUserData] = useState({
    name: '',
    phone: ''
  })

  const inputChangeHandler = (e) => {
    const {name, value} = e.target
    setUserData(prev => ({...prev, [name]: value}))
  }

  const getDataOrder = (e) => {
    e.preventDefault()

    onSendOrder({name: userData.name, phone: userData.phone, totalPrice})

    setUserData({
      name: '',
      phone: ''
    })
  }

  return (
    <Box component="form" className={classes.orderBlock} onSubmit={getDataOrder} sx={{mt: 1}}>
      <Grid container spacing={2}>
        <FormElement onChange={inputChangeHandler}
                     value={userData.name}
                     name="name"
                     label="Ваше Имя"
                     required
                     type="text"
        />
        <FormElement onChange={inputChangeHandler}
                     value={userData.phone}
                     name="phone"
                     label="Ваш номер телефона для связи"
                     required
                     type="tel"
        />
      </Grid>
      <Typography className={classes.title}>Стоимость заказа: {totalPrice} с</Typography>
      <Box style={{textAlign: "center"}}>
        <Button type="submit" variant="outlined" disabled={loading}>Подтвердить заказ</Button>
      </Box>
    </Box>
  );
};

export default Order;