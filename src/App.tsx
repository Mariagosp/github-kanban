import { Col, Container } from 'react-bootstrap';
import { FormELement } from './components/Form/Form';
import { IssueType } from './types/IssueType';
import { Row } from 'react-bootstrap';
import { ColumnsList } from './components/ColumnsList/ColumnsList';
import { DndContext, DragEndEvent } from '@dnd-kit/core';
import { arrayMove } from '@dnd-kit/sortable';
import ArrowRight from '../public/icons/icon(Arrow-Right).svg';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { setIssues } from './app/IssuesSlice';

export const App = () => {
  const dispatch = useAppDispatch();

  const owner = useAppSelector((store) => store.repo.owner);
  const issues = useAppSelector((store) => store.issues.issues);
  const isLoading = useAppSelector((store) => store.repo.loading);
  const errorRepo = useAppSelector((store) => store.repo.error);
  const errorIssues = useAppSelector((store) => store.issues.error);
  const repoUrl = useAppSelector((store) => store.repo.repoUrl);

  const repoPath = repoUrl.replace('https://github.com/', '');
  console.log(issues);
  console.log('owner', owner);

  const handleDragOver = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over) return;

    const activeId = active.id;
    const overId = over.id;

    if (activeId === overId) return;

    const isActiveATask = active.data.current?.type === 'Issue';
    const isOverATask = over.data.current?.type === 'Issue';

    if (!isActiveATask) return;

    if (isActiveATask && isOverATask) {
      if (!issues[repoPath]) return [];

      const activeIndex = issues[repoPath]?.findIndex(
        (issue) => issue.id === activeId,
      );
      const overIndex = issues[repoPath]?.findIndex(
        (issue) => issue.id === overId,
      );

      const updatedIssues = issues[repoPath].map((issue, index) =>
        index === activeIndex ?
          { ...issue, status: issues[repoPath][overIndex].status }
        : issue,
      );

      dispatch(
        setIssues({
          repoPath,
          issues: arrayMove(updatedIssues, activeIndex, overIndex),
        }),
      );
    }

    const isOverAColumn = over.data.current?.type === 'Column';

    if (isActiveATask && isOverAColumn) {
      if (!issues) return [];

      const activeIndex = issues[repoPath].findIndex(
        (issue) => issue.id === activeId,
      );

      const updatedIssues = issues[repoPath].map((issue, index) =>
        index === activeIndex ?
          { ...issue, status: overId as IssueType['status'] }
        : issue,
      );

      dispatch(
        setIssues({
          repoPath,
          issues: arrayMove(updatedIssues, activeIndex, activeIndex),
        }),
      );
    }
  };

  return (
    <>
      <Container className="mt-4">
        <Row className="mb-3">
          <FormELement />
        </Row>
        {errorRepo && errorIssues && (
          <Row>
            <Col>
              <div
                className="alert alert-danger"
                role="alert"
              >
                Oops! It seems like something went wrong.. Try again!!!
              </div>
            </Col>
          </Row>
        )}
        {isLoading && (
          <div
            className="d-flex justify-content-center align-items-center"
            style={{ minHeight: '100vh' }}
          >
            <div
              className="spinner-border"
              role="status"
            >
              <span className="sr-only"></span>
            </div>
          </div>
        )}
        {!errorIssues && !errorRepo && !isLoading && owner.name && (
          <>
            <Row className="mb-5">
              <h5 className="d-flex align-items-center gap-2">
                <a
                  href={`${owner?.url}`}
                  target="_blank"
                >
                  {owner?.name}
                </a>
                <img
                  src={ArrowRight}
                  alt="Arrow Right"
                />
                <a
                  href={`${owner?.urlRepo}`}
                  target="_blank"
                >
                  {owner?.repoName}
                </a>
              </h5>
              <p>⭐ {owner?.stars} stars</p>
            </Row>
            <DndContext
              onDragOver={handleDragOver}
            >
              <ColumnsList />
            </DndContext>
          </>
        )}
      </Container>
    </>
  );
};
