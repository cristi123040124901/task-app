import { Component, OnInit } from '@angular/core';
import { TaskService } from './services/task.service';
import { Task } from './models/task.model';
import { TaskListComponent } from './components/task-list/task-list.component';
import { Observable } from 'rxjs';
import {
  FormControl,
  FormGroup,
} from '@angular/forms';
import { TaskComponent } from './components/task/task';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [TaskListComponent, TaskComponent],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App implements OnInit {
  tasks: Task[] = [];
  taskForm = new FormGroup({
    title: new FormControl(''),
  });

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    this.loadTasks();
  }

  loadTasks(): void {
    this.taskService.getTasks().subscribe({
      next: (tasks) => (this.tasks = tasks),
      error: (err) =>
        console.error(
          'Failed to load tasks',
          err,
        ),
    });
  }

  onTaskCreated(task: Task): void {
    (
      this.taskService.addTask(
        task,
      ) as unknown as Observable<Task>
    ).subscribe({
      next: (task) =>
        (this.tasks = [task, ...this.tasks]),
      error: (err) =>
        console.error(
          'Failed to create task',
          err,
        ),
    });
  }

  onToggleComplete(task: Task): void {
    this.taskService
      .updateTask(task.id, {
        completed: !task.completed,
      })
      .subscribe({
        next: (updated) => {
          const index = this.tasks.findIndex(
            (t) => t.id === updated.id,
          );
          if (index !== -1) {
            this.tasks[index] = updated;
          }
        },
        error: (err) =>
          console.error(
            'Failed to update task',
            err,
          ),
      });
  }

  onDeleteTask(id: number): void {
    this.taskService.deleteTask(id).subscribe({
      next: () =>
        (this.tasks = this.tasks.filter(
          (t) => t.id !== id,
        )),
      error: (err) =>
        console.error(
          'Failed to delete task',
          err,
        ),
    });
  }
}
