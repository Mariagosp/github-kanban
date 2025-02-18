import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RepoInfo } from '../types/Owner';
import { fetchRepoInfo } from './thunks';

type InitialState = {
  repoUrl: string;
  owner: RepoInfo;
  error: string;
  loading: boolean;
};

const initialState: InitialState = {
  repoUrl: '',
  owner: {
    id: null,
    name: '',
    url: '',
    urlRepo: '',
    repoName: '',
    stars: 0,
  },
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
    // resetOwner: (state) => {
    //   state.owner = null;
    // }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchRepoInfo.pending, (state) => {
      state.loading = true;
      state.error = '';
    });
    builder.addCase(
      fetchRepoInfo.fulfilled,
      (state, action: PayloadAction<RepoInfo>) => {
        state.error = '';
        state.loading = false;
        state.owner = action.payload;
      },
    );
    builder.addCase(fetchRepoInfo.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
  },
});

export const { setRepoUrl, setError, setLoading } = repoSlice.actions;
export default repoSlice.reducer;
