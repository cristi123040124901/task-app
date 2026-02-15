import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { TransformedItem } from '../../models/dashboard.model';

@Component({
  selector: 'app-card',
  template: `
    <div class="card">
      <h3>{{ data.title }}</h3>
      <p>{{ data.formatted }}</p>
      <span [class.active]="isActive">
        {{ isActive ? 'Active' : 'Inactive' }}
      </span>
      <div class="metadata">
        Views: {{ data.metadata.views }} | Clicks: {{ data.metadata.clicks }}
      </div>
    </div>
  `,
  styles: [`
    .card {
      border: 1px solid #ddd;
      padding: 16px;
      margin: 8px;
      border-radius: 4px;
    }
    .active { color: green; }
  `],
  // Problem: Using Default change detection
  changeDetection: ChangeDetectionStrategy.Default,
  standalone:true,

})
export class CardComponent {
  @Input() data!: TransformedItem;
  @Input() isActive!: boolean;

  constructor() {
    console.log('CardComponent created');
  }

  ngOnChanges() {
    console.log('CardComponent ngOnChanges called for:', this.data?.id);
  }
}