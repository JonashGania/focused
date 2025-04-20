export type SignUpPayload = {
  email: string;
  password: string;
  firstName: string;
};

export type LoginPayload = {
  email: string;
  password: string;
};

export type Tasks = {
  id: number;
  inserted_at: string;
  is_complete: boolean;
  task: string;
  user_id: string;
};

export type TaskAction =
  | { action: "delete"; task: Tasks }
  | { action: "updateTask"; task: Tasks }
  | { action: "reorderTasks"; tasks: Tasks[] };
