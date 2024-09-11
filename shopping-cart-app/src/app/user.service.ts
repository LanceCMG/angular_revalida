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
      map(users => users.find(user => 
        user.username === username && 
        user.password === password 
        && user.active === true
        )), // sana gumana toh para sa deactivated user
      catchError(this.handleError<any>('authenticateUser', []))
    );
  }

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

  getAllUsers(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl).pipe(
      catchError(this.handleError<any[]>('getAllUsers', []))
    );
  }

  addUser(user: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, user).pipe(
      catchError(this.handleError<any>('addUser'))
    );
  }

  deactivateUser(userId: number): Observable<any> {
    return this.http.patch<any>(`${this.apiUrl}/${userId}`, { active: false }).pipe(
      catchError(this.handleError<any>('deactivateUser'))
    );
  }
  updateUser(id: number,user: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, user);
  }
  // Handle HTTP errors
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
}

export interface User {
  id: number;
  username: string;
  email: string;
  mobile: number;
  password: string;
  role: 'admin' | 'customer';
  active: boolean;
}

