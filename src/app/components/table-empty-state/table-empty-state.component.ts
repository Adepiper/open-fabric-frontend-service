import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-table-empty-state',
  templateUrl: './table-empty-state.component.html',
  styleUrls: ['./table-empty-state.component.scss'],
  standalone: true,
  imports: [CommonModule],
})
export class TableEmptyStateComponent implements OnInit {
  @Input() name = '';
  @Input() type = 'TABLE';

  constructor() {}

  ngOnInit(): void {}
}
