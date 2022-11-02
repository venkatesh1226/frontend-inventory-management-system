import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogFactoryComponent } from './dialog-factory.component';

describe('DialogFactoryComponent', () => {
  let component: DialogFactoryComponent;
  let fixture: ComponentFixture<DialogFactoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogFactoryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogFactoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
