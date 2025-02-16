import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Owner } from '../types/Owner';
import { fetchOwner } from './thunks';

type InitialState = {
  repoUrl: string;
  owner: Owner;
  error: string;
  loading: boolean;
};

const initialState: InitialState = {
  repoUrl: '',
  owner: {} as Owner,
  error: '',
  loading: false,
};

export const repoSlice = createSlice({
  name: 'repo',
  initialState,
  reducers: {
    setRepoUrl: (state, action: PayloadAction<string>) => {
      state.repoUrl = action.payload;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    resetRepo: (state) => {
      // state.owner = {} as Owner;
      state.repoUrl = '';
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchOwner.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(
      fetchOwner.fulfilled,
      (state, action: PayloadAction<Owner>) => {
        state.loading = false;
        state.owner = action.payload;
      },
    );
    builder.addCase(fetchOwner.rejected, (state, action) => {
      state.loading = false;
      state.error = (action.payload as string) || 'Unknown error';
    });
  },
});

export const { setRepoUrl, setError, setLoading, resetRepo } = repoSlice.actions;
export default repoSlice.reducer;
