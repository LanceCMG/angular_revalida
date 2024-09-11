import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private userService: UserService, private router: Router) {}

  onSubmit() {
    this.login();
  }

  login() {
    this.userService.authenticateUser(this.username, this.password).subscribe((user: any) => {
      console.log('Authenticated user:', user);
      if (user) {
        // Sa local storage toh
        this.userService.setCurrentUser(user);

        console.log('User role:', user.role); // Log role kasi nag-eerror
        if (user.role === 'admin') {
          this.router.navigate(['/dashboard-admin']);
        } else if (user.role === 'customer') {
          this.router.navigate(['/dashboard']);
        } else {
          this.errorMessage = 'Invalid role';
        }
      } else {
        this.errorMessage = 'Invalid username or password';
      }
    });
  }
}