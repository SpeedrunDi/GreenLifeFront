import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Redirect} from "react-router-dom";
import {
  Box, FormControl, InputLabel, MenuItem, Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography
} from "@mui/material";
import {getOrdersRequest, updateStatusRequest} from "../../store/actions/ordersActions";
import {makeStyles} from "tss-react/mui";
import OrderHistory from "../../components/OrderHistory/OrderHistory";

const useStyles = makeStyles()(() => ({
  title: {
    fontSize: "24px"
  },
  productTitle: {
    fontSize: "20px",
  },
  count: {
    cursor: "pointer",
    fontSize: "30px",
    margin: "0 auto",
    "&:hover": {
      color: "red",
      transform: "scale(1.5)"
    }
  }
}));

const OrdersHistory = () => {
  const {classes} = useStyles();
  const dispatch = useDispatch()
  const user = useSelector(state => state.users.user)
  const orders = useSelector(state => state.orders.orders)
  const [state, setState] = useState('active')

  useEffect(() => {
    if (user) dispatch(getOrdersRequest({token: user.token, status: state}))
  }, [dispatch, user, state])

  const handleChange = (e) => {
    setState(e.target.value);
  };

  const completeOrder = id => {
    dispatch(updateStatusRequest({id, orderStatus: 3, token: user.token}))
  }

  if (!user) {
    return <Redirect to="/"/>
  }

  return (
    <>
      <Box width="max-content" marginLeft="auto">
        <FormControl sx={{minWidth: 80, m: 1}}>
          <InputLabel id="select-label">Статус</InputLabel>
          <Select
            labelId="select-label"
            id="select"
            value={state}
            onChange={handleChange}
            autoWidth
            label="Статус"
          >
            <MenuItem value="all">Все</MenuItem>
            <MenuItem value="active">Открытые</MenuItem>
            <MenuItem value="closed">Закрытые</MenuItem>
          </Select>
        </FormControl>
      </Box>
      {
        orders?.length !== 0 ? (
          <TableContainer
            sx={{
              marginBottom: "60px",
              border: "solid 2px #eee",
              boxShadow: "10px 10px 40px rgba(0, 0, 0, 0.4)"
            }}
          >
            <Table sx={{minWidth: {xs: "300px", sm: "500px"}}} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell className={classes.title} sx={{display: {xs: "none", md: "table-cell"}}}>Имя
                    клиента</TableCell>
                  <TableCell className={classes.title} sx={{width: "250px", display: {xs: "none", md: "table-cell"}}}>Номер
                    телефона</TableCell>
                  <TableCell className={classes.title}>Товары</TableCell>
                  <TableCell className={classes.title} sx={{textAlign: "center"}}>Общая стоимость</TableCell>
                  {
                    user.role === 'admin' && state !== 'closed' && (
                      <TableCell sx={{display: {xs: "none", sm: "table-cell"}, textAlign: "center"}}>
                        <Typography fontSize="20px">
                          &#9745;
                        </Typography>
                      </TableCell>
                    )
                  }
                </TableRow>
              </TableHead>
              <TableBody>
                {orders.map(order => (
                  <OrderHistory
                    key={order._id}
                    order={order}
                    token={user.token}
                    role={user.role}
                    status={state}
                    onCompleteOrder={() => completeOrder(order._id)}
                  />
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        ) : (
          <Typography
            fontSize="40px"
            textAlign="center"
          >
            История заказов нету
          </Typography>
        )
      }
    </>
  )
};

export default OrdersHistory;