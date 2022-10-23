import { combineReducers } from 'redux'
import { cartReducer } from './cartReducers'
import {
  categoryByIdReducer,
  categoryCreateReducer,
  categoryDeleteReducer,
  categoryListReducer,
  categoryUpdateReducer,
} from './categoryReducers'
import {
  orderCreateReducer,
  orderDeliverReducer,
  orderDetailsReducer,
  orderListMyReducer,
  orderListReducer,
  orderPayReducer,
} from './orderReducers'
import {
  productCreateReducer,
  productDeleteReducer,
  productDetailsReducer,
  productListReducer,
  productReviewCreateReducer,
  productUpdateReducer,
} from './productReducers'
import {
  userDeleteReducer,
  userDetailsReducer,
  userListReducer,
  userLoginReducer,
  userRegisterReducer,
  userUpdateProfileReducer,
  userUpdateReducer,
} from './userReducers'

const reducers = combineReducers({
  categoryList: categoryListReducer,
  categoryDetails: categoryByIdReducer,
  categoryCreate: categoryCreateReducer,
  categoryDelete: categoryDeleteReducer,
  categoryUpdate: categoryUpdateReducer,
  productCreate: productCreateReducer,
  productList: productListReducer,
  productDetails: productDetailsReducer,
  productReviewCreate: productReviewCreateReducer,
  productDelete: productDeleteReducer,
  productUpdate: productUpdateReducer,
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userDetails: userDetailsReducer,
  userUpdateProfile: userUpdateProfileReducer,
  userList: userListReducer,
  userDelete: userDeleteReducer,
  userUpdate: userUpdateReducer,
  cart: cartReducer,
  orderCreate: orderCreateReducer,
  orderDetails: orderDetailsReducer,
  orderPay: orderPayReducer,
  orderDeliver: orderDeliverReducer,
  orderListMy: orderListMyReducer,
  orderList: orderListReducer,
})

export default reducers
