import React, { useState, useEffect } from 'react'
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
import PasswordInput from '../components/PasswordInput'
import { useDispatch, useSelector } from 'react-redux'
import { USER_UPDATE_PROFILE_RESET } from '../constants/userConstants'
import { getUserDetails, updateUserProfile } from '../actions/userActions'
import Loader from '../components/Loader'
import Alerts from '../components/Alerts'
import Meta from '../components/Meta'

const theme = createTheme({
  palette: {
    primary: {
      main: '#171717',
    },
  },
})

const Profile = ({ history }) => {
  const [showEditName, setShowEditName] = useState(false)
  const [showEditEmail, setShowEditEmail] = useState(false)
  const [showEditPassword, setShowEditPassword] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  const [name, setName] = useState('')
  const [newName, setNewName] = useState('')
  const [email, setEmail] = useState('')
  const [newEmail, setNewEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [message, setMessage] = useState(null)
  const [successMessage, setSuccessMessage] = useState(false)

  const dispatch = useDispatch()

  const userDetails = useSelector((state) => state.userDetails)
  const { loading, error, user } = userDetails

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword)
  }

  const userUpdateProfile = useSelector((state) => state.userUpdateProfile)
  const { success, errorUpdateProfile } = userUpdateProfile

  useEffect(() => {
    if (!userInfo) {
      history.push('/login')
    } else {
      if (!user || !user.name) {
        dispatch({ type: USER_UPDATE_PROFILE_RESET })
        dispatch(getUserDetails('profile'))
      } else if (success) {
        setSuccessMessage(true)
        dispatch({ type: USER_UPDATE_PROFILE_RESET })
        dispatch(getUserDetails('profile'))
      } else {
        setName(user.name)
        setEmail(user.email)
      }
    }
  }, [dispatch, history, userInfo, user, success])

  const submitHandler = (e) => {
    e.preventDefault()
    if (password !== confirmPassword) {
      setMessage('Passwords do not match')
    } else {
      dispatch(
        updateUserProfile({
          id: user._id,
          name: newName,
          email: newEmail,
          password,
        })
      )
      setNewName('')
      setNewEmail('')
      setPassword('')
      setConfirmPassword('')
      setShowEditName(false)
      setShowEditPassword(false)
      setShowEditEmail(false)
      setMessage('')
    }
  }

  return (
    <ThemeProvider theme={theme}>
      <Typography
        variant='h5'
        sx={{
          fontFamily: 'Playfair Display',
          textAlign: 'center',
          mt: 2,
        }}
      >
        PROFILE
      </Typography>

      <Meta title='Profile' />

      {loading ? (
        <Loader />
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
                    onChange={(e) => setNewName(e.target.value)}
                    value={newName}
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
                {showEditEmail && (
                  <TextField
                    id='edit-email-input'
                    onChange={(e) => setNewEmail(e.target.value)}
                    value={newEmail}
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

                <ListItem disablePadding>
                  <ListItemButton onClick={() => setShowEditPassword(true)}>
                    <ListItemIcon sx={{ mr: 2 }}>Password</ListItemIcon>
                    <ListItemText primary='*****' />
                  </ListItemButton>
                </ListItem>
              </List>
              {showEditPassword && (
                <>
                  <PasswordInput
                    password={password}
                    showPassword={showPassword}
                    setPassword={setPassword}
                    handleClickShowPassword={handleClickShowPassword}
                    value='New Password'
                    size='small'
                    required='false'
                  />

                  <PasswordInput
                    password={confirmPassword}
                    showPassword={showPassword}
                    setPassword={setConfirmPassword}
                    handleClickShowPassword={handleClickShowPassword}
                    value='Confirm Password'
                    size='small'
                    required='false'
                  />
                </>
              )}
              {message && <Alerts severity='error' message={message} />}

              {successMessage && (
                <Alerts severity='success' message='Profile Updated' />
              )}
              {error && <Alerts severity='error' message={error} />}
              {errorUpdateProfile && (
                <Alerts severity='error' message={errorUpdateProfile} />
              )}

              <Button
                variant='contained'
                sx={{
                  display: 'flex',
                  mx: 'auto',
                  mb: 2,
                }}
                type='submit'
                disabled={newName || newEmail || password ? false : true}
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

export default Profile
