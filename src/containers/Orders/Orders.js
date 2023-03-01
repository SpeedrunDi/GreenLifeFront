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
    dispatch(getOrdersRequest())
  }, [dispatch])

  if (user && user.role !== 'admin') {
    return <Redirect to="/"/>
  }

  return orders?.length && (
    <TableContainer
      sx={{
        marginBottom: "60px",
        border: "solid 2px #eee",
        boxShadow: "10px 10px 40px rgba(0, 0, 0, 0.4)"
      }}
    >
      <Table sx={{minWidth: 650}} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell className={classes.title}>Имя клиента</TableCell>
            <TableCell className={classes.title} sx={{width: "250px"}}>Номер телефона</TableCell>
            <TableCell className={classes.title} sx={{minWidth: "250px"}} >Товары</TableCell>
            <TableCell className={classes.title}>Общая стоимость</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {orders.map(item => (
            <TableRow
              key={item._id}
              sx={{'&:last-child td, &:last-child th': {border: 0}}}
            >
              <TableCell>
                <Typography>
                  {item.clientName}
                </Typography>
              </TableCell>
              <TableCell>
                <Typography>
                  {item.phone}
                </Typography>
              </TableCell>
              <TableCell>
                <Box sx={{display: "flex", flexDirection: "column", justifyContent: "space-around", alignItems: "center"}}>
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
  );
};

export default Orders;