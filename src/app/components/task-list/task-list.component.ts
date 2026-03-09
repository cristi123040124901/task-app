import {
  Component,
  inject,
  OnDestroy,
  OnInit,
  signal,
} from '@angular/core';
import { Task } from '../../models/task.model';
import { TaskService } from '../../services/task.service';
import { Subject, takeUntil } from 'rxjs';
import { MatButtonModule } from '@angular/material/button';
import { TaskItemComponent } from '../task-item/task-item.component';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [TaskItemComponent, MatButtonModule],
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss'],
})
export class TaskListComponent
  implements OnInit, OnDestroy
{
  private readonly taskService =
    inject(TaskService);
  private readonly destroy$ = new Subject<void>();

  tasks = signal<Task[]>([]);
  isLoading = signal(true);

  ngOnInit(): void {
    this.loadTasks();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private loadTasks(): void {
    this.taskService
      .getTasks()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (tasks) => {
          this.tasks.set(tasks);
          this.isLoading.set(false);
        },
        error: (err) => {
          console.error(
            'Failed to load tasks',
            err,
          );
          this.isLoading.set(false);
        },
      });
  }

  onAddTask(): void {
    const newTask: Omit<Task, 'id'> = {
      title: 'New Task',
      completed: false,
      createdAt: new Date().toISOString(),
    };

    this.taskService.addTask(newTask);
  }

  onToggleComplete(task: Task): void {
    this.taskService
      .updateTask(task.id, {
        completed: !task.completed,
      })
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: () =>
          this.tasks.update((prev) =>
            prev.map((t) =>
              t.id === task.id
                ? {
                    ...t,
                    completed: !t.completed,
                  }
                : t,
            ),
          ),
        error: (err) =>
          console.error(
            'Failed to update task',
            err,
          ),
      });
  }

  onDeleteTask(id: number): void {
    this.taskService
      .deleteTask(id)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: () =>
          this.tasks.update((prev) =>
            prev.filter((t) => t.id !== id),
          ),
        error: (err) =>
          console.error(
            'Failed to delete task',
            err,
          ),
      });
  }
}
