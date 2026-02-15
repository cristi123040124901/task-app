import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../../services/dashboard.service';
import { DashboardItem, TransformedItem } from '../../models/dashboard.model';
import { CardComponent } from '../card/card';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  template: `
    <div class="dashboard">
      <div class="header">
        <h2>Dashboard ({{ items.length }} items)</h2>
        <button (click)="refresh()">Refresh</button>
        <button (click)="addItem()">Add Item</button>
        <button (click)="triggerChangeDetection()">Update Random</button>
      </div>

      <div class="filters">
        <input 
          type="text" 
          [(ngModel)]="searchTerm" 
          placeholder="Search..."
          (input)="onSearch()"
        />
        <select [(ngModel)]="filterStatus">
          <option value="">All</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
          <option value="pending">Pending</option>
        </select>
      </div>

      <div class="stats">
        Total Value: {{ calculateTotalValue() }}
      </div>

      <div class="grid">
        <!-- PROBLEM 1: Function calls in template -->
        <app-card 
          *ngFor="let item of getFilteredItems()"
          [data]="transformData(item)" 
          [isActive]="checkActive(item)">
        </app-card>
      </div>

      <div class="loading" *ngIf="isLoading">
        Loading... {{ getCurrentTime() }}
      </div>
    </div>
  `,
  styles: [`
    .dashboard {
      padding: 20px;
    }
    .header {
      display: flex;
      justify-content: space-between;
      margin-bottom: 20px;
    }
    .filters {
      margin-bottom: 20px;
    }
    .filters input, .filters select {
      margin-right: 10px;
      padding: 8px;
    }
    .grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
      gap: 16px;
    }
    .stats {
      background: #f5f5f5;
      padding: 10px;
      margin-bottom: 20px;
    }
  `],
  imports: [CardComponent, FormsModule, CommonModule],
})
export class DashboardComponent implements OnInit {
  items: DashboardItem[] = [];
  searchTerm = '';
  filterStatus = '';
  isLoading = false;

  constructor(private dashboardService: DashboardService) {}

  ngOnInit() {
    this.loadData();
    
    // PROBLEM 2: Unnecessary interval causing constant change detection
    setInterval(() => {
      this.isLoading = !this.isLoading;
    }, 2000);
  }

  loadData() {
    this.isLoading = true;
    this.dashboardService.getDashboardData().subscribe(data => {
      this.items = data;
      this.isLoading = false;
    });
  }

  // PROBLEM 3: Heavy computation in method called from template
  transformData(item: DashboardItem): TransformedItem {
    console.log('🔴 Transform called for:', item.id);
    // Simulating expensive operation
    for (let i = 0; i < 1000; i++) {
      Math.sqrt(i);
    }
    
    return {
      id: item.id,
      title: item.title,
      formatted: item.value.toUpperCase(),
      displayStatus: this.getStatusDisplay(item.status),
      metadata: item.metadata
    };
  }

  // PROBLEM 4: Non-deterministic function in template
  checkActive(item: DashboardItem): boolean {
    console.log('🔴 CheckActive called for:', item.id);
    // This changes on every check!
    return new Date().getTime() % 2 === 0;
  }

  // PROBLEM 5: Filtering in template
  getFilteredItems(): DashboardItem[] {
    console.log('🔴 GetFilteredItems called');
    let filtered = this.items;

    if (this.searchTerm) {
      filtered = filtered.filter(item => 
        item.title.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    }

    if (this.filterStatus) {
      filtered = filtered.filter(item => item.status === this.filterStatus);
    }

    return filtered;
  }

  // PROBLEM 6: Heavy calculation on every change detection
  calculateTotalValue(): number {
    console.log('🔴 CalculateTotalValue called');
    return this.items.reduce((sum, item) => {
      // Expensive operation
      for (let i = 0; i < 100; i++) {
        Math.sqrt(i);
      }
      return sum + item.metadata.views;
    }, 0);
  }

  getCurrentTime(): string {
    return new Date().toLocaleTimeString();
  }

  getStatusDisplay(status: string): string {
    const map: Record<string, string> = {
      active: 'Active ✓',
      inactive: 'Inactive ✗',
      pending: 'Pending ⏳'
    };
    return map[status] || status;
  }

  refresh() {
    // PROBLEM 7: Creating new array reference unnecessarily
    this.items = [...this.items];
  }

  addItem() {
    const newItem: DashboardItem = {
      id: this.items.length + 1,
      title: `New Item ${this.items.length + 1}`,
      value: `new_value_${this.items.length + 1}`,
      status: 'active',
      lastUpdated: new Date(),
      metadata: { views: 0, clicks: 0 }
    };
    this.items = [...this.items, newItem];
  }

  triggerChangeDetection() {
    const randomIndex = Math.floor(Math.random() * this.items.length);
    this.items[randomIndex].metadata.views++;
    // PROBLEM 8: Mutating without triggering change detection properly
  }

  onSearch() {
    // PROBLEM 9: No debouncing, triggers on every keystroke
    console.log('🔴 Search triggered:', this.searchTerm);
  }
}