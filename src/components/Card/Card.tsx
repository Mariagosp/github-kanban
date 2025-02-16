import { Card } from "react-bootstrap";
import { IssueType } from "../../types/IssueType";
import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from '@dnd-kit/utilities';

type Props = {
  issue: IssueType;
}

export const IssueCard: React.FC<Props> = ({ issue }) => {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: issue.id,
    data: {
      type: 'Issue',
      issue,
    }
  });

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
    opacity: isDragging ? 0.5 : 1,
    zIndex: isDragging ? 1000 : 'auto',
  }

  return (
    <Card
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      className="p-2 shadow-sm"
      style={style}
    >
      <Card.Body>
        <Card.Title>{issue.title}</Card.Title>
        <Card.Text>
          #{issue.id}<br />
          <a href={`${issue.authorUrl}`} target="_blank" rel="noopener noreferrer">{issue.author} </a>
          | Comments: {issue.comments}
        </Card.Text>
      </Card.Body>
    </Card>
  )
}