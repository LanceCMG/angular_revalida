import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = 'http://localhost:3000/users';

  constructor(private http: HttpClient) {}


  findUserByDetails(username: string, email: string, mobile: number): Observable<any> {
    return this.http.get<any[]>(this.apiUrl).pipe(
      map(users => {
        const user = users.find(user => 
          user.username === username && 
          user.email === email && 
          user.mobile === +mobile // forced siya tignan as a unmber
        );
        return user ? user : null;
      }),
      catchError(this.handleError<any>('findUserByDetails', null))  // Return null if wala makita
    );
  }
  
  

  authenticateUser(username: string, password: string): Observable<any> {
    return this.http.get<any[]>(this.apiUrl).pipe(
      map(users => users.find(user => user.username === username && user.password === password)),
      catchError(this.handleError<any>('authenticateUser', []))
    );
  }

  // Handle HTTP errors
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
}
