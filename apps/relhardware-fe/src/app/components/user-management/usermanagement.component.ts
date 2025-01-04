import { Component, OnInit } from '@angular/core';
import { TableModule } from 'primeng/table';
import { Button } from 'primeng/button';
import { Tag } from 'primeng/tag';
import { UserResponseDtoService } from '../../service/userDto.service';
import { IUser } from '@relhardware/dto-shared';
import { Chip } from 'primeng/chip';

@Component({
  selector: 'app-user-management',
  templateUrl: './usermanagement.component.html',
  imports: [TableModule, Button, Tag, Chip],
  standalone: true,
})
export class UserManagementComponent implements OnInit {
  users!: IUser[];

  constructor(private usersService: UserResponseDtoService) {}

  ngOnInit() {
   this.refreshData();
  }

  refreshData() {
    this.usersService.getUserResponseDtos().subscribe((response) => {
      this.users = response;
    });
  }

  doRefresh() {
    this.refreshData();
  }

  getRole(role: string) {
    switch (role) {
      case 'user':
        return 'info';
      case 'admin':
        return 'danger';
      default:
        return undefined;
    }
  }
}
