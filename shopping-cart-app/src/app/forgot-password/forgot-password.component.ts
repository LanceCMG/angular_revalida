import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user.service';

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

  onSubmit() {
    if (!this.username || !this.email || !this.mobile) {
      this.errorMessage = 'All fields are required.';
      return;
    }

    const mobileNumber = +this.mobile;  // forced para number

    if (isNaN(mobileNumber)) {
      this.errorMessage = 'Mobile number must be a valid number.';
      return;
    }

    this.userService.findUserByDetails(this.username, this.email, mobileNumber).subscribe((user: any) => {
      if (user) {
        this.router.navigate(['/acknowledgment'], { queryParams: { password: user.password } });
      } else {
        this.errorMessage = 'Invalid username, email, or mobile number.';
      }
    }, (error) => {
      this.errorMessage = 'An error occurred. Please try again later.';
      console.error('Error during findUserByDetails:', error);
    });
  }
}
