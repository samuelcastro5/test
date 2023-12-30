import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SkusComponent } from './skus.component';

describe('SkusComponent', () => {
  let component: SkusComponent;
  let fixture: ComponentFixture<SkusComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SkusComponent]
    });
    fixture = TestBed.createComponent(SkusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
