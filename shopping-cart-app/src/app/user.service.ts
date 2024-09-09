import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = 'http://localhost:3000/users';
  private currentUserKey = 'currentUser';

  constructor(private http: HttpClient) {}

  // Find user by username, email, and mobile number
  findUserByDetails(username: string, email: string, mobile: number): Observable<any> {
    return this.http.get<any[]>(this.apiUrl).pipe(
      map(users => {
        const user = users.find(user => 
          user.username === username && 
          user.email === email && 
          user.mobile === +mobile // forced siya tignan as a number
        );
        return user ? user : null;
      }),
      catchError(this.handleError<any>('findUserByDetails', null))  // Return null if wala makita
    );
  }
  
  // Method to authenticate user by username and password
  authenticateUser(username: string, password: string): Observable<any> {
    return this.http.get<any[]>(this.apiUrl).pipe(
      map(users => users.find(user => user.username === username && user.password === password)),
      catchError(this.handleError<any>('authenticateUser', []))
    );
  }

  // Retrieve the current user from local storage
  getCurrentUser(): any {
    const user = localStorage.getItem(this.currentUserKey);
    return user ? JSON.parse(user) : null;
  }

  // save sa local storage
  setCurrentUser(user: any): void {
    localStorage.setItem(this.currentUserKey, JSON.stringify(user));
  }

  // para tanggal user info locally
  clearCurrentUser(): void {
    localStorage.removeItem(this.currentUserKey);
  }

  // Handle HTTP errors
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
}
