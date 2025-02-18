# Kanban Board

Implemented GitHub repo issues viewer as a kanban board.

## This App:
1. loads issues for the repo using Github API.
   
I've used `https://api.github.com/repos/${repoPath}/issues?state=all` link for fetching data from Github API. 

I've implemented filtering so that for this request I only have issues, and not issues with pull requests.

3. contains 3 columns:
- ToDo (all new issues)
- In Progress (opened issues with assignee)
- Done (closed issues)

3. User can drag-n-drop card with issues between the columns and change the order of issues.
4. User can visit the profile of the owner of the repo and visit the repo as well by links under the input.
5. As a UI library I have used React-Bootstrap.
6. As a state manager I've used Redux-Toolkit. And for storing data between search and browser sessions I've used Redux Persist.
7. Proper error handling is in place to manage failed API requests.
8. Only 30 issues and pull requests are loaded at a time to avoid overloading the page and to ensure a faster experience for users.

### Technologies Used:
- **React**: A library for building the user interface.
- **TypeScript**: For type safety and better developer experience.
- **Redux Toolkit**: Used for state management.
- **React-Bootstrap**: UI components library for faster styling and responsive design.
- **GitHub API**: For fetching repository and issue data.
- **Redux Persist**: For persisting state across browser sessions.
- **Error Handling**: Implemented proper error handling for API calls to provide feedback to the user when something goes wrong.



#### Visit the demo page here: https://kanban-board-mariia.netlify.app/

Thank you for your time and attention!
