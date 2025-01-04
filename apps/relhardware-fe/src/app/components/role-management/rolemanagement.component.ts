import { Component, OnInit, signal } from '@angular/core';
import { TableModule } from 'primeng/table';
import { Button, ButtonDirective } from 'primeng/button';
import { IRoleDto } from '@relhardware/dto-shared';
import { Chip } from 'primeng/chip';
import { RolesDtoService } from '../../service/rolesDto.service';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { MessageModule } from 'primeng/message';
import { NgIf } from '@angular/common';
import { InputText } from 'primeng/inputtext';
import { Ripple } from 'primeng/ripple';
import { Select } from 'primeng/select';
import { ToggleButton } from 'primeng/togglebutton';
import { ToggleSwitch } from 'primeng/toggleswitch';

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
    FormsModule,
    InputText,
    ButtonDirective,
    Ripple,
    ToggleSwitch
  ],
  providers: [RolesDtoService, MessageService],
  standalone: true
})
export class RolemanagementComponent implements OnInit {
  roles = signal<IRoleDtoEditable[]>([]);
  selectedRoleForm!: FormGroup;
  clonedRoles: { [s: string]: IRoleDto } = {};


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
    this.refreshData();
  }

  refreshData() {
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

  doRefresh() {
    this.refreshData();
  }

  onRowEditInit(role: IRoleDto) {
    this.clonedRoles[role.id as number] = { ...role };
  }

  onRowEditCancel(role: IRoleDto, index: number) {
    this.clonedRoles[index] = this.clonedRoles[role.id as number];
    delete this.clonedRoles[role.id as number];
  }


  onRowEditSave(role: IRoleDto) {
    this.rolesService.patchRole(role.id, role).subscribe({
      next: () => {
        delete this.clonedRoles[role.id as number];
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Product is updated' });

      },
      error: () => {
        this.clonedRoles[role.id as number] = { ...role };
        this.messageService.add({ severity:'error', summary:'Error', detail:'Failed to update role' });
      }
    })





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
