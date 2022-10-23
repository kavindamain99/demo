import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../components/Loader'
import Alerts from '../components/Alerts'
import TabPanel from '../components/TabPanel'
import Grid from '@mui/material/Grid'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import {
  listProductDetails,
  createProductReview,
} from '../actions/productActions'
import { PRODUCT_CREATE_REVIEW_RESET } from '../constants/productConstants'
import Link from '@mui/material/Link'
import { Link as RouterLink } from 'react-router-dom'
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import Rating from '@mui/material/Rating'
import Box from '@mui/system/Box'
import Button from '@mui/material/Button'
import Container from '@mui/material/Container'
import StarIcon from '@mui/icons-material/Star'
import TextField from '@mui/material/TextField'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import ListItemAvatar from '@mui/material/ListItemAvatar'
import AccountCircle from '@mui/icons-material/AccountCircle'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import Meta from '../components/Meta'

const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: 225,
    },
  },
}

const labels = {
  1: 'Useless',
  2: 'Poor',
  3: 'Ok',
  4: 'Good',
  5: 'Excellent',
}

const theme = createTheme({
  palette: {
    primary: {
      main: '#171717',
    },
  },
  breakpoints: {
    values: {
      xxs: 0,
      xs: 400,
      sm: 600,
      md: 800,
      lg: 1200,
      xl: 1536,
    },
  },
})

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  }
}

const Product = ({ history, match }) => {
  const [qty, setQty] = useState(1)
  const [rating, setRating] = useState(0)
  const [hover, setHover] = React.useState(-1)
  const [comment, setComment] = useState('')
  const [value, setValue] = React.useState(0)

  const dispatch = useDispatch()

  const productDetails = useSelector((state) => state.productDetails)
  const { loading, error, product } = productDetails

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const productReviewCreate = useSelector((state) => state.productReviewCreate)
  const {
    success: successProductReview,
    loading: loadingProductReview,
    error: errorProductReview,
  } = productReviewCreate

  useEffect(() => {
    if (successProductReview) {
      setRating(0)
      setComment('')
    }
    if (!product._id || product._id !== match.params.id) {
      dispatch(listProductDetails(match.params.id))
      dispatch({ type: PRODUCT_CREATE_REVIEW_RESET })
    }
  }, [dispatch, product._id, match, successProductReview])

  const addToCartHandler = () => {
    history.push(`/cart/${match.params.id}?qty=${qty}`)
  }

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(
      createProductReview(match.params.id, {
        rating,
        comment,
      })
    )
  }
  return (
    <ThemeProvider theme={theme}>
      <Link
        underline='none'
        component={RouterLink}
        to='/'
        variant='h5'
        sx={{ color: '#171717', ml: '5%', mt: 3, display: 'block' }}
      >
        <ArrowBackIosNewIcon sx={{ mb: -0.5 }} /> Go Back
      </Link>
      {loading ? (
        <Loader />
      ) : error ? (
        <Alerts severity='danger' message={error} />
      ) : (
        <>
          <Grid container my={2} rowSpacing={2} alignItems='center'>
            <Meta title={product.name} />
            <Grid item xs={12} sm={6}>
              <Box sx={{ justifyContent: 'center', display: 'flex' }}>
                <Box
                  component='img'
                  src={product.image}
                  alt={product.name}
                  sx={{
                    maxHeight: '400px',
                    maxWidth: '90%',
                  }}
                ></Box>
              </Box>
            </Grid>
            <Grid item xxs={11} xs={8} sm={6} md={4} lg={3}>
              <Typography variant='h4' ml={2} mb={3}>
                {product.name}
              </Typography>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                }}
                ml={2}
              >
                <Rating value={product.rating} fontSize='inherit' readOnly />
                <Box sx={{ fontWeight: 'bold', ml: 0 }}>
                  ( {product.numReviews} )
                </Box>
              </Box>
              <Typography
                ml={2}
                variant='h5'
                sx={{ mt: 3, fontWeight: 'bold' }}
              >
                US ${product.price}
              </Typography>
              <Typography ml={2} variant='h6' color='text.secondary'>
                {product.countInStock > 0 ? 'In Stock' : 'Out Of Stock'}
              </Typography>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  my: 2,
                }}
              >
                {product.countInStock > 0 && (
                  <FormControl sx={{ ml: 2, maxHeight: 224 }} size='small'>
                    <InputLabel id='item-select-quantity'>Qty</InputLabel>
                    <Select
                      labelId='item-select-quantity'
                      id='quantity-select'
                      label='Qty'
                      value={qty}
                      onChange={(e) => setQty(e.target.value)}
                      MenuProps={MenuProps}
                    >
                      {[...Array(product.countInStock).keys()].map((x) => (
                        <MenuItem key={x + 1} value={x + 1}>
                          {x + 1}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                )}
                <Button
                  variant='contained'
                  type='button'
                  onClick={addToCartHandler}
                  disabled={product.countInStock === 0}
                  sx={{ display: 'block', ml: 2 }}
                >
                  Add To Cart
                </Button>
              </Box>
            </Grid>
          </Grid>

          <Container maxWidth='lg'>
            <Box sx={{ width: '100%' }}>
              <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs
                  value={value}
                  onChange={handleChange}
                  aria-label='basic tabs example'
                >
                  <Tab label='Description' {...a11yProps(0)} />
                  <Tab
                    label={`Reviews (${product.numReviews}) `}
                    {...a11yProps(1)}
                  />
                </Tabs>
              </Box>
              <TabPanel value={value} index={0}>
                <Typography variant='body1'>{product.description}</Typography>
              </TabPanel>
              <TabPanel value={value} index={1}>
                {product.reviews.length === 0 ? (
                  <Alerts
                    severity='info'
                    message='No Reviews For This Product Yet'
                  />
                ) : (
                  <List>
                    {product.reviews.map((review) => (
                      <ListItem key={review._id} alignItems='flex-start'>
                        <ListItemAvatar>
                          <AccountCircle />
                        </ListItemAvatar>
                        <ListItemText
                          primary={review.name}
                          secondary={
                            <>
                              <Typography
                                sx={{ display: 'inline' }}
                                variant='body1'
                                color='text.secondary'
                              >
                                <Box
                                  sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                  }}
                                >
                                  <Rating
                                    value={review.rating}
                                    fontSize='inherit'
                                    readOnly
                                    size='small'
                                  />
                                  <Box sx={{ ml: 2 }}>
                                    {review.createdAt.substring(0, 10)}
                                  </Box>
                                </Box>
                                {review.comment}
                              </Typography>
                            </>
                          }
                        />
                      </ListItem>
                    ))}
                  </List>
                )}

                {userInfo ? (
                  <>
                    <Typography variant='h6' mt={2}>
                      Review This Product
                    </Typography>
                    {successProductReview && (
                      <Alerts
                        severity='success'
                        message='Review submitted successfully'
                      />
                    )}
                    {loadingProductReview && <Loader />}
                    {errorProductReview && (
                      <Alerts severity='error' message={errorProductReview} />
                    )}
                    <Box
                      component='form'
                      onSubmit={submitHandler}
                      mt={1}
                      mb={3}
                    >
                      <Typography component='legend' mb={0.1}>
                        Your Rating:
                      </Typography>
                      <Box
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          mb: 3,
                        }}
                      >
                        <Rating
                          name='hover-feedback'
                          value={rating}
                          onChange={(event, newValue) => {
                            setRating(newValue)
                          }}
                          onChangeActive={(event, newHover) => {
                            setHover(newHover)
                          }}
                          emptyIcon={
                            <StarIcon
                              style={{ opacity: 0.55 }}
                              fontSize='inherit'
                            />
                          }
                        />
                        {rating !== null && (
                          <Box sx={{ ml: 2, display: 'inline' }}>
                            {labels[hover !== -1 ? hover : rating]}
                          </Box>
                        )}
                      </Box>
                      <TextField
                        id='product-review-input'
                        onChange={(e) => setComment(e.target.value)}
                        value={comment}
                        label='Your Review'
                        type='text'
                        fullWidth
                        required
                      />
                      <Button
                        variant='contained'
                        sx={{
                          mt: 2,
                        }}
                        type='submit'
                        disabled={!rating || !comment}
                      >
                        SUBMIT
                      </Button>
                    </Box>
                  </>
                ) : (
                  <Typography variant='body2' mt={2}>
                    Please{'   '}
                    <Link
                      variant='body1'
                      underline='none'
                      component={RouterLink}
                      to='/login'
                      sx={{ fontWeight: 'bold' }}
                    >
                      Login
                    </Link>
                    {'   '}to write a review
                  </Typography>
                )}
              </TabPanel>
            </Box>
          </Container>
        </>
      )}
    </ThemeProvider>
  )
}

export default Product
