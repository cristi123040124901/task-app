import { Component, EventEmitter, Output, signal } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Task } from '../../models/task.model';

@Component({
  selector: 'app-task-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './task-form.component.html',
  styleUrl: './task-form.component.css',
})
export class TaskFormComponent {
  @Output() taskCreated = new EventEmitter<Task>();
  taskForm = new FormGroup({
    title: new FormControl(''),
  });
  taskTitle = signal('');

  onSubmit(): void {
    this.taskCreated.emit();
  }

  getFormControl(fieldId: string) {
    return this.taskForm()?.get(fieldId) as FormControl;
  }
}
