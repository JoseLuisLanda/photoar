import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ElementcardComponent } from './elementcard.component';

describe('ElementcardComponent', () => {
  let component: ElementcardComponent;
  let fixture: ComponentFixture<ElementcardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ElementcardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ElementcardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
