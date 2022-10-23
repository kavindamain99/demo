import React, { useState } from 'react'
import SearchIcon from '@mui/icons-material/Search'
import InputBase from '@mui/material/InputBase'
import { styled, alpha } from '@mui/material/styles'
import { Box } from '@mui/system'

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
  },
}))

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}))

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}))
const SearchBox = ({ history, setSideNav }) => {
  const [keyword, setKeyword] = useState('')
  const submitHandler = (e) => {
    e.preventDefault()
    if (keyword.trim()) {
      history.push(`/search/${keyword}`)
    } else {
      history.push('/')
    }
  }

  return (
    <Search
      onClick={() => {
        setSideNav(false)
      }}
      sx={{ width: { xs: '100%', sm: '50%', md: '25%' } }}
    >
      <SearchIconWrapper>
        <SearchIcon />
      </SearchIconWrapper>
      <Box component='form' onSubmit={submitHandler}>
        <StyledInputBase
          placeholder='Search…'
          inputProps={{ 'aria-label': 'search' }}
          onChange={(e) => setKeyword(e.target.value)}
        />
      </Box>
    </Search>
  )
}

export default SearchBox
