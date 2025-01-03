import { Component, OnInit } from '@angular/core';
import { Panel } from 'primeng/panel';
import { TableModule } from 'primeng/table';
import { Button, ButtonDirective } from 'primeng/button';
import { Rating } from 'primeng/rating';
import { Tag } from 'primeng/tag';
 import { UserResponseDtoService } from '../../service/userDto.service';
import { IUserDto } from '@relhardware/dto-shared';


@Component({
  selector: 'app-user-management',
  templateUrl: './usermanagement.component.html',
  imports: [
    Panel,
    TableModule,
    Button,
    Rating,
    Tag,
    ButtonDirective
  ],
  standalone: true
})
export class UserManagementComponent implements OnInit {
  users!: IUserDto[];

  constructor(private usersService: UserResponseDtoService) {}

  ngOnInit() {
    this.usersService.getUserResponseDtos()
      .subscribe(response => {
        this.users = response;
      })
  }
}
