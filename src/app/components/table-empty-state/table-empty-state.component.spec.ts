import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableEmptyStateComponent } from './table-empty-state.component';

describe('TableEmptyStateComponent', () => {
  let component: TableEmptyStateComponent;
  let fixture: ComponentFixture<TableEmptyStateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TableEmptyStateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TableEmptyStateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
