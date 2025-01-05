import { Component, inject, OnInit, signal } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { Tag } from 'primeng/tag';
import { ICompanyDto } from '@relhardware/dto-shared';
import { CompanyService } from '../../service/company.service';
import { MessageService } from 'primeng/api';
import { DataView } from 'primeng/dataview';
import { FormsModule } from '@angular/forms';
import { SelectButton } from 'primeng/selectbutton';
import { NgClass, NgForOf } from '@angular/common';
import { CreatelocationDialogComponent } from './dialog/createlocation.dialog';

@Component({
  selector: 'app-location-management',
  templateUrl: './locationmanagement.component.html',
  imports: [
    ButtonModule,
    Tag,
    DataView,
    FormsModule,
    SelectButton,
    NgClass,
    NgForOf,
    CreatelocationDialogComponent,
  ],
  providers: [CompanyService, MessageService],
  standalone: true,
})
export class LocationManagementComponent implements OnInit {
  companies = signal<ICompanyDto[]>([]);
  private assignationService = inject(CompanyService);
  private messageService = inject(MessageService);

  layout = 'grid';
  options = ['list', 'grid'];
  isVisible = signal<boolean>(false);

  closedModal() {
    this.isVisible.set(false);
  }

  ngOnInit() {
    this.assignationService.getCompanies().subscribe({
      next: (data) => this.companies.set(data),
      error: (err) =>
        this.messageService.add({
          severity: 'error',
          summary: 'Fetch Failed',
        }),
    });
  }

  createCompany() {
    this.isVisible.set(true);
  }
}
