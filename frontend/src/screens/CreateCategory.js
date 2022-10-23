import React, { useState, useEffect } from "react";
import Box from "@mui/system/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Alerts from "../components/Alerts";
import Button from "@mui/material/Button";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader";
import { createCategory } from "../actions/categoryActions";
import { CATEGORY_CREATE_RESET } from "../constants/categoryConstants";
import Container from "@mui/material/Container";
import Meta from "../components/Meta";

const theme = createTheme({
  palette: {
    primary: {
      main: "#171717",
      contrastText: "#fff",
    },
  },
});

const CreateCategory = ({ history }) => {
  const [name, setName] = useState("");

  const dispatch = useDispatch();
  const categoryCreate = useSelector((state) => state.categoryCreate);
  const { loading, error, success } = categoryCreate;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (!userInfo || !userInfo.isAdmin) {
      history.push("/login");
    }
    if (success) {
      dispatch({ type: CATEGORY_CREATE_RESET });
      history.push("/admin/categorylist");
    }
  }, [history, userInfo, dispatch, success]);

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(createCategory(name));
  };

  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="xs">
        <Typography
          variant="h5"
          sx={{ textAlign: "center", my: 2, fontFamily: "Playfair Display" }}
        >
          NEW CATEGORY
          <hr></hr>
        </Typography>

        <Meta title="Create Category" />

        {loading && <Loader />}

        <Box component="form" onSubmit={handleSubmit}>
          <TextField
            id="category-name-input"
            onChange={(e) => setName(e.target.value)}
            value={name}
            label="Category Name"
            type="name"
            sx={{ mb: 2 }}
            fullWidth
            autoFocus
            required
          />

          {error && <Alerts severity="error" message={error} />}
          <Button
            variant="contained"
            sx={{
              display: "flex",
              mx: "auto",
              mt: 2,
            }}
            type="submit"
            disabled={!name}
          >
            Create
          </Button>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default CreateCategory;
