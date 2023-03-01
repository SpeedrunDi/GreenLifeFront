import React from 'react';
import {
  Box,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography
} from "@mui/material";
import ClearIcon from '@mui/icons-material/Clear';
import {useDispatch, useSelector} from "react-redux";
import {makeStyles} from "tss-react/mui";
import {countProduct, deleteProduct} from "../../store/actions/usersActions";
import {apiUrl} from "../../config";
import Order from "../../components/Order/Order";
import imageNotAvailable from "../../assets/image-not-available.jpg";
import {createOrderRequest} from "../../store/actions/ordersActions";

const useStyles = makeStyles()(() => ({
  title: {
    fontSize: "26px"
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

const Basket = () => {
  const { classes } = useStyles();
  const dispatch = useDispatch()
  const basket = useSelector(state => state.users.basket)
  let total = 0

  const onDeleteProduct = _id => {
    const newBasket = basket.filter(product => product._id !== _id)

    dispatch(deleteProduct(newBasket))
  }

  const onCountProduct = (value, id) => {
    const newBasket = basket.map(product => {
      if (product._id === id && value === 'plus') {
        return {...product, count: product.count + 1}
      }

      if (product._id === id && value === 'minus') {
        return {...product, count: product.count - 1}
      }

      return product
    })

    dispatch(countProduct(newBasket))
  }

  const sendOrder = (data) => {
    const orderData = {products: basket, ...data}

    dispatch(createOrderRequest(orderData))
  }

  if (basket?.length) {
    basket.forEach(item => {
      total += item?.price * item?.count
    })
  }

  return basket?.length ? (
    <>
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
              <TableCell className={classes.title}>Фото</TableCell>
              <TableCell className={classes.title}>Название</TableCell>
              <TableCell className={classes.title} align="right" sx={{width: "180px"}}>Количество</TableCell>
              <TableCell className={classes.title} align="right">Цена</TableCell>
              <TableCell align="right"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {basket.map(item => (
              <TableRow
                key={item._id}
                sx={{'&:last-child td, &:last-child th': {border: 0}}}
              >
                <TableCell component="th" scope="row" sx={{padding: "10px 0 10px 20px"}}>
                  <img src={item.image ? apiUrl + '/' + item.image : imageNotAvailable} alt={item.title} style={{width: "80px", height: "80px"}}/>
                </TableCell>
                <TableCell>
                  <Typography className={classes.productTitle}>
                    {item.title}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Box sx={{display: "flex", justifyContent: "space-around", alignItems: "center"}}>
                    <Typography
                      variant="span"
                      value="minus"
                      className={classes.count}
                      onClick={() => onCountProduct('minus', item._id)}
                    >-</Typography>
                    <Typography variant="span" fontSize="20px">{item.count}</Typography>
                    <Typography
                      variant="span"
                      value="plus"
                      className={classes.count}
                      onClick={() => onCountProduct('plus', item._id)}
                    >+</Typography>
                  </Box>
                </TableCell>
                <TableCell align="right">
                  <Typography fontSize="20px">
                    {item.price}
                    <Typography variant="span" fontWeight="bold"> c</Typography>
                  </Typography>
                </TableCell>
                <TableCell align="right">
                  <IconButton onClick={() => onDeleteProduct(item._id)}>
                    <ClearIcon/>
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Order totalPrice={total} onSendOrder={sendOrder}/>
    </>
  ) : <Typography fontSize="40px" textAlign="center">Карзинка пуста</Typography>;
};

export default Basket;