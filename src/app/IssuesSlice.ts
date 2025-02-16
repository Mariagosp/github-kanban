import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IssueType } from "../types/IssueType"
import { fetchIssues } from "./thunks";

type InitialState = {
  // issues: Record<string, IssueType[]>,
  issues: IssueType[],
  loading: boolean,
  error: string; 
}   

const initialState: InitialState = {
  issues: [] as IssueType[],
  loading: false,
  error: '',
}

export const IssuesSlice = createSlice({
  name: 'issues',
  initialState,
  reducers: {
    // setIssues: (state, action: PayloadAction<{ repoUrl: string, issues: IssueType[] | ((prev: IssueType[]) => IssueType[]) }>) => {
    //   const { repoUrl, issues } = action.payload;
    //   if (typeof issues === 'function') {
    //     state.issues[repoUrl] = issues(state.issues[repoUrl] || []);
    //   } else {
    //     state.issues[repoUrl] = [...issues];
    //   }
    // },
    setIssues: (state, action: PayloadAction<IssueType[] | ((prev: IssueType[]) => IssueType[])>) => {
      if (typeof action.payload === 'function') {
        state.issues = action.payload(state.issues);
      } else {
        state.issues = action.payload;
      }
    },
    resetIssues: (state) => {
      state.issues = [];
      // state.issues = {};
      state.loading = false;
      state.error = ''; 
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchIssues.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchIssues.fulfilled, (state, action) => {
      state.loading = false;
      // const { repoUrl, issues } = action.payload;
      // state.issues[repoUrl] = [...issues];
      state.issues = action.payload;
    });
    builder.addCase(fetchIssues.rejected, (state, action) => {
      state.loading = false;
      state.error = (action.payload as string) || 'unknown error';
    });
  }
})

export const { setIssues, resetIssues } =
IssuesSlice.actions;
export default IssuesSlice.reducer;