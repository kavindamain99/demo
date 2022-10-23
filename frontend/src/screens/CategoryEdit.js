import React, { useState, useEffect } from 'react'
import Box from '@mui/system/Box'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import Alerts from '../components/Alerts'
import Button from '@mui/material/Button'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../components/Loader'
import { updateCategory, categoryById } from '../actions/categoryActions'
import { CATEGORY_UPDATE_RESET } from '../constants/categoryConstants'
import Container from '@mui/material/Container'
import Meta from '../components/Meta'

const theme = createTheme({
  palette: {
    primary: {
      main: '#171717',
    },
  },
})

const CategoryEdit = ({ match, history }) => {
  const [name, setName] = useState('')

  const categoryId = match.params.id

  const dispatch = useDispatch()

  const categoryDetails = useSelector((state) => state.categoryDetails)
  const { loading, error, category } = categoryDetails

  const categoryUpdate = useSelector((state) => state.categoryUpdate)
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = categoryUpdate

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  useEffect(() => {
    if (!userInfo || !userInfo.isAdmin) {
      history.push('/login')
    }
    if (successUpdate) {
      dispatch({ type: CATEGORY_UPDATE_RESET })
      history.push('/admin/categorylist')
    } else {
      if (!loading) {
        if (!category.name || category._id !== categoryId) {
          dispatch(categoryById(categoryId))
        } else {
          setName(category.name)
        }
      }
    }
  }, [
    history,
    userInfo,
    dispatch,
    successUpdate,
    category,
    categoryId,
    loading,
  ])

  const handleSubmit = (event) => {
    event.preventDefault()
    dispatch(updateCategory({ _id: categoryId, name }))
  }

  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth='xs'>
        <Typography
          variant='h5'
          sx={{ textAlign: 'center', my: 2, fontFamily: 'Playfair Display' }}
        >
          UPDATE CATEGORY
        </Typography>

        <Meta title='Edit Category' />

        {loading && <Loader />}
        {loadingUpdate && <Loader />}

        <Box component='form' onSubmit={handleSubmit}>
          <TextField
            id='category-name-input'
            onChange={(e) => setName(e.target.value)}
            value={name}
            label='Category Name'
            type='name'
            sx={{ mb: 2 }}
            fullWidth
            autoFocus
            required
          />

          {error && <Alerts severity='error' message={error} />}
          {errorUpdate && <Alerts severity='error' message={errorUpdate} />}

          <Button
            variant='contained'
            sx={{
              display: 'flex',
              mx: 'auto',
              mt: 2,
            }}
            type='submit'
            disabled={!name}
          >
            Update
          </Button>
        </Box>
      </Container>
    </ThemeProvider>
  )
}

export default CategoryEdit
