import React from 'react'
import { Link } from 'react-router-dom'
import Pagination from '@mui/material/Pagination'
import PaginationItem from '@mui/material/PaginationItem'

const PaginationBar = ({ pages, page, keyword = '', isAdmin = false }) => {
  return (
    pages > 1 && (
      <Pagination
        sx={{
          display: 'flex',
          justifyContent: 'center',
          mt: 4,
        }}
        count={pages}
        page={page}
        variant='outlined'
        renderItem={(item) => (
          <PaginationItem
            {...item}
            component={Link}
            to={
              !isAdmin
                ? keyword
                  ? `/search/${keyword}/page/${item.page}`
                  : `/page/${item.page}`
                : `/admin/productlist/${item.page}`
            }
          />
        )}
      />
    )
  )
}

export default PaginationBar
