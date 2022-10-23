import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Alerts from '../components/Alerts'
import { addToCart, removeFromCart } from '../actions/cartActions'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import Box from '@mui/system/Box'
import Link from '@mui/material/Link'
import { Link as RouterLink } from 'react-router-dom'
import Select from '@mui/material/Select'
import FormControl from '@mui/material/FormControl'
import MenuItem from '@mui/material/MenuItem'
import InputLabel from '@mui/material/InputLabel'
import DeleteIcon from '@mui/icons-material/Delete'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import Meta from '../components/Meta'

const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: 225,
    },
  },
}

const theme = createTheme({
  palette: {
    primary: {
      main: '#171717',
    },
  },
})

const Cart = ({ match, location, history }) => {
  const productId = match.params.id

  const qty = location.search ? Number(location.search.split('=')[1]) : 1

  const dispatch = useDispatch()

  const cart = useSelector((state) => state.cart)
  const { cartItems } = cart

  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, qty))
    }
  }, [dispatch, productId, qty])

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id))
  }

  const checkoutHandler = () => {
    history.push('/login?redirect=shipping')
  }

  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth='sm'>
        <Typography
          variant='h5'
          sx={{
            color: '#171717',
            textAlign: 'center',
            fontFamily: 'Playfair Display',
            mt: 2,
          }}
        >
          CART
        </Typography>

        <Meta title='Cart' />
        {cartItems.length === 0 ? (
          <Alerts message='Your Cart is empty' severity='info' />
        ) : (
          cartItems.map((item) => (
            <div key={item.product}>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  my: 2,
                }}
              >
                <Box
                  component='img'
                  src={item.image}
                  alt={item.name}
                  title={item.name}
                  sx={{
                    maxHeight: '50px',
                    maxWidth: '50px',
                  }}
                ></Box>
                <Link
                  underline='none'
                  component={RouterLink}
                  to={`/product/${item.product}`}
                  variant='body2'
                  sx={{
                    color: '#171717',
                    fontWeight: 'bold',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                    maxWidth: '100px',
                    display: { xs: 'none', sm: 'block' },
                  }}
                  title={item.name}
                >
                  {item.name}
                </Link>
                <Typography
                  variant='body1'
                  sx={{ color: '#171717', fontWeight: 'bold' }}
                >
                  ${item.price}
                </Typography>
                <FormControl sx={{ maxHeight: 224 }} size='small'>
                  <InputLabel id='item-select-quantity'>Qty</InputLabel>
                  <Select
                    labelId='item-select-quantity'
                    id='quantity-select'
                    label='Qty'
                    value={item.qty}
                    onChange={(e) =>
                      dispatch(addToCart(item.product, Number(e.target.value)))
                    }
                    MenuProps={MenuProps}
                  >
                    {[...Array(item.countInStock).keys()].map((x) => (
                      <MenuItem key={x + 1} value={x + 1}>
                        {x + 1}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <Button
                  aria-label='delete cart item'
                  onClick={() => removeFromCartHandler(item.product)}
                  color='error'
                  size='small'
                  sx={{ px: -3 }}
                >
                  <DeleteIcon />
                </Button>
              </Box>
              <Divider />
            </div>
          ))
        )}
        {cartItems.length !== 0 && (
          <>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-around',
                my: 2,
              }}
            >
              <Typography variant='h6' sx={{ fontFamily: 'Playfair Display' }}>
                Subtotal:
              </Typography>
              <Typography variant='h6' sx={{ fontWeight: 'bold' }}>
                $
                {cartItems
                  .reduce((acc, item) => acc + item.qty * item.price, 0)
                  .toFixed(2)}
              </Typography>
              <Typography variant='body1'>
                ({cartItems.reduce((acc, item) => acc + item.qty, 0)}) items
              </Typography>
            </Box>
            <Divider />
            <Button
              variant='contained'
              type='button'
              sx={{
                display: 'flex',
                mx: 'auto',
                mt: 2,
              }}
              disabled={cartItems.length === 0}
              onClick={checkoutHandler}
            >
              Proceed To Checkout
            </Button>
          </>
        )}
      </Container>
    </ThemeProvider>
  )
}

export default Cart
