import { createAsyncThunk } from "@reduxjs/toolkit";
import { getIssues, getOwner } from "../utils/fetchingIssues";

export const fetchOwner = createAsyncThunk(
  'repo/fetchOwner',
  async (repoPath: string, { rejectWithValue }) => {
    try {
      return await getOwner(repoPath);
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);
export const fetchIssues = createAsyncThunk(
  'repo/fetchIssues',
  async (repoPath: string, { rejectWithValue }) => {
    try {
      return await getIssues(repoPath);
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);