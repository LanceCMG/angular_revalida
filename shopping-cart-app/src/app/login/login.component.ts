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
  
  
  
  // password peekaboo
  togglePasswordVisibility() {
    const passwordField = document.getElementById('password') as HTMLInputElement;
    const togglePasswordIcon = document.getElementById('togglePassword') as HTMLElement;

    if (passwordField.type === 'password') {
      passwordField.type = 'text';
      togglePasswordIcon.classList.remove('fa-eye');
      togglePasswordIcon.classList.add('fa-eye-slash');
    } else {
      passwordField.type = 'password';
      togglePasswordIcon.classList.remove('fa-eye-slash');
      togglePasswordIcon.classList.add('fa-eye');
    }
  }
}
