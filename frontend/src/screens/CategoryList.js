import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Alerts from "../components/Alerts";
import Loader from "../components/Loader";
import { listCategories, deleteCategory } from "../actions/categoryActions";
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

const theme = createTheme({
  palette: {
    dark: {
      main: "#171717",
      contrastText: "#fff",
    },
  },
});
const CategoryList = ({ history, match }) => {
  const dispatch = useDispatch();

  const categoryList = useSelector((state) => state.categoryList);
  const { loading, error, categories } = categoryList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const categoryDelete = useSelector((state) => state.categoryDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = categoryDelete;

  useEffect(() => {
    if (!userInfo || !userInfo.isAdmin) {
      history.push("/login");
    } else {
      dispatch(listCategories());
    }
  }, [dispatch, history, userInfo, successDelete]);

  const deleteHandler = (id) => {
    if (window.confirm("Are you sure")) {
      dispatch(deleteCategory(id));
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="md">
        <Typography
          variant="h5"
          sx={{ fontFamily: "Playfair Display", textAlign: "center", my: 2 }}
        >
          <h3>CATEGORIES</h3>
          <hr></hr>
        </Typography>

        <Meta title="Categories List" />

        <Link
          component={RouterLink}
          underline="none"
          to={`/admin/category/create`}
        >
          <Button
            sx={{ mb: 2, ml: "auto", display: "flex" }}
            variant="contained"
            color="dark"
          >
            + NEW CATEGORY
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
            <TableContainer sx={{ my: 2 }} component={Paper}>
              <Table aria-label="products table">
                <TableHead style={{ backgroundColor: "#585858" }}>
                  <TableRow>
                    <TableCell align="right" style={{ color: "white" }}>
                      NAME
                    </TableCell>
                    <TableCell></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {categories.map((category) => (
                    <TableRow
                      key={category._id}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell align="right">{category.name}</TableCell>
                      <TableCell align="right">
                        <Link
                          component={RouterLink}
                          underline="none"
                          to={`/admin/category/${category._id}/edit`}
                        >
                          <Button size="small">
                            <AppRegistrationIcon />
                          </Button>
                        </Link>
                        <Button
                          aria-label="delete category"
                          onClick={() => deleteHandler(category._id)}
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
          </>
        )}
      </Container>
    </ThemeProvider>
  );
};

export default CategoryList;
