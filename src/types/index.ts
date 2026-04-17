export type TaskStatus = 'Pending' | 'Completed';
export type TaskPriority = 'Low' | 'Medium' | 'High';

export interface Task {
  id: string;
  title: string;
  status: TaskStatus;
  priority: TaskPriority;
  createdAt: string;
}

export interface TaskFilterOptions {
  searchQuery: string;
  statusFilter: TaskStatus | 'All';
  priorityFilter: TaskPriority | 'All';
}
