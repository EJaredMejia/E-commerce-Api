import { configureStore } from '@reduxjs/toolkit'
import productsSlice from './slices/products.slice'
import isLoadingSlice from './slices/isLoading.slice'

export default configureStore({
    reducer: {
        products: productsSlice,
        isLoading: isLoadingSlice
    }
})
