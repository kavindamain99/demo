import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Alerts from "../components/Alerts";
import Loader from "../components/Loader";
import { listOrders } from "../actions/orderActions";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Link from "@mui/material/Link";
import { Link as RouterLink } from "react-router-dom";
import Button from "@mui/material/Button";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import ClearIcon from "@mui/icons-material/Clear";
import CheckIcon from "@mui/icons-material/Check";
import Meta from "../components/Meta";
import Pdf from "react-to-pdf";
import TextField from "@mui/material/TextField";

const theme = createTheme({
  palette: {
    dark: {
      main: "#171717",
      contrastText: "#fff",
    },
  },
});
const ref = React.createRef();

const OrderList = ({ history }) => {
  const dispatch = useDispatch();

  const orderList = useSelector((state) => state.orderList);
  const { loading, error, orders } = orderList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const options = {
    orientation: "landscape",
    unit: "in",
    format: [10, 7.5],
  };
  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(listOrders());
    } else {
      history.push("/login");
    }
  }, [dispatch, history, userInfo]);
  const [searchTerm, setSearchTerm] = useState("");
  const [dateTerm, setDateTerm] = useState("");

  const resetHandler = (event) => {
    window.location.reload(false);
  };
  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="md">
        <Typography
          variant="h5"
          sx={{ fontFamily: "Playfair Display", textAlign: "center", my: 2 }}
        >
          <h3>ORDERS</h3>
        </Typography>
        <hr></hr>

        <Meta title="Orders List" />
        <Pdf targetRef={ref} filename="order.pdf" options={options}>
          {({ toPdf }) => (
            <Button color="secondary" variant="contained" onClick={toPdf}>
              Generate Order Report
            </Button>
          )}
        </Pdf>

        <TextField
          className="form-control"
          type="search"
          variant="standard"
          placeholder="Search By Name "
          name="searchForm"
          onChange={(event) => {
            setSearchTerm(event.target.value);
          }}
          style={{ paddingLeft: "50px", paddingRight: "50px" }}
        ></TextField>
        <input
          type="date"
          onChange={(event) => {
            setDateTerm(event.target.value);
          }}
          style={{ height: "24px", marginRight: "50px" }}
        ></input>
        <Button color="primary" variant="contained" onClick={resetHandler}>
          Reset
        </Button>
        {loading ? (
          <Loader />
        ) : error ? (
          <Alerts severity="error" message={error} />
        ) : (
          <TableContainer sx={{ my: 2 }} component={Paper} ref={ref}>
            <Table aria-label="orders table">
              <TableHead style={{ backgroundColor: "#585858" }}>
                <TableRow>
                  <TableCell align="right" style={{ color: "white" }}>
                    User
                  </TableCell>
                  <TableCell align="right" style={{ color: "white" }}>
                    DATE
                  </TableCell>
                  <TableCell align="right" style={{ color: "white" }}>
                    Tax
                  </TableCell>
                  <TableCell align="right" style={{ color: "white" }}>
                    TOTAL
                  </TableCell>
                  {/* <TableCell align="right" color="text.secondary">
                    PAID
                  </TableCell> */}
                  {/* <TableCell align="right" color="text.secondary">
                    DELIVERED
                  </TableCell> */}
                  <TableCell></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {orders
                  .filter((val) => {
                    if (searchTerm === "") {
                      return val;
                    } else if (
                      val.user.name
                        .toLowerCase()
                        .includes(searchTerm.toLowerCase())
                    ) {
                      return val;
                    } else {
                      return null;
                    }
                  })
                  .filter((val2) => {
                    if (dateTerm === "") {
                      return val2;
                    } else if (
                      val2.createdAt.substring(0, 10).includes(dateTerm)
                    ) {
                      return val2;
                    } else {
                      return null;
                    }
                  })
                  .map((order) => (
                    <TableRow
                      key={order._id}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell align="right">
                        {order.user && order.user.name}
                      </TableCell>
                      <TableCell
                        align="right"
                        title={order.createdAt.substring(0, 10)}
                      >
                        {order.createdAt.substring(0, 10)}
                      </TableCell>

                      <TableCell align="right">{order.taxPrice}</TableCell>
                      <TableCell align="right">{order.totalPrice}</TableCell>

                      {/* <TableCell align="right">
                      {order.isPaid ? (
                        <CheckIcon color="success" />
                      ) : (
                        <ClearIcon color="error" />
                      )}
                    </TableCell> */}
                      {/* <TableCell align="right">
                      {order.isDelivered ? (
                        <CheckIcon color="success" />
                      ) : (
                        <ClearIcon color="error" />
                      )}
                    </TableCell> */}
                      <TableCell align="right">
                        <Link
                          component={RouterLink}
                          underline="none"
                          to={`/order/${order._id}`}
                          sx={{
                            display: "block",
                          }}
                        >
                          <Button
                            variant="contained"
                            sx={{
                              ml: "auto",
                              display: "block",
                            }}
                            size="small"
                            color="dark"
                          >
                            Details
                          </Button>
                        </Link>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Container>
    </ThemeProvider>
  );
};

export default OrderList;
