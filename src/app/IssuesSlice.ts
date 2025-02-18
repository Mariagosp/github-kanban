import { createSlice } from '@reduxjs/toolkit';
import { IssueType } from '../types/IssueType';
import { fetchIssues } from './thunks';

type InitialState = {
  issues: Record<string, IssueType[]>;
  loading: boolean;
  error: string;
};

const initialState: InitialState = {
  issues: {},
  loading: false,
  error: '',
};

export const IssuesSlice = createSlice({
  name: 'issues',
  initialState,
  reducers: {
    setIssues: (state, action) => {
      const { repoPath, issues } = action.payload;
      state.error = '';
      state.issues[repoPath] = issues;
    },
    resetIssues: (state) => {
      state.issues = {};
      state.loading = false;
      state.error = '';
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchIssues.pending, (state) => {
      state.error = '';
      state.loading = true;
    });
    builder.addCase(fetchIssues.fulfilled, (state, action) => {
      state.loading = false;
      state.error = '';
      const { repoPath, issues } = action.payload;
      state.issues[repoPath] = issues;
    });
    builder.addCase(fetchIssues.rejected, (state, action) => {
      state.loading = false;
      state.error = (action.payload as string);
    });
  },
});

export const { setIssues, resetIssues } = IssuesSlice.actions;
export default IssuesSlice.reducer;

