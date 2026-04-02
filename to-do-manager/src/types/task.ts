// The three possible states of a task
export enum Status {
  TODO = 'to do',
  IN_PROGRESS = 'in progress',
  DONE = 'done',
}

// The shape of a task object used throughout the app
export interface Task {
  id: string
  title: string
  status: Status
}
