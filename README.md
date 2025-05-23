
# RTC-TaskBoard

Hi, This is a Real Time Collaboration Task Board just like Trello or JIRA. Right now it is not real time because i have only build frontend. Can make it real time using soket.io or firebase.

In this React project you can create, update and delete columns like Todo, InProgress, In Review, QA, Done etc. In each column user can create Tasks, update them and add comments to each task. User can move tasks from one column to other seamlessly.




## Live

You can try the App on:- https://rtc-task-board.vercel.app/


## Run Locally

Clone the project

```bash
  git clone https://github.com/HirsuiteCrown/RTC-TaskBoard.git
```

Go to the project directory

```bash
  cd frontend
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm run dev
```


## Tech Stack

**Client:** React, Context, TailwindCSS, dnd-kit

## Features

- User can create, update and delete columns.
- User can create, update and delete tasks in each column.
- User can add comments on any tasks
- User can drag and drop tasks from one column to other.


## Optimizations

Right Now it is just a small project with very less features. We can add many features like:-

    1. First, build a robust backend for proper authentication and team/project management.
    2. Add a real-time collaboration feature.
    3. Include task assignment functionality — showing which task is assigned to whom.
    4. Implement an automatic task assignment pipeline — for example, all QA tasks can be automatically assigned to a specific person.
    5. Enable filtering based on priority.


## License

[MIT](https://choosealicense.com/licenses/mit/)

