import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ElementToImgComponent } from './element-to-img.component';

describe('ElementToImgComponent', () => {
  let component: ElementToImgComponent;
  let fixture: ComponentFixture<ElementToImgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ElementToImgComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ElementToImgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
