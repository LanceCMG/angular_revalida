import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service'; // Adjust the import path as necessary

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
})
export class ProfileComponent implements OnInit {
  user: any;
  isEditing: boolean = false;
  userId!: number; 

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.loadUser();
    
  }
  loadUser(): void {
    const currentUser = this.userService.getCurrentUser();
    if (currentUser) {
      this.user = currentUser;
      this.userId = this.user.id; // Set userId for further updates
    }
  }

  editUser(): void {
    this.isEditing = true;
  }


  updateUser(): void {
    if (this.userId) {
      this.userService.updateUser(this.userId, this.user).subscribe(
        (response) => {
          console.log('User updated successfully:', response);
          this.userService.setCurrentUser(response);
          this.loadUser(); // Reload user data to reflect changes
          this.isEditing = false; // Exit editing mode
        },
        (error) => {
          console.error('Error updating user:', error);
        }
      );
    }
  }
  

  cancelEdit(): void {
    this.isEditing = false;
    this.loadUser(); // Reload user data to discard changes
  }
}
