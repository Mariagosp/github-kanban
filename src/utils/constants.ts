import { Column } from "../components/ColumnsList/ColumnsList";

export const columns: Column[] = [
  { title: 'ToDo', color: '#f8d7da' },
  { title: 'In Progress', color: '#fff3cd' },
  { title: 'Done', color: '#d4edda' },
];

export const testIssues = [
  {
    id: 310,
    title: 'Some issue title',
    author: 'Peter',
    comments: 1,
    status: 'ToDo',
  },
  {
    id: 311,
    title: 'Some issue title',
    author: 'Maria',
    comments: 7,
    status: 'ToDo',
  },
  {
    id: 312,
    title: 'Some issue title',
    author: 'Sofia',
    comments: 4,
    status: 'In Progress',
  },
  {
    id: 313,
    title: 'Some issue title',
    author: 'Antony',
    comments: 5,
    status: 'Done',
  },
  {
    id: 314,
    title: 'Some issue title',
    author: 'Anna',
    comments: 10,
    status: 'Done',
  },
];
