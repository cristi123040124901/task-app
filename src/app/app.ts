import { Component, OnInit } from '@angular/core';
import { TaskListComponent } from './components/task-list/task-list.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [TaskListComponent],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {}
