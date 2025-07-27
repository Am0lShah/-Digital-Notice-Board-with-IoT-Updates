import { createSlice } from "@reduxjs/toolkit";

const initialState={
    followers:[],
    following:[]

}
const userDataSlice=createSlice({
   name:'follow',
   initialState,
   reducers:{
    setFollowers:(state,action)=>{
        // console.log(action.payload);
        
        state.followers=action.payload;
    },
    setFollowing:(state,action)=>{
        state.following=action.payload;
    },
   },
})

export const {setFollowers,setFollowing}=userDataSlice.actions;
export default userDataSlice.reducer;