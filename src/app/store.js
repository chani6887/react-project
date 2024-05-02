import { configureStore } from "@reduxjs/toolkit";
import userSlice from "../features/user/userSlice";
import orderSlice from "../features/order/orderSlice";
import productSlice from "../features/product/productSlice";

export const store = configureStore({
    reducer: {
        user: userSlice,
        order: orderSlice,
        product: productSlice
    },
}); 