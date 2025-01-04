import { Component, inject, OnInit, signal } from '@angular/core';
import { TableModule } from 'primeng/table';
import { Button } from 'primeng/button';
import { Tag } from 'primeng/tag';
import { Chip } from 'primeng/chip';
import { AssignationService } from '../../service/assignation.service';
import { Column } from 'pdfmake/interfaces';
import { IAssignationDto, IItem } from '@relhardware/dto-shared';

@Component({
  selector: 'app-allocation-management',
  templateUrl: './allocationmanagement.component.html',
  imports: [TableModule, Button, Tag, Chip],
  standalone: true,
})
export class AllocationManagementComponent implements OnInit {
  assignations = signal<IAssignationDto[]>([]);
  private assignationService = inject(AssignationService);

  cols!: Column[];

  ngOnInit() {

    this.assignationService.getAssignations().subscribe({
      next: (data) => this.assignations.set(data),
      error: (err) => console.error('Error:', err),
    })
  }


}

export interface IUserAssignments {
  userNameSurname: string;
  assignments: IItem[];
  note: string;
}
