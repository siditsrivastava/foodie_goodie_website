import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    FoodList : [],
    quantity : 1,
    totalCost : 0
}


export const counterSlice = createSlice({
    name : "counter" ,
    initialState, 
    reducers : {
        adddata : (state, action) => {
            const duplicateData = state.FoodList.findIndex((items) => items.dishname === action.payload.dishname)
                if(duplicateData >=0 ){
                    state.FoodList[duplicateData].quantity += 1;
                }else {
                    state.FoodList.push(action.payload)
                }
        },
        incrementQuantity : (state , action ) => {
             state.FoodList = state.FoodList.map((items) =>{
                if(items._id=== action.payload){
                    return {
                        ...items,
                        quantity : items.quantity +=1
                    }
                }
                return items
             } )

            },
        decrementQuantity : (state , action) => {
            state.FoodList = state.FoodList.map((items) =>{
                if(items._id=== action.payload){
                    return {
                        ...items,
                        quantity : items.quantity -=1
                    }
                }
                return items
             }).filter ((items) => {
                return items.quantity !==0;
             })
        },
        removeAllData : (state) => {
           state.FoodList = []
        },
        removeData : (state , action) => {
            const deletedata = state.FoodList.filter((items) => items._id !== action.payload);
            return{
                ...state,
                FoodList : deletedata
            }
        },

        totalPrice : (state)=> {
            let {totalCost} = state.FoodList.reduce(
                (cartTotal , CartsItems) => {
                    const {price , quantity } = CartsItems

                    const itemstotal = price * quantity;
                    cartTotal.totalCost += itemstotal;
                    return cartTotal ;      
            }, 
            {
                totalCost :0,
            }
            );
           return {
            ...state , totalCost
           }
        }

    }
})

export const {adddata , removeData,  removeAllData ,incrementQuantity , decrementQuantity , totalPrice} = counterSlice.actions
export default counterSlice.reducer;