import {
  inject,
  Injectable,
} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Task } from '../models/task.model';
import {
  addDoc,
  collection,
  collectionData,
  Firestore,
  updateDoc,
  deleteDoc,
  doc,
} from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private apiUrl = '/api/tasks';
  private firestore = inject(Firestore);
  private tasksCollection = collection(
    this.firestore,
    'tasks',
  );

  constructor(private http: HttpClient) {}

  getTasks(): Observable<Task[]> {
    return collectionData(this.tasksCollection, {
      idField: 'id',
    }) as Observable<Task[]>;
  }

  async addTask(
    task: Omit<Task, 'id'>,
  ): Promise<void> {
    try {
      await addDoc(this.tasksCollection, task);
    } catch (err) {
      console.error('Error adding task:', err);
    }
  }

  updateTask(
    id: number,
    updates: Partial<Task>,
  ): Observable<Task> {
    return new Observable((observer) => {
      updateDoc(
        doc(this.firestore, 'tasks', String(id)),
        updates as any,
      )
        .then(() => {
          observer.next({
            id,
            ...updates,
          } as Task);
          observer.complete();
        })
        .catch((err) => observer.error(err));
    });
  }

  deleteTask(id: number): Observable<void> {
    return new Observable((observer) => {
      deleteDoc(
        doc(this.firestore, 'tasks', String(id)),
      )
        .then(() => {
          observer.next();
          observer.complete();
        })
        .catch((err) => observer.error(err));
    });
  }
}
