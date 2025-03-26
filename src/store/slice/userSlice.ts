import { createSlice, PayloadAction } from "@reduxjs/toolkit";


interface UserState{
    user:any | null;
    isEmailVerified: boolean;
    isLoginDailogOpen:boolean;
    isLoggedIn:boolean;
}


const initialState :UserState={
    user:null,
    isEmailVerified:false,
    isLoginDailogOpen:false,
    isLoggedIn:false
}


const userSlice = createSlice({
    name:'user',
    initialState,
    reducers:{
        setUser:(state,action:PayloadAction<any>)=>{
            state.user=action.payload;
        },
        setEmailVerfied:(state,action:PayloadAction<any>)=>{
            state.isEmailVerified=action.payload;
        },
        logout:(state)=>{
            state.user=null;
            state.isLoggedIn=false;
            state.isEmailVerified=false;

        },
        toggleLoginDailog:(state)=>{
            state.isLoginDailogOpen= !state.isLoginDailogOpen;
        },
        authStatus:(state)=>{
            state.isLoggedIn=true;
        }
    }
});
export const {setUser, setEmailVerfied,logout,toggleLoginDailog,authStatus}=userSlice.actions;
export default userSlice.reducer;