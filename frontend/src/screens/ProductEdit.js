import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Alerts from "../components/Alerts";
import Loader from "../components/Loader";
import { listProductDetails, updateProduct } from "../actions/productActions";
import { PRODUCT_UPDATE_RESET } from "../constants/productConstants";
import FileBase from "react-file-base64";
import Box from "@mui/system/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Button from "@mui/material/Button";
import { listCategories } from "../actions/categoryActions";
import Meta from "../components/Meta";
const theme = createTheme({
  palette: {
    primary: {
      main: "#171717",
    },
  },
});

const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: 225,
    },
  },
};

const ProductEdit = ({ match, history }) => {
  const productId = match.params.id;
  const [negativeError, setNegativeError] = useState(false);
  const [negativeErrorprice, negativeErrorsetPrice] = useState(false);

  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState("");
  const [category, setCategory] = useState("");
  const [countInStock, setCountInStock] = useState(0);
  const [description, setDescription] = useState("");
  const [imageError, setImageError] = useState(false);

  const dispatch = useDispatch();

  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;

  const categoryList = useSelector((state) => state.categoryList);
  const {
    loading: loadingCategories,
    success: successCategories,
    error: errorCategories,
    categories,
  } = categoryList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const productUpdate = useSelector((state) => state.productUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = productUpdate;

  useEffect(() => {
    if (!userInfo || !userInfo.isAdmin) {
      history.push("/login");
    } else if (successUpdate) {
      dispatch({ type: PRODUCT_UPDATE_RESET });
      history.push("/admin/productlist");
    } else if (!product.name || product._id !== productId) {
      dispatch(listProductDetails(productId));
    } else if (!loadingCategories && !successCategories && !errorCategories) {
      dispatch(listCategories());
    } else {
      setName(product.name);
      setPrice(product.price);
      setImage(product.image);
      setCategory(product.category._id);
      setCountInStock(product.countInStock);
      setDescription(product.description);
    }
  }, [
    dispatch,
    history,
    productId,
    product,
    successUpdate,
    userInfo,
    loadingCategories,
    successCategories,
    errorCategories,
  ]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (countInStock < 0) {
      setNegativeError(true);
    } else if (price < 0) {
      negativeErrorsetPrice(true);
    } else {
      dispatch(
        updateProduct({
          _id: productId,
          name,
          price,
          image,
          category,
          description,
          countInStock,
        })
      );
    }
  };

  const imageHandler = (base64) => {
    if (/^data:image/.test(base64)) {
      setImage(base64);
      setImageError(false);
    } else {
      setImageError(true);
    }
  };
  return (
    <ThemeProvider theme={theme}>
      <Stack
        direction="column"
        justifyContent="center"
        alignItems="center"
        spacing={0}
        mt={2}
        sx={{
          width: { xs: "95%", sm: "70%", md: "50%", lg: "30%" },
          mx: "auto",
        }}
      >
        <Typography variant="h5" sx={{ fontFamily: "Playfair Display" }}>
          EDIT PRODUCT
        </Typography>

        <Meta title="Product Edit" />

        {loading && <Loader />}
        {loadingUpdate && <Loader />}

        <Box component="form" onSubmit={handleSubmit}>
          <TextField
            id="product-name-input"
            onChange={(e) => setName(e.target.value)}
            value={name}
            label="Name"
            type="name"
            sx={{ my: 2 }}
            fullWidth
            autoFocus
            required
          />
          <TextField
            id="product-price-input"
            onChange={(e) => setPrice(e.target.value)}
            value={price}
            label="Price"
            type="number"
            sx={{ mb: 2 }}
            fullWidth
            required
          />
          {negativeErrorprice && (
            <Alerts severity="error" message="Price Can not be negative" />
          )}
          <Box className="MuiOutlinedInput-root MuiInputBase-root MuiInputBase-colorPrimary MuiInputBase-fullWidth MuiInputBase-formControl css-16727ts-MuiInputBase-root-MuiOutlinedInput-root">
            <div className="MuiOutlinedInput-input MuiInputBase-input css-1t8l2tu-MuiInputBase-input-MuiOutlinedInput-input">
              <label
                className="MuiInputLabel-root MuiInputLabel-formControl MuiInputLabel-animated MuiInputLabel-shrink MuiInputLabel-outlined MuiFormLabel-root MuiFormLabel-colorPrimary Mui-required css-1glnvel-MuiFormLabel-root-MuiInputLabel-root"
                data-shrink="true"
              >
                Image
                <span
                  aria-hidden="true"
                  className="MuiInputLabel-asterisk MuiFormLabel-asterisk css-wgai2y-MuiFormLabel-asterisk"
                >
                   *
                </span>
              </label>
              <FileBase
                type="file"
                multiple={false}
                onDone={({ base64 }) => imageHandler(base64)}
              />
            </div>
            <fieldset
              aria-hidden="true"
              className="MuiOutlinedInput-notchedOutline css-1d3z3hw-MuiOutlinedInput-notchedOutline"
            >
              <legend className="css-186xcr5">
                <span>Image&nbsp;*</span>
              </legend>
            </fieldset>
            {image && (
              <img
                style={{
                  width: "100px",
                  maxHeight: "50px",
                }}
                src={image}
                alt="product"
              />
            )}
          </Box>

          {imageError && (
            <Alerts severity="error" message="should be an image" />
          )}
          <FormControl sx={{ my: 2, maxHeight: 224 }} required fullWidth>
            <InputLabel id="category-select-label">Category</InputLabel>
            <Select
              labelId="category-select-label"
              id="category-select"
              label="Category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              MenuProps={MenuProps}
            >
              {loadingCategories ? (
                <Loader />
              ) : errorCategories ? (
                <Alerts severity="error" message={errorCategories} />
              ) : (
                categories.map((categ) => (
                  <MenuItem key={categ._id} value={categ._id}>
                    {categ.name}
                  </MenuItem>
                ))
              )}
              :loadingCategories?
            </Select>
          </FormControl>

          <TextField
            id="product-countInStock-input"
            onChange={(e) => setCountInStock(e.target.value)}
            value={countInStock}
            label="Count In Stock"
            type="number"
            sx={{ mb: 2 }}
            fullWidth
            required
          />
          {negativeError && (
            <Alerts
              severity="error"
              message="Count in stock Can not be negative"
            />
          )}
          <TextField
            id="product-description-input"
            onChange={(e) => setDescription(e.target.value)}
            value={description}
            label="description"
            type="text"
            sx={{ mb: 2 }}
            fullWidth
            required
          />
          {error && <Alerts severity="error" message={error} />}
          {errorUpdate && <Alerts severity="error" message={errorUpdate} />}
          <Button
            variant="contained"
            sx={{
              display: "flex",
              mx: "auto",
              mt: 2,
            }}
            type="submit"
            disabled={!image || !name || !category || !price || !description}
          >
            Update
          </Button>
        </Box>
      </Stack>
    </ThemeProvider>
  );
};

export default ProductEdit;
