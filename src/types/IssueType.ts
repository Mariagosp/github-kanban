export type IssueType = {
  id: number;
  title: string;
  author: string;
  authorUrl: string;
  comments: number;
  status: 'ToDo' | 'In Progress' | 'Done';
}; 
