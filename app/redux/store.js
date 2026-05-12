// all application data is stored in this file, and can be accessed by any component in the app
// data from reducers is stored in this file

import {configureStore} from "@reduxjs/toolkit";
import reducer from "./slice";

export const store = configureStore({
  // reducer:reducer
  reducer
})