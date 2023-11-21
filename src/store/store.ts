import { configureStore } from '@reduxjs/toolkit';
import authReducer from 'features/auth/authSlice';
import errorReducer from 'features/error/errorSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    error: errorReducer
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

export default store;