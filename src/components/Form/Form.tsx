// import Form from 'react-bootstrap/Form';
import { Form, Button, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { resetRepo, setRepoUrl } from '../../app/RepoSlice';
import { resetIssues } from '../../app/IssuesSlice';
import { fetchIssues, fetchOwner } from '../../app/thunks';

type RepoUrl = {
  repoUrl: string;
};


export const FormELement = () => {
  const dispatch = useAppDispatch();
  const repoUrl = useAppSelector((store) => store.repo.repoUrl);

  const schema = yup.object().shape({
    repoUrl: yup
      .string()
      .url('Invalid URL format')
      .required('Repository URL is required'),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      repoUrl,
    },
  });

  const onSubmit = (data: RepoUrl) => {
    dispatch(setRepoUrl(data.repoUrl));
    const repoPath = data.repoUrl.replace('https://github.com/', '');
    dispatch(fetchOwner(repoPath));
    dispatch(fetchIssues(repoPath));
  };

  const handleReset = () => {
    reset();
    dispatch(resetRepo());
    dispatch(resetIssues());
  };

  return (
    <Row className="justify-content-center">
      <Col md={8}>
        <Form
          onSubmit={handleSubmit(onSubmit)}
          className="form-container"
        >
          <Form.Group className="d-flex flex-row gap-3">
            <Form.Control
              type="text"
              placeholder="Enter repo URL"
              {...register('repoUrl')}
              isInvalid={!!errors.repoUrl}
            />
            <Button
              variant="primary"
              type="submit"
              className="w-auto text-nowrap"
            >
              Load Issues
            </Button>
            <Button
              variant="secondary"
              type="button"
              onClick={handleReset}
              className="w-auto text-nowrap"
            >
              Clear
            </Button>
          </Form.Group>
          {errors.repoUrl && (
            <div
              className="text-danger"
            >
              {errors.repoUrl.message}
            </div>
          )}
        </Form>
      </Col>
    </Row>
  );
};
