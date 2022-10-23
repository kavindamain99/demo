import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Alerts from "../components/Alerts";
import Loader from "../components/Loader";
import PaginationBar from "../components/PaginationBar";
import { listProducts, deleteProduct } from "../actions/productActions";
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
import DeleteIcon from "@mui/icons-material/Delete";
import AppRegistrationIcon from "@mui/icons-material/AppRegistration";
import { createTheme, ThemeProvider } from "@mui/material/styles";
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

const ProductList = ({ history, match }) => {
  const pageNumber = match.params.pageNumber || 1;

  const dispatch = useDispatch();

  const productList = useSelector((state) => state.productList);
  const { loading, error, products, page, pages } = productList;

  const productDelete = useSelector((state) => state.productDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = productDelete;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (!userInfo || !userInfo.isAdmin) {
      history.push("/login");
    } else {
      dispatch(listProducts("", pageNumber));
    }
  }, [dispatch, history, userInfo, successDelete, pageNumber]);

  const deleteHandler = (id) => {
    if (window.confirm("Are you sure")) {
      dispatch(deleteProduct(id));
    }
  };
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="md">
        <Typography
          variant="h5"
          sx={{ fontFamily: "Playfair Display", textAlign: "center", my: 2 }}
        >
          <h3>PRODUCTS</h3>
        </Typography>
        <hr></hr>
        <Meta title="Products List" />
        <Pdf targetRef={ref} filename="product.pdf">
          {({ toPdf }) => (
            <Button color="secondary" variant="contained" onClick={toPdf}>
              Generate Product Report
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
          style={{ paddingLeft: "20px" }}
        ></TextField>
        <Link
          component={RouterLink}
          underline="none"
          to={`/admin/product/create`}
        >
          <Button
            sx={{ mb: 2, ml: "auto", display: "flex" }}
            variant="contained"
            color="dark"
          >
            + NEW PRODUCT
          </Button>
        </Link>
        {loadingDelete && <Loader />}
        {errorDelete && <Alerts severity="error" message={errorDelete} />}

        {loading ? (
          <Loader />
        ) : error ? (
          <Alerts severity="error" message={error} />
        ) : (
          <>
            <TableContainer sx={{ my: 2 }} component={Paper} ref={ref}>
              <Table aria-label="products table">
                <TableHead style={{ backgroundColor: "#585858" }}>
                  <TableRow style={{ height: "50%" }}>
                    <TableCell align="right" style={{ color: "white" }}>
                      NAME
                    </TableCell>
                    <TableCell align="right" style={{ color: "white" }}>
                      PRICE
                    </TableCell>
                    <TableCell align="right" style={{ color: "white" }}>
                      CATEGORY
                    </TableCell>
                    <TableCell></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {products
                    .filter((val) => {
                      if (searchTerm === "") {
                        return val;
                      } else if (
                        val.name
                          .toLowerCase()
                          .includes(searchTerm.toLowerCase())
                      ) {
                        return val;
                      } else {
                        return null;
                      }
                    })
                    .map((product) => (
                      <TableRow
                        key={product._id}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableCell
                          align="right"
                          sx={{
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap",
                            maxWidth: {
                              xs: "25px",
                              sm: "25px",
                              md: "150px",
                              lg: "200px",
                            },
                          }}
                        >
                          {product.name}
                        </TableCell>
                        <TableCell align="right">${product.price}</TableCell>
                        <TableCell align="right">
                          {product.category && product.category.name}
                        </TableCell>

                        <TableCell align="right">
                          <Link
                            component={RouterLink}
                            underline="none"
                            to={`/admin/product/${product._id}/edit`}
                          >
                            <Button size="small">
                              <AppRegistrationIcon />
                            </Button>
                          </Link>
                          <Button
                            aria-label="delete product"
                            onClick={() => deleteHandler(product._id)}
                            color="error"
                            size="small"
                          >
                            <DeleteIcon />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </TableContainer>
            <PaginationBar pages={pages} page={page} isAdmin={true} />
          </>
        )}
      </Container>
    </ThemeProvider>
  );
};

export default ProductList;
