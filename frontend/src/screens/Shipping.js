import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { saveShippingAddress } from '../actions/cartActions'
import { savePaymentMethod } from '../actions/cartActions'
import Box from '@mui/system/Box'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import Stack from '@mui/material/Stack'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import Button from '@mui/material/Button'
import Radio from '@mui/material/Radio'
import RadioGroup from '@mui/material/RadioGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormControl from '@mui/material/FormControl'
import FormLabel from '@mui/material/FormLabel'
import Meta from '../components/Meta'

const theme = createTheme({
  palette: {
    primary: {
      main: '#171717',
    },
  },
})

const Shipping = ({ history }) => {
  const cart = useSelector((state) => state.cart)
  const { shippingAddress } = cart

  const [address, setAddress] = useState(
    shippingAddress.address ? shippingAddress.address : ''
  )
  const [city, setCity] = useState(
    shippingAddress.city ? shippingAddress.city : ''
  )
  const [postalCode, setPostalCode] = useState(
    shippingAddress.postalCode ? shippingAddress.postalCode : ''
  )
  const [country, setCountry] = useState(
    shippingAddress.country ? shippingAddress.country : ''
  )
  const [paymentMethod, setPaymentMethod] = useState('PayPal')

  const dispatch = useDispatch()

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  useEffect(() => {
    if (!userInfo) {
      history.push('/login?redirect=shipping')
    }
  })

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(saveShippingAddress({ address, city, postalCode, country }))
    dispatch(savePaymentMethod(paymentMethod))
    history.push('/placeorder')
  }

  return (
    <ThemeProvider theme={theme}>
      <Stack
        direction='column'
        justifyContent='center'
        alignItems='center'
        spacing={0}
        mt={2}
        sx={{
          width: { xs: '95%', sm: '70%', md: '50%', lg: '30%' },
          mx: 'auto',
        }}
      >
        <Typography variant='h5' sx={{ fontFamily: 'Playfair Display' }}>
          SHIPPING DETAILS
        </Typography>

        <Meta title='Shipping Details' />

        <FormControl component='fieldset' sx={{ mr: 'auto', mt: 4 }}>
          <FormLabel component='legend'>Payment Method</FormLabel>
          <RadioGroup
            aria-label='gender'
            defaultValue='PayPal'
            name='payment-method'
            onChange={(e) => setPaymentMethod(e.target.value)}
          >
            <FormControlLabel
              value='PayPal'
              control={<Radio />}
              label='PayPal'
            />
          </RadioGroup>
        </FormControl>
        <Box component='form' onSubmit={submitHandler}>
          <TextField
            id='address-input'
            onChange={(e) => setAddress(e.target.value)}
            value={address}
            label='Address'
            type='text'
            sx={{ my: 2 }}
            fullWidth
            autoFocus
            required
          />
          <TextField
            id='city-input'
            onChange={(e) => setCity(e.target.value)}
            value={city}
            label='City'
            type='text'
            sx={{ mb: 2 }}
            fullWidth
            required
          />
          <TextField
            id='postal-code-input'
            onChange={(e) => setPostalCode(e.target.value)}
            value={postalCode}
            label='Postal Code'
            type='text'
            sx={{ mb: 2 }}
            fullWidth
            required
          />
          <TextField
            id='country-input'
            onChange={(e) => setCountry(e.target.value)}
            value={country}
            label='Country'
            type='text'
            sx={{ mb: 2 }}
            fullWidth
            required
          />
          <Button
            variant='contained'
            sx={{
              display: 'flex',
              mx: 'auto',
              my: 2,
            }}
            type='submit'
            disabled={!address || !city || !postalCode || !country}
          >
            Continue
          </Button>
        </Box>
      </Stack>
    </ThemeProvider>
  )
}

export default Shipping
