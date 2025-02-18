import { Row } from 'react-bootstrap';
import { Column } from '../Column/Column';
import { useAppSelector } from '../../app/hooks';
import { columns } from '../../utils/constants';
import 'bootstrap/dist/css/bootstrap.min.css';

export const ColumnsList = () => {
  const issues = useAppSelector((store) => store.issues.issues);
  const repoUrl = useAppSelector((store) => store.repo.repoUrl);

  const repoPath = repoUrl.replace('https://github.com/', '');
  const repoIssues = issues[repoPath] || [];

  return (
    <>
      {repoIssues.length === 0 ?
        <div className="alert alert-primary" role="alert">
        Oops! It seems that this repository is issue-free yet!
      </div>
      : <Row className="d-flex flex-row gap-2 mb-5">
          {columns.map((column) => (
            <Column
              key={column.color}
              title={column.title}
              issues={repoIssues.filter(
                (issue) => issue.status === column.title,
              )}
              bgColor={column.color}
            />
          ))}
        </Row>
      }
    </>
  );
};
