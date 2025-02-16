import { Row } from 'react-bootstrap';
import { Column } from '../Column/Column';
import { useAppSelector } from '../../app/hooks';

export type Column = {
  title: 'ToDo' | 'In Progress' | 'Done';
  color: string;
}

const columns: Column[] = [
  { title: "ToDo", color: "#f8d7da" },
  { title: "In Progress", color: "#fff3cd" },
  { title: "Done", color: "#d4edda" },
];


export const ColumnsList = () => {
  const issues = useAppSelector(store => store.issues.issues);
  return (
    <Row className='d-flex flex-row gap-2 mb-5'>
      {columns.map((column) => (
        <Column
          key={column.color}
          title={column.title}
          issues={issues.filter((issue) => issue.status === column.title)}
          bgColor={column.color}
        />
      ))}
    </Row>
  );
};
