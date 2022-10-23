import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Alerts from '../components/Alerts'
import Loader from '../components/Loader'
import { getUserDetails, updateUser } from '../actions/userActions'
import { USER_UPDATE_RESET } from '../constants/userConstants'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import Link from '@mui/material/Link'
import { Link as RouterLink } from 'react-router-dom'
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew'
import Meta from '../components/Meta'

const theme = createTheme({
  palette: {
    primary: {
      main: '#171717',
    },
  },
})

const UserEdit = ({ match, history }) => {
  const userId = match.params.id
  const [showEditName, setShowEditName] = useState(false)
  const [showEditEmail, setShowEditEmail] = useState(false)

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [isAdmin, setIsAdmin] = useState(false)

  const dispatch = useDispatch()

  const userDetails = useSelector((state) => state.userDetails)
  const { loading, error, user } = userDetails

  const userUpdate = useSelector((state) => state.userUpdate)
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = userUpdate

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: USER_UPDATE_RESET })
      history.push('/admin/userlist')
    } else {
      if (!user.name || user._id !== userId) {
        dispatch(getUserDetails(userId))
      } else {
        setName(user.name)
        setEmail(user.email)
        setIsAdmin(user.isAdmin)
      }
    }
  }, [dispatch, history, userId, user, successUpdate])

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(updateUser({ _id: userId, name, email, isAdmin }))
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

      <Typography
        variant='h5'
        sx={{
          fontFamily: 'Playfair Display',
          textAlign: 'center',
          mt: 2,
        }}
      >
        EDIT USER
      </Typography>

      <Meta title='User Edit' />

      {loadingUpdate && <Loader />}
      {loading ? (
        <Loader />
      ) : error ? (
        <Alerts severity='error' message={error} />
      ) : (
        <Box
          sx={{
            width: '100%',
            maxWidth: 450,
            bgcolor: 'background.paper',
            mx: 'auto',
            boxSizing: 'padding-box',
          }}
        >
          <Box component='form' onSubmit={submitHandler}>
            <nav aria-label='user basic info'>
              <List>
                <ListItem disablePadding>
                  <ListItemButton onClick={() => setShowEditName(true)}>
                    <ListItemIcon sx={{ mr: 2 }}>Name</ListItemIcon>
                    <ListItemText primary={name} />
                  </ListItemButton>
                </ListItem>
                {showEditName && (
                  <TextField
                    id='name-edit-input'
                    onChange={(e) => setName(e.target.value)}
                    value={name}
                    label='New Name'
                    type='name'
                    sx={{
                      ml: '1%',
                      width: '98%',
                    }}
                    size='small'
                    autoFocus
                  />
                )}
                <ListItem disablePadding>
                  <ListItemButton onClick={() => setShowEditEmail(true)}>
                    <ListItemIcon sx={{ mr: 2 }}>Email</ListItemIcon>
                    <ListItemText primary={email} />
                  </ListItemButton>
                </ListItem>
              </List>
              {showEditEmail && (
                <TextField
                  id='edit-email-input'
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                  label='New Email'
                  type='email'
                  autoComplete='current-password'
                  sx={{
                    ml: '1%',
                    width: '98%',
                  }}
                  size='small'
                  fullWidth
                  autoFocus
                />
              )}
              <FormControlLabel
                sx={{ ml: 1 }}
                control={
                  <Checkbox
                    checked={isAdmin}
                    onChange={(e) => setIsAdmin(e.target.checked)}
                  />
                }
                label='Is Admin'
              />

              {successUpdate && (
                <Alerts severity='success' message='Profile Updated' />
              )}
              {errorUpdate && <Alerts severity='error' message={errorUpdate} />}

              <Button
                variant='contained'
                sx={{
                  display: 'flex',
                  mx: 'auto',
                  mb: 2,
                }}
                type='submit'
              >
                UPDATE
              </Button>
            </nav>
          </Box>
        </Box>
      )}
    </ThemeProvider>
  )
}

export default UserEdit
