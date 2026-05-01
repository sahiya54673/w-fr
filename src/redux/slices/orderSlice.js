import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  orders: localStorage.getItem('orders')
    ? JSON.parse(localStorage.getItem('orders'))
    : [],
};

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    placeOrder: (state, action) => {
      state.orders = [action.payload, ...state.orders];
      localStorage.setItem('orders', JSON.stringify(state.orders));
    },
    setOrders: (state, action) => {
      state.orders = action.payload;
      localStorage.setItem('orders', JSON.stringify(state.orders));
    },
    clearOrders: (state) => {
      state.orders = [];
      localStorage.removeItem('orders');
    }
  },
});

export const { placeOrder, setOrders, clearOrders } = orderSlice.actions;

export default orderSlice.reducer;
