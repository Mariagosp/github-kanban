import { StateType } from "./StateType";

export type IssueType = {
  id: number;
  title: string;
  author: string;
  authorUrl: string;
  comments: number;
  status: StateType;
}; 
