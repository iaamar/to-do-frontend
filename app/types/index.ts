export interface Task {
    id: string;
    title: string;
    color: string;
    completed: boolean;
    createdAt: Date;
    updatedAt: Date;
  }
  
  export type CreateTaskInput = {
    title: string;
    color: string;
  };
  
  export type UpdateTaskInput = Partial<CreateTaskInput> & {
    completed?: boolean;
  };