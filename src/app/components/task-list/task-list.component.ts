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
import { FormControl } from '@angular/forms';

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

  readonly totalCount =
    this.taskService.totalCount;
  readonly doneCount = this.taskService.doneCount;
  readonly pendingCount =
    this.taskService.pendingCount;

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
      title: '',
      createdAt: new Date().toISOString(),
      category: 'General',
      priority: 'medium',
      done: false,
    };

    this.taskService.addTask(newTask);
  }

  onToggle(task: Task): void {
    console.log(
      'Toggling task in task list:',
      task,
    );
    this.taskService
      .updateTask(task.id, { done: !task.done })
      .pipe(takeUntil(this.destroy$))
      .subscribe();
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
