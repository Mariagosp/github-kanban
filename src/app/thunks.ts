import { createAsyncThunk } from '@reduxjs/toolkit';
import { StateType } from '../types/StateType';
import { Issue } from '../utils/TypeforGithubData';

export const fetchRepoInfo = createAsyncThunk(
  'repo/fetchRepoInfo',
  async (repoPath: string, { rejectWithValue }) => {
    try {
      const repoResponse = await fetch(
        `https://api.github.com/repos/${repoPath}`,
        {
          headers: {
            Authorization: `${import.meta.env.VITE_GITHUB_TOKEN}`,
          },
        },
      );

      if (!repoResponse.ok) {
        throw new Error('No such repository');
      }

      const data = await repoResponse.json();

      return {
        id: data.id,
        name: data.owner.login,
        url: data.owner.html_url,
        urlRepo: data.html_url,
        repoName: data.name,
        stars: data.stargazers_count,
      };
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      } else {
        return rejectWithValue('Something went wrong!');
      }
    }
  },
);
export const fetchIssues = createAsyncThunk(
  'repo/fetchIssues',
  async (repoPath: string, { rejectWithValue }) => {
    try {
      const responseData = await fetch(
        `https://api.github.com/repos/${repoPath}/issues?state=all`,
        {
          headers: {
            Authorization: `${import.meta.env.VITE_GITHUB_TOKEN}`,
          },
        },
      );

      if (!responseData.ok) {
        throw new Error('Issues Error');
      }

      const data: Issue[] = await responseData.json();

      const formattedIssues = data
        .filter((issue) => !issue.pull_request)
        .map((issue) => ({
          id: issue.id,
          title: issue.title,
          author: issue.user.login,
          authorUrl: issue.user.html_url,
          comments: issue.comments,
          status:
            issue.state === 'closed' ? StateType.Done
            : issue.assignee ? StateType.InProgress
            : StateType.ToDo,
        }));

      return {
        repoPath,
        issues: formattedIssues,
      };
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      } else {
        return rejectWithValue('Something went wrong!');
      }
    }
  },
);
