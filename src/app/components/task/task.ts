import { Component, input, output, signal } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-task',
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, FormsModule],
  templateUrl: './task.html',
  styleUrl: './task.css',
})
export class TaskComponent {
  taskCreated = output<void>();
  form = input<FormGroup | null>(null);
  control = input.required<FormControl>();

  taskTitle = signal('');

  onSubmit(): void {
    this.taskCreated.emit();
  }
}
