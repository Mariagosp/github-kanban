import { Container } from 'react-bootstrap';
import './App.css';
import { FormELement } from './components/Form/Form';
import { IssueType } from './types/IssueType';
import { Row } from 'react-bootstrap';
import { Column, ColumnsList } from './components/ColumnsList/ColumnsList';
import { useState } from 'react';
import { DndContext, DragEndEvent } from '@dnd-kit/core';
import { arrayMove } from '@dnd-kit/sortable';
import ArrowRight from '../public/icons/icon(Arrow Right).svg?react';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { setIssues } from './app/IssuesSlice';

const columns: Column[] = [
  { title: 'ToDo', color: '#f8d7da' },
  { title: 'In Progress', color: '#fff3cd' },
  { title: 'Done', color: '#d4edda' },
];

const testIssues = [
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

export const App = () => {
  // const [issues, setIssues] = useState<IssueType[] | null>(null);
  const owner = useAppSelector((store) => store.repo.owner);
  const issues = useAppSelector((store) => store.issues.issues);
  const dispatch = useAppDispatch();

  // const [repoUrl, setRepoUrl] = useState<string>('');
  // const [owner, setOwner] = useState<Owner | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  // const fetchGitHubData = (repoPath: string) => {
  // setIsLoading(true);
  // setError('');

  // dispatch(fetchOwner(repoPath));
  // dispatch(fetchIssues(repoPath));

  // getOwner(repoPath)
  //   .then((data) => {
  //     dispatch(
  //       setOwner({
  //         name: data.owner.login,
  //         url: data.owner.html_url,
  //         urlRepo: data.html_url,
  //         repoName: data.name,
  //         stars: data.stargazers_count,
  //       }),
  //     );
  //   })
  //   .catch(() => dispatch(setRepoError('Something went wrong')));

  // getIssues(repoPath)
  //   .then((issues) => {
  //     console.log('issues', issues);
  //     const formattedIssues = issues.map((issue) => ({
  //       id: issue.id,
  //       title: issue.title,
  //       author: issue.user.login,
  //       authorUrl: issue.user.html_url,
  //       comments: issue.comments,
  //       status: issue.state === 'open' ? 'ToDo' : 'Done',
  //     }));
  //     console.log('formattedIssues', formattedIssues);
  //     dispatch(setIssues(formattedIssues));
  //   })
  //   .catch(() => setError('Something went wrong'))
  //   .finally(() => setIsLoading(false));
  // };

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
      dispatch(
        setIssues((prev: IssueType[]) => {
          if (!prev) return [];
          const activeIndex = prev?.findIndex(
            (issue) => issue.id === activeId,
          );
          const overIndex = prev?.findIndex((issue) => issue.id === overId);

          prev[activeIndex].status = prev[overIndex].status;

          return arrayMove(prev, activeIndex, overIndex);
        })
        // setIssues({
        //   repoUrl: repoUrl,
        //   issues: (prev: IssueType[]) => {
        //     if (!prev) return [];
        //     const activeIndex = prev?.findIndex(
        //       (issue) => issue.id === activeId,
        //     );
        //     const overIndex = prev?.findIndex((issue) => issue.id === overId);

        //     prev[activeIndex].status = prev[overIndex].status;

        //     return arrayMove(prev, activeIndex, overIndex);
        //   },
        // }),
      );
    }

    const isOverAColumn = over.data.current?.type === 'Column';

    if (isActiveATask && isOverAColumn) {
      dispatch(
        setIssues((prev: IssueType[]) => {
          if (!prev) return [];
          const activeIndex = prev.findIndex(
            (issue) => issue.id === activeId,
          );
          prev[activeIndex].status = overId as IssueType['status'];

          return arrayMove(prev, activeIndex, activeIndex);
        })
      );
    }
  };
  console.log('issues!!!!!', issues);

  return (
    <>
      <Container className="mt-4">
        <Row className="mb-3">
          <FormELement
          // setRepoUrl={setRepoUrl}
          // fetchGitHubData={fetchGitHubData}
          />
        </Row>
        {isLoading ?
          <p>Loading...</p>
        : <>
            {issues.length !== 0 && (
            <>
              <Row className="mb-5">
                <h5 className="d-flex align-items-center gap-2">
                  <a href={`${owner?.url}`}>{owner?.name}</a>
                  <ArrowRight />
                  <a href={`${owner?.urlRepo}`}>{owner?.repoName}</a>
                </h5>
                <p>⭐ {owner?.stars} stars</p>
              </Row>
              <DndContext
                // onDragEnd={handleDragEnd}
                onDragOver={handleDragOver}
              >
                <ColumnsList />
              </DndContext>
            </>
            )} 
          </>
        }
      </Container>
    </>
  );
};

{
  /* <Row>
          {['ToDo', 'In Progress', 'Done'].map((status) => (
            <Column
              key={status}
              title={status}
              issues={issues.filter((issue) => issue.status === status)}
            />
          ))}
        </Row> */
}

// useEffect(() => {
//   if (!repoUrl) return;
//   setIsLoading(true);
//   setError('');
//   const repoPath = repoUrl.replace('https://github.com/', '');
//   console.log('Repository path:', repoPath);
//   getOwner(repoPath)
//     .then((owner) => {
//     // console.log('owner', owner);
//     setOwner({
//       name: owner.login,
//       url: owner.html_url,
//     });
//     })
//     .catch(() => setError('something went wrong'))
//     .finally(() => setIsLoading(false))
// }, [repoUrl]);
