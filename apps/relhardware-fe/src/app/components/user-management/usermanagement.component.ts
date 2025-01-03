import { Component, OnInit } from '@angular/core';
import { Panel } from 'primeng/panel';
import { TableModule } from 'primeng/table';
import { Button } from 'primeng/button';
import { Rating } from 'primeng/rating';
import { Tag } from 'primeng/tag';
import { UserResponseDto } from '../../../../../relhardware-be/src/app/users/dto/user-response.dto';
import { UserResponseDtoService } from '../../service/userDto.service';


@Component({
  selector: 'app-user-management',
  templateUrl: './usermanagement.component.html',
  imports: [
    Panel,
    TableModule,
    Button,
    Rating,
    Tag
  ],
  standalone: true
})
export class UserManagementComponent implements OnInit {
  users!: UserResponseDto[];

  constructor(private usersService: UserResponseDtoService) {}

  ngOnInit() {
    this.usersService.getUserResponseDtos()
      .subscribe(response => {
        this.users = response;
      })
  }

}
