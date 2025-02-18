export interface Issue {
  id: number;
  title: string;
  user: {
    login: string;
    html_url: string;
  };
  comments: number;
  state: 'open' | 'closed';
  assignee: any; 
  pull_request?: any; 
}