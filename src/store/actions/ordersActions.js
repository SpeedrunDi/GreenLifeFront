import ordersSlices from "../slices/ordersSlices";

export const {
  createOrderRequest,
  createOrderSuccess,
  createOrderFailure,
  getOrdersRequest,
  getOrdersSuccess,
  getOrdersFailure,
  updateStatusRequest,
  updateStatusSuccess,
  updateStatusFailure
} = ordersSlices.actions