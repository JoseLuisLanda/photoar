import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ElementformComponent } from './elementform.component';

describe('ElementformComponent', () => {
  let component: ElementformComponent;
  let fixture: ComponentFixture<ElementformComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ElementformComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ElementformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
