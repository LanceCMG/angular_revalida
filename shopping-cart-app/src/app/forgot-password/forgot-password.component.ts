import { Component } from '@angular/core';
import { UserService } from '../user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent {
  username: string = '';
  email: string = '';
  mobile: string = '';
  errorMessage: string = '';

  constructor(private userService: UserService, private router: Router) {}

  onSubmit(): void {
    this.userService.findUserByDetails(this.username, this.email, this.mobile).subscribe((user: any) => {
      if (user) {
        alert(`Your password is: ${user.password}`);
        this.router.navigate(['/login']);
      } else {
        this.errorMessage = 'Invalid details';
      }
    });
  }
}