import { Injectable } from '@angular/core';
import { Observable, of, delay } from 'rxjs';
import { DashboardItem } from '../models/dashboard.model';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  // Simulating a large dataset
  private generateMockData(): DashboardItem[] {
    return Array.from({ length: 1000 }, (_, i) => ({
      id: i + 1,
      title: `Item ${i + 1}`,
      value: `value_${i + 1}`,
      status: ['active', 'inactive', 'pending'][Math.floor(Math.random() * 3)] as any,
      lastUpdated: new Date(),
      metadata: {
        views: Math.floor(Math.random() * 1000),
        clicks: Math.floor(Math.random() * 500)
      }
    }));
  }

  getDashboardData(): Observable<DashboardItem[]> {
    return of(this.generateMockData()).pipe(delay(500));
  }

  updateItem(id: number): Observable<DashboardItem> {
    const item = this.generateMockData().find(i => i.id === id)!;
    return of(item).pipe(delay(200));
  }
}