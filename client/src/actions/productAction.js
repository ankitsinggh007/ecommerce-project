import axios from "axios";
import {

    ALL_PRODUCT_FAIL,
    ALL_PRODUCT_REQUEST,
    ALL_PRODUCT_SUCCESS,
    CLEAR_ERRORS,
    PRODUCT_DETAILS_REQUEST,
    PRODUCT_DETAILS_SUCCESS,
    PRODUCT_DETAILS_FAIL

} from '../constants/productConstants'

export const getProduct=(keyword)=>async(dispatch)=>{
    try {
        dispatch({type:ALL_PRODUCT_REQUEST});

        
        const {data}=await axios.get(`/api/v1/product?keyword=${keyword}`);
       console.log(data,"data");
        dispatch({
            type:ALL_PRODUCT_SUCCESS,
            payload:data,
        })
    } catch (error) {
        dispatch({
            type:ALL_PRODUCT_FAIL,
            payload:error.response.data.message
        });
    }
}

export const getProductDetails=(id)=>async (dispatch)=>{
    console.log("hi")
    try {
    
        dispatch({type:PRODUCT_DETAILS_REQUEST});
        
        const {data}=await axios.get(`/api/v1/product/${id}`);
       console.log(data,"data");
        dispatch({
            type:PRODUCT_DETAILS_SUCCESS,
            payload:data.response,
        })
    } catch (error) {
       console.log("data in error");

        dispatch({
            type:PRODUCT_DETAILS_FAIL,
            payload:error.response.data.message
        });
    }
}




export const clearErrors=()=>async (dispatch)=>{
    dispatch({type:CLEAR_ERRORS})
}