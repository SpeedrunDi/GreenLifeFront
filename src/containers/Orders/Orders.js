import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Redirect} from "react-router-dom";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography
} from "@mui/material";
import {getOrdersRequest} from "../../store/actions/ordersActions";
import {makeStyles} from "tss-react/mui";

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

const Orders = () => {
  const { classes } = useStyles();
  const dispatch = useDispatch()
  const user = useSelector(state => state.users.user)
  const orders = useSelector(state => state.orders.orders)

  useEffect(() => {
    if (user) dispatch(getOrdersRequest())
  }, [dispatch, user])

  if (!user) {
    return <Redirect to="/"/>
  }

  return orders?.length !== 0 ? (
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
          </TableRow>
        </TableHead>
        <TableBody>
          {orders.map(item => (
            <TableRow
              key={item._id}
              sx={{'&:last-child td, &:last-child th': {border: 0}}}
            >
              <TableCell sx={{display: {xs: "none", md: "table-cell"}}}>
                <Typography>
                  {item.clientName}
                </Typography>
              </TableCell>
              <TableCell sx={{display: {xs: "none", md: "table-cell"}}}>
                <Typography>
                  {item.phone}
                </Typography>
              </TableCell>
              <TableCell>
                <Box
                  sx={{display: "flex", flexDirection: "column", justifyContent: "space-around", alignItems: "center"}}>
                  {item.products?.length && item.products.map(product => (
                    <Typography
                      key={product._id?._id}
                      width="100%"
                      display="flex"
                      justifyContent="space-between"
                      borderBottom="solid green 1px"
                    >
                      <Typography variant="span">{product?._id?.title}:</Typography>
                      <Typography variant="span">{product?.count} шт.</Typography>
                    </Typography>
                  ))}
                </Box>
              </TableCell>
              <TableCell align="right">
                <Typography fontSize="20px" variant="span" display="block" width="max-content" marginX="auto">
                  {item.totalPrice}
                  <Typography variant="span" fontWeight="bold"> c</Typography>
                </Typography>
              </TableCell>
            </TableRow>
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
};

export default Orders;