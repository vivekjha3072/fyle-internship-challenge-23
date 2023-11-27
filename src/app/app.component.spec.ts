import { ComponentFixture,TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms'; 
import { HttpClientModule } from '@angular/common/http';
import { UserReposComponent } from './user-repos/user-repos.component';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  beforeEach(() => {TestBed.configureTestingModule({
    declarations: [AppComponent, UserReposComponent ],
    imports: [ FormsModule ,HttpClientModule],
  })
  fixture = TestBed.createComponent(AppComponent);
  component = fixture.componentInstance;
  fixture.detectChanges();
});

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  

  it('should have the correct title', () => {
    expect(component.title).toBe('fyle-frontend-challenge app is running!');
  });
});
