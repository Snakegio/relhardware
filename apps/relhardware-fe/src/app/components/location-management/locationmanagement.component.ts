import { Component, OnInit } from '@angular/core';
import { TableModule } from 'primeng/table';
import { Button } from 'primeng/button';
import { Tag } from 'primeng/tag';
import { UserResponseDtoService } from '../../service/userDto.service';
import { IUser } from '@relhardware/dto-shared';
import { Chip } from 'primeng/chip';

@Component({
  selector: 'app-location-management',
  templateUrl: './locationmanagement.component.html',
  imports: [TableModule, Button, Tag, Chip],
  standalone: true,
})
export class LocationManagementComponent implements OnInit {
  users!: IUser[];

  constructor(private usersService: UserResponseDtoService) {}

  ngOnInit() {
    this.usersService.getUserResponseDtos().subscribe((response) => {
      this.users = response;
    });
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
