import { Component, OnInit } from '@angular/core';
import { Panel } from 'primeng/panel';
import { TableModule } from 'primeng/table';
import { Button, ButtonDirective } from 'primeng/button';
import { Rating } from 'primeng/rating';
import { Tag } from 'primeng/tag';
import { UserResponseDtoService } from '../../service/userDto.service';
import { IUserDto } from '@relhardware/dto-shared';
import { NgForOf } from '@angular/common';
import { Chip } from 'primeng/chip';


@Component({
  selector: 'app-user-management',
  templateUrl: './usermanagement.component.html',
  imports: [
    TableModule,
    Button,
    Tag,
    Chip
  ],
  standalone: true
})
export class UserManagementComponent implements OnInit {
  users!: IUserDto[];

  constructor(private usersService: UserResponseDtoService) {
  }

  ngOnInit() {
    this.usersService.getUserResponseDtos()
      .subscribe(response => {
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
