import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  isLoading: boolean;
  isError: boolean;
  user: any; 
}

const initialState: UserState = {
  isLoading: false,
  isError: false,
  user: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addUserStart: (state) => {
      state.isLoading = true;
      state.isError = false;
    },
    addUserSuccess: (state, action: PayloadAction<any>) => {
      state.isLoading = false;
      // console.log("YYYYYYY");
      // console.log("====",action.payload);
      
      state.user = action.payload;
    },
    addUserFailure: (state) => {
      state.isLoading = false;
      state.isError = true;
    },
  },
});

export const { addUserStart, addUserSuccess, addUserFailure } =
  userSlice.actions;

export default userSlice.reducer;
