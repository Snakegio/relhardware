import { Component, OnInit, signal } from '@angular/core';
import { TableModule } from 'primeng/table';
import { Button } from 'primeng/button';
import { IRoleDto } from '@relhardware/dto-shared';
import { Chip } from 'primeng/chip';
import { RolesDtoService } from '../../service/rolesDto.service';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { MessageModule } from 'primeng/message';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-role-management',
  templateUrl: './rolemanagement.component.html',
  imports: [
    TableModule,
    Button,
    Chip,
    ReactiveFormsModule,
    MessageModule,
    NgIf,
    FormsModule
  ],
  providers: [RolesDtoService, MessageService],
  standalone: true
})
export class RolemanagementComponent implements OnInit {
  roles = signal<IRoleDtoEditable[]>([]);
  selectedRoleForm!: FormGroup;

  constructor(
    private rolesService: RolesDtoService,
    private fb: FormBuilder,
    private messageService: MessageService
  ) {
    // Form group da usare
    this.selectedRoleForm = this.fb.group({
      name: ['', Validators.required],
      read: [false],
      modify: [false],
      read_pdf: [false],
      read_history: [false]
    });
  }

  ngOnInit() {
    this.rolesService.getRolesDtos()
      .subscribe(
        {
          next: (response) => {
            this.roles.set(response.map((role) => ({
              ...role,
              isEditable: false
            })));
          },
          error: () => {
            this.messageService.add({
              severity: 'error',
              summary: 'Fetch Failed',
            });
          },
        }
      );
  }

  modifyRow(role: IRoleDtoEditable) {

    this.roles.update((roleMaps) => {
      if (!roleMaps) return [];

      return  roleMaps?.map((roleOriginal) =>
        roleOriginal.id === role.id ? { ...roleOriginal, isEditable: true } : roleOriginal)
    })

    this.selectedRoleForm.patchValue({
      name: role.name,
      read: role.read,
      modify: role.modify,
      read_pdf: role.read_pdf,
      read_history: role.read_history
    });
    console.log('check roles modified  {}', this.roles());
  }

  saveRow(row: IRoleDtoEditable) {
    if (this.selectedRoleForm.valid) {
      const updatedRole = this.selectedRoleForm.value;
      this.rolesService.patchRole(updatedRole.id, updatedRole).subscribe(() => {
        this.messageService.add({
          severity: 'success',
          summary: 'Role Updated',
          detail: updatedRole.name
        });
        this.ngOnInit();
      });
    } else {
      this.messageService.add({
        severity: 'error',
        summary: 'Login Failed',
        detail: 'Invalid credentials!',
      });
    }
  }

  undo() {
  }
}


interface IRoleDtoEditable extends IRoleDto {

  isEditable: boolean;
}
