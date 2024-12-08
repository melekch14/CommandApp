import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewCommandsComponent } from './view-commands.component';

describe('ViewCommandsComponent', () => {
  let component: ViewCommandsComponent;
  let fixture: ComponentFixture<ViewCommandsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewCommandsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewCommandsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
