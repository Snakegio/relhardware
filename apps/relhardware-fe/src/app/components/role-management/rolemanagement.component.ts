import { Component, OnInit } from '@angular/core';
import { TableModule } from 'primeng/table';
import { Button } from 'primeng/button';
import { IRoleDto } from '@relhardware/dto-shared';
import { Chip } from 'primeng/chip';
import { RolesDtoService } from '../../service/rolesDto.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
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
    FormsModul,
  ],
  providers: [RolesDtoService, MessageService],
  standalone: true,
})
export class RolemanagementComponent implements OnInit {
  roles!: IRoleDtoEditable[];
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
      read_history: [false],
    });
  }

  ngOnInit() {
    this.rolesService.getRolesDtos().subscribe((response) => {
      this.roles = response.map((role) => ({
        ...role, // Mantieni tutte le proprietà esistenti del ruolo
        isEditable: fals, // Imposta isEditable a false di default
      }));
    });
  }

  modifyRow(role: IRoleDtoEditable) {
    this.roles = this.roles.map((roleOr) =>
      roleOr.id === role.id ? { ...roleOr, isEditable: true } : roleOr
    );
    this.selectedRoleForm.patchValue({
      name: role.name,
      read: role.read,
      modify: role.modify,
      read_pdf: role.read_pdf,
      read_history: role.read_history,
    });
    console.log('check roles modified  {}', this.roles);
  }

  saveRow(row: IRoleDtoEditable) {
    if (this.selectedRoleForm.valid) {
      const updatedRole = this.selectedRoleForm.value;
      this.rolesService.patchRole(updatedRole.id, updatedRole).subscribe(() => {
        this.messageService.add({
          severity: 'success',
          summary: 'Role Updated',
          detail: updatedRole.name,
        });
        this.ngOnInit();
      });
    } else {
      this.messageService.add({
        severity: 'error',
        summary: 'Login Failed',
        detail: 'Invalid credentials!,
      });
    }
  }

  undo() {}
}


interface IRoleDtoEditable extends IRoleDto{

  isEditable: boolean;
}
