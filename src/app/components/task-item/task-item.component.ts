import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  input,
  output,
  Output,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Task } from '../../models/task.model';
import {
  FormControl,
  ReactiveFormsModule,
} from '@angular/forms';

@Component({
  selector: 'app-task-item',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
  ],
  templateUrl: './task-item.component.html',
  styleUrl: './task-item.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskItemComponent {
  task = input.required<Task>();
  toggle = output<Task>();
  deleteTask = output<number>();

  taskTitleControl = new FormControl('');

  get priorityClass(): string {
    return `priority-${this.task().priority}`;
  }

  get priorityLabel(): string {
    return {
      high: 'High',
      medium: 'Medium',
      low: 'Low',
    }[this.task().priority];
  }

  onToggle(): void {
    this.toggle.emit(this.task());
  }

  onDelete(): void {
    this.deleteTask.emit(this.task().id);
  }
}
