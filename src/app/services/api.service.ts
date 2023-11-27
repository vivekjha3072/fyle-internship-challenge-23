import { HttpClient,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError} from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private apiUrl = 'https://api.github.com/users';

  constructor(private httpClient: HttpClient) { }

  getUser(githubUsername: string): Observable<any> {
    return this.httpClient.get(`${this.apiUrl}/${githubUsername}`).pipe(catchError(this.handleError));
  }

  // implement getRepos method by referring to the documentation. Add proper types for the return type and params 
  getRepos(githubUsername:string, page: number = 1, perPage: number = 10): Observable<any[]>{
    const params = new HttpParams().set('page', page.toString()).set('per_page', perPage.toString());
    return this.httpClient.get<any[]>(`${this.apiUrl}/${githubUsername}/repos`, { params }).pipe(catchError(this.handleError));
  }
  getLanguages(languagesUrl: string): Observable<any> {
    return this.httpClient.get<any>(languagesUrl).pipe(catchError(this.handleError));
  }
  private handleError(error:any){
    console.error('API Service Error:',error);
    return throwError('An error occurred while calling the API');
  }
}
