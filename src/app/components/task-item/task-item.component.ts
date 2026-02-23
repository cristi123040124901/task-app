import {
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Task } from '../../models/task.model';

@Component({
  selector: 'app-task-item',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './task-item.component.html',
  styleUrl: './task-item.component.css',
})
export class TaskItemComponent {
  @Input() task!: Task;
  @Output() toggleComplete =
    new EventEmitter<Task>();
  @Output() deleteTask =
    new EventEmitter<number>();

  onToggle(): void {
    this.toggleComplete.emit(this.task);
  }

  onDelete(): void {
    this.deleteTask.emit(this.task.id);
  }
}
