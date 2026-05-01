import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './slices/cartSlice';
import orderReducer from './slices/orderSlice';
import userReducer from './slices/userSlice';
import wishlistReducer from './slices/wishlistSlice';

const store = configureStore({
  reducer: {
    cart: cartReducer,
    order: orderReducer,
    user: userReducer,
    wishlist: wishlistReducer,
  },
});

export default store;
