import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl = 'http://localhost:3000/users'; // Update with the correct URL for your JSON server

  constructor(private http: HttpClient) { }

  // Method to authenticate user during login
  authenticateUser(username: string, password: string): Observable<any> {
    return this.http.get<any[]>(`${this.apiUrl}?username=${username}&password=${password}`)
      .pipe(
        map(users => users.length > 0 ? users[0] : null)
      );
  }

  // Method to find user details in the forgot password flow
  findUserByDetails(username: string, email: string, mobile: string): Observable<any> {
    return this.http.get<any[]>(`${this.apiUrl}?username=${username}&email=${email}&mobile=${mobile}`)
      .pipe(
        map(users => users.length > 0 ? users[0] : null)
      );
  }
}
