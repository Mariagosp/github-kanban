import { Col } from 'react-bootstrap';
import { IssueType } from '../../types/IssueType';
import { IssueCard } from '../Card/Card';
import { useDroppable } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';

type Props = {
  title: 'ToDo' | 'In Progress' | 'Done';
  issues: IssueType[];
  bgColor: string;
};

export const Column: React.FC<Props> = ({ title, issues, bgColor }) => {
  const { setNodeRef } = useDroppable({
    id: title,
    data: {
      type: 'Column'
    }
  });
  return (
    <Col
      className="d-flex flex-column gap-3 p-3 rounded shadow-sm"
      style={{ backgroundColor: bgColor, minHeight: '400px' }}
      ref={setNodeRef}
    >
      <h5 className="text-center">{title}</h5>
      {/* <Card className="p-2 bg-light d-flex flex-column gap-2"> */}
      <SortableContext items={issues.map(issue => issue.id)} strategy={verticalListSortingStrategy}>
        {issues.map((issue) => (
          <IssueCard
            key={issue.id}
            issue={issue}
          />
        ))}
      </SortableContext>
      {/* </Card> */}
    </Col>
  );
};
