import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainListComponent } from './main-list.component';
import { provideHttpClient } from '@angular/common/http';

describe('MainListComponent', () => {
  let component: MainListComponent;
  let fixture: ComponentFixture<MainListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MainListComponent],
      providers: [provideHttpClient()]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MainListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
