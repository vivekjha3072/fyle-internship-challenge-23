import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { UserReposComponent } from './user-repos.component';
import { ApiService } from '../services/api.service';

describe('UserReposComponent', () => {
  let component: UserReposComponent;
  let fixture: ComponentFixture<UserReposComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserReposComponent],
      imports: [FormsModule, HttpClientModule], 
      providers: [ApiService], 
    });


    fixture = TestBed.createComponent(UserReposComponent);
    component = fixture.componentInstance;
    
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  
  it('should update currentPage on onPageChange', () => {
    const initialPage = component.currentPage;
    component.onPageChange(initialPage + 1);
    expect(component.currentPage).toEqual(initialPage + 1);
  });
});
