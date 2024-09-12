import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { User } from '../user.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  users: User[] = [];
  newUser = {
    username: '', 
            password: '',
            firstName: '',
            lastName: '',
            email: '', 
            mobile: '', 
            role: ''
  };
  errorMessage: string | null = null;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.userService.getAllUsers().subscribe(
      (users) => {
        this.users = users;
      },
      (error) => {
        this.errorMessage = 'Failed to load users';
        console.error(error);
      }
    );
  }

  addUser(): void {
    if (this.newUser.username && 
      this.newUser.password &&
      this.newUser.firstName &&
      this.newUser.lastName &&
      this.newUser.email && 
      this.newUser.mobile) {
      this.userService.addUser(this.newUser).subscribe(
        () => {
          this.loadUsers(); 
          this.newUser = { 
            username: '', 
            password: '',
            firstName: '',
            lastName: '',
            email: '', 
            mobile: '', 
            role: '' };
        },
        (error) => {
          this.errorMessage = 'Failed to add user';
          console.error(error);
        }
      );
    } else {
      this.errorMessage = 'All fields are required';
    }
  }

  deactivateUser(userId: number): void {
    this.userService.deactivateUser(userId).subscribe(
      () => {
        this.loadUsers();
      },
      (error) => {
        this.errorMessage = 'Failed to deactivate user';
        console.error(error);
      }
    );
  }

  activateUser(userId: number): void {
    this.userService.activateUser(userId).subscribe(
      () => {
        this.loadUsers();
      },
      (error) => {
        this.errorMessage = 'Failed to activate user';
        console.error(error);
      }
    );
  }
}
