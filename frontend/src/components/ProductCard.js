import React from 'react'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'
import { CardActionArea } from '@mui/material'
import Rating from '@mui/material/Rating'
import { Box } from '@mui/system'
import Link from '@mui/material/Link'
import { Link as RouterLink } from 'react-router-dom'

const ProductCard = ({ product }) => {
  return (
    <Link
      underline='none'
      component={RouterLink}
      to={`/product/${product._id}`}
    >
      <Card title={product.name} sx={{ width: '190px', margin: 'auto' }}>
        <CardActionArea>
          <CardMedia component='img' height='190px' image={product.image} />
          <CardContent>
            <Typography
              variant='body2'
              color='text.secondary'
              sx={{
                mr: -1.5,
                ml: -1,
                mt: -1,
                mb: 0.5,
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
              }}
            >
              {product.name}
            </Typography>
            <Box
              sx={{
                display: 'flex',
              }}
            >
              <Rating
                name='product-rating'
                sx={{ ml: -1.5 }}
                value={product.rating}
                size='small'
                readOnly
              />
              <Typography
                variant='body2'
                color='text.secondary'
                sx={{ ml: 'auto', pr: 1 }}
              >
                {product.numReviews} reviews
              </Typography>
            </Box>
            <Typography
              variant='h6'
              sx={{ fontWeight: 'bold', ml: -1, mt: 0.5, mb: -0.5 }}
            >
              US ${product.price}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </Link>
  )
}

export default ProductCard
