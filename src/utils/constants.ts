import { Column } from "../types/ColumnType";
import { StateType } from "../types/StateType";

export const columns: Column[] = [
  { title: StateType.ToDo, color: '#f8d7da' },
  { title: StateType.InProgress, color: '#fff3cd' },
  { title: StateType.Done, color: '#d4edda' },
];


