import { createSlice} from "@reduxjs/toolkit";
import { cousrsedata } from "../reduxcourse/coursedata";
export const UserSlice=createSlice({
    name:"allcourse",
    initialState:{value:cousrsedata},
    reducers:{
        addcourse:(state,action)=>{
            state.value.push(action.payload);  
        },
    },
})
export const {addcourse}=UserSlice.actions;
export default UserSlice.reducer;