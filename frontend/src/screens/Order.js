import React, { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { PayPalButton } from "react-paypal-button-v2";
import Alerts from "../components/Alerts";
import Loader from "../components/Loader";
import {
  getOrderDetails,
  payOrder,
  deliverOrder,
} from "../actions/orderActions";
import {
  ORDER_PAY_RESET,
  ORDER_DELIVER_RESET,
} from "../constants/orderConstants";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Container from "@mui/material/Container";
import Divider from "@mui/material/Divider";
import Link from "@mui/material/Link";
import { Link as RouterLink } from "react-router-dom";
import Box from "@mui/system/Box";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Meta from "../components/Meta";

const theme = createTheme({
  palette: {
    primary: {
      main: "#171717",
    },
  },
});

const Order = ({ match, history }) => {
  const orderId = match.params.id;

  const [sdkReady, setSdkReady] = useState(false);

  const dispatch = useDispatch();

  const orderDetails = useSelector((state) => state.orderDetails);
  const { order, loading, error } = orderDetails;

  const orderPay = useSelector((state) => state.orderPay);
  const { loading: loadingPay, success: successPay } = orderPay;

  const orderDeliver = useSelector((state) => state.orderDeliver);
  const { loading: loadingDeliver, success: successDeliver } = orderDeliver;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  if (!loading) {
    //   Calculate prices
    const addDecimals = (num) => {
      return (Math.round(num * 100) / 100).toFixed(2);
    };

    order.itemsPrice = addDecimals(
      order.orderItems.reduce((acc, item) => acc + item.price * item.qty, 0)
    );
  }

  useEffect(() => {
    if (!userInfo) {
      history.push("/login");
    }

    const addPayPalScript = async () => {
      const { data: clientId } = await axios.get("/api/config/paypal");
      const script = document.createElement("script");
      script.type = "text/javascript";
      script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`;
      script.async = true;
      script.onload = () => {
        setSdkReady(true);
      };
      document.body.appendChild(script);
    };

    if (!order || successPay || successDeliver || order._id !== orderId) {
      dispatch({ type: ORDER_PAY_RESET });
      dispatch({ type: ORDER_DELIVER_RESET });
      dispatch(getOrderDetails(orderId));
    } else if (!order.isPaid) {
      if (!window.paypal) {
        addPayPalScript();
      } else {
        setSdkReady(true);
      }
    }
  }, [dispatch, orderId, successPay, successDeliver, order, userInfo, history]);

  const successPaymentHandler = (paymentResult) => {
    console.log(paymentResult);
    dispatch(payOrder(orderId, paymentResult));
  };

  const deliverHandler = () => {
    dispatch(deliverOrder(order));
  };

  return loading ? (
    <Loader />
  ) : error ? (
    <Alerts severity="error" message={error} />
  ) : (
    <ThemeProvider theme={theme}>
      <Typography
        variant="h6"
        color="text.secondary"
        sx={{ textTransform: "uppercase", textAlign: "center", my: 2 }}
      >
        Order {order._id}
      </Typography>

      <Meta title={`Order ${order._id}`} />

      <Grid container>
        <Grid item xs={12} sm={12} md={8}>
          <Container maxWidth="sm">
            <Typography variant="h6" sx={{ fontFamily: "Playfair Display" }}>
              SHIPPING DETAILS
            </Typography>
            <Typography variant="body2" my={1}>
              Name: {order.user.name}
            </Typography>
            <Typography variant="body2" my={1}>
              Email:{" "}
              <a
                style={{
                  textDecoration: "none",
                  color: "black",
                  fontWeight: "bold",
                }}
                href={`mailto:${order.user.email}`}
              >
                {order.user.email}
              </a>
            </Typography>
            <Typography variant="body2" my={1}>
              Address: {order.shippingAddress.address},{" "}
              {order.shippingAddress.city} {order.shippingAddress.postalCode},{" "}
              {order.shippingAddress.country}
            </Typography>
            {/* {order.isDelivered ? (
              <Alerts
                severity="success"
                message={`Delivered on ${order.deliveredAt}`}
              />
            ) : (
              <Alerts severity="error" message="Not Delivered" />
            )}
            <Divider sx={{ my: 2 }} /> */}
            {/* <Typography variant="h6" sx={{ fontFamily: "Playfair Display" }}>
              PAYMENT METHOD
            </Typography>
            <Typography variant="body2" my={1}>
              Method: {order.paymentMethod}
            </Typography> */}
            {/* {order.isPaid ? (
              <Alerts Severity="success" message={`Paid on ${order.paidAt}`} />
            ) : (
              <Alerts severity="error" message="Not Paid" />
            )} */}
            <Divider sx={{ my: 2 }} />
            <Typography variant="h6" sx={{ fontFamily: "Playfair Display" }}>
              ORDER ITEMS
            </Typography>
            {order.orderItems.length === 0 ? (
              <Alerts severity="info" message="Order is Empty" />
            ) : (
              order.orderItems.map((item, index) => (
                <div key={index}>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      my: 2,
                    }}
                  >
                    <Box
                      component="img"
                      src={item.image}
                      alt={item.name}
                      title={item.name}
                      sx={{
                        maxHeight: "30px",
                        maxWidth: "30px",
                        mr: 1,
                      }}
                    ></Box>
                    <Link
                      underline="none"
                      component={RouterLink}
                      to={`/product/${item.product}`}
                      variant="body2"
                      sx={{
                        color: "#171717",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                        mr: "auto",
                        width: { xs: "70px", sm: "150px", md: "200px" },
                      }}
                      title={item.name}
                    >
                      {item.name}
                    </Link>
                    <Typography variant="body2" sx={{ color: "#171717" }}>
                      {item.qty} x ${item.price} = ${item.qty * item.price}
                    </Typography>
                  </Box>
                </div>
              ))
            )}
            <Divider />
          </Container>
        </Grid>
        <Grid item xs={12} sm={12} md={4}>
          <Container maxWidth="sm">
            {order.orderItems.length !== 0 && (
              <Paper sx={{ p: 1, mb: 1 }}>
                <Typography
                  variant="h6"
                  sx={{ fontFamily: "Playfair Display", mb: 1 }}
                >
                  ORDER SUMMARY
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    my: 1,
                  }}
                >
                  <Typography variant="body2">Items:</Typography>
                  <Typography variant="body2">${order.itemsPrice}</Typography>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    my: 1,
                  }}
                >
                  <Typography variant="body2">Shipping:</Typography>
                  <Typography variant="body2">
                    ${order.shippingPrice}
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    my: 1,
                  }}
                >
                  <Typography variant="body2">Tax:</Typography>
                  <Typography variant="body2">${order.taxPrice}</Typography>
                </Box>
                <Divider />
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    my: 1,
                  }}
                >
                  <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                    Total:
                  </Typography>
                  <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                    ${order.totalPrice}
                  </Typography>
                </Box>
              </Paper>
            )}
            {/* {!order.isPaid && (
              <>
                {loadingPay && <Loader />}
                {!sdkReady ? (
                  <Loader />
                ) : (
                  <PayPalButton
                    amount={order.totalPrice}
                    onSuccess={successPaymentHandler}
                  />
                )}
              </>
            )}

            {loadingDeliver && <Loader />}
            {userInfo &&
              userInfo.isAdmin &&
              order.isPaid &&
              !order.isDelivered && (
                <>
                  <Button
                    variant="contained"
                    type="button"
                    sx={{
                      display: "flex",
                      mx: "auto",
                      my: 2,
                    }}
                    onClick={deliverHandler}
                  >
                    Mark As Delivered
                  </Button>
                </>
              )} */}
          </Container>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
};

export default Order;
