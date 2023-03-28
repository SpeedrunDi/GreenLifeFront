import React from 'react';
import {useDispatch} from "react-redux";
import {Box, TableCell, TableRow, Typography} from "@mui/material";
import {updateStatusRequest} from "../../store/actions/ordersActions";

const OrderHistory = ({order, token, role, status, onCompleteOrder}) => {
  const dispatch = useDispatch()
  let background = null
  let color = "#000"

  if (status === 'all') {
    if (order.status === 1) {
      dispatch(updateStatusRequest({id: order._id, orderStatus: 2, token}))
      background = "#4fb600"
    } else if (order.status === 2) {
      background = "#4fb600"
    } else if (order.status === 3) {
      background = "#da0101"
      color = "#fff"
    }
  }

  return (
    <TableRow
      key={order._id}
      sx={{background: background}}
    >
      <TableCell sx={{display: {xs: "none", md: "table-cell"}}}>
        <Typography color={color} position="relative" width="max-content">
          {
            order.status === 1 &&
            <Typography
              textTransform="uppercase"
              fontSize="9px"
              variant="span"
              position="absolute"
              top="-10px"
              right="-30px"
              sx={{textShadow: "0 0 4px #FF4136, 0 0 8px #FF4136, 0 0 12px #FF4136"}}
            >
              new
            </Typography>
          }
          {order.clientName}
        </Typography>
      </TableCell>
      <TableCell sx={{display: {xs: "none", md: "table-cell"}}}>
        <Typography color={color}>
          {order.phone}
        </Typography>
      </TableCell>
      <TableCell>
        <Box
          sx={{display: "flex", flexDirection: "column", justifyContent: "space-around", alignItems: "center"}}>
          {order.products?.length && order.products.map(product => (
            <Typography
              key={product._id?._id}
              width="100%"
              display="flex"
              justifyContent="space-between"
              borderBottom={`solid ${color} 1px`}
              color={color}
            >
              <Typography variant="span">{product?._id?.title}:</Typography>
              <Typography variant="span">{product?.count} шт.</Typography>
            </Typography>
          ))}
        </Box>
      </TableCell>
      <TableCell>
        <Typography fontSize="20px" variant="span" display="block" width="max-content" marginX="auto" color={color}>
          {order.totalPrice}
          <Typography variant="span" fontWeight="bold"> c</Typography>
        </Typography>
      </TableCell>
      <TableCell sx={{display: {xs: "none", sm: "table-cell"}, textAlign: "center"}}>
        {
          role === 'admin' && order.status !== 3 && (
            <Typography py="5px" sx={{cursor: "pointer"}} onClick={onCompleteOrder}>
              &#10004;
            </Typography>
          )
        }
      </TableCell>
    </TableRow>
  );
};

export default OrderHistory;