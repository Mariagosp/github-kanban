export const getOwner = async (repoPath: string) => {
  const repoResponse = await fetch(`https://api.github.com/repos/${repoPath}`);
  if (!repoResponse.ok) throw new Error('No such repository');
  const data = await repoResponse.json();
  console.log(data, 'Fetching');

  // return repoData;
  return {
    name: data.owner.login,
    url: data.owner.html_url,
    urlRepo: data.html_url,
    repoName: data.name,
    stars: data.stargazers_count,
  };
};

export const getIssues = async (repoPath: string) => {
  const responseData = await fetch(
    `https://api.github.com/repos/${repoPath}/issues?state=all`,
  );
  if (!responseData.ok) throw new Error('No such repository');
  const data = await responseData.json();
  console.log('Fetching issues', data);

  const formattedIssues = data
    .filter((issue: any) => !issue.pull_request)
    .map((issue: any) => ({
      id: issue.id,
      title: issue.title,
      author: issue.user.login,
      authorUrl: issue.user.html_url,
      comments: issue.comments,
      // status: issue.state === 'open' ? 'ToDo' : 'Done',
      status:
        issue.state === 'closed' ? 'Done'
        : issue.assignee ? 'In Progress'
        : 'ToDo',
    }));

  return formattedIssues;
  // return repoData;
};
