import { createSlice } from '@reduxjs/toolkit';
import { axiosInstance } from '../../Components/utilis/axios';
import getConfig from '../../Components/utilis/getConfig';
import { setIsLoading } from './isLoading.slice';

export const purchasesSlice = createSlice({
    name: 'purchases',
    initialState: [],
    reducers: {
        setPurchases: (state, action)=>{
            return action.payload;
        }
    }
})

export const getPurchasesThunk = (token) => (dispatch) => {
    dispatch(setIsLoading(true));
    return axiosInstance.get("/users/orders", getConfig(token))
        .then((res) => dispatch(setPurchases(res.data.data.orders)))
        .finally(() => dispatch(setIsLoading(false)));
}

export const { setPurchases } = purchasesSlice.actions;

export default purchasesSlice.reducer;
