import {
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Task } from '../../models/task.model';
import { TaskItemComponent } from '../task-item/task-item.component';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [CommonModule, TaskItemComponent],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.css',
})
export class TaskListComponent {
  @Input() tasks: Task[] = [];
  @Output() toggleComplete =
    new EventEmitter<Task>();
  @Output() deleteTask =
    new EventEmitter<number>();

  onToggle(task: Task): void {
    this.toggleComplete.emit(task);
  }

  onDelete(id: number): void {
    this.deleteTask.emit(id);
  }
}
