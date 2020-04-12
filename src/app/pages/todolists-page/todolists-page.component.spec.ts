import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TodolistsPageComponent } from './todolists-page.component';

describe('TodolistsPageComponent', () => {
  let component: TodolistsPageComponent;
  let fixture: ComponentFixture<TodolistsPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TodolistsPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TodolistsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
