import { Component, inject, model, OnInit, signal } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { ICompany } from '@relhardware/dto-shared';
import { CompanyService } from '../../service/company.service';
import { MessageService } from 'primeng/api';
import { DataView } from 'primeng/dataview';
import { FormsModule } from '@angular/forms';
import { NgForOf } from '@angular/common';
import { CreatelocationDialogComponent } from './dialog/createlocation.dialog';
import { Toolbar } from 'primeng/toolbar';
import { MapComponent } from './map/map.component';
import { Ripple } from 'primeng/ripple';

@Component({
  selector: 'app-location-management',
  templateUrl: './locationmanagement.component.html',
  imports: [
    ButtonModule,
    DataView,
    FormsModule,
    NgForOf,
    CreatelocationDialogComponent,
    Toolbar,
    MapComponent,
    Ripple,
  ],
  providers: [CompanyService, MessageService],
  standalone: true,
})
export class LocationManagementComponent implements OnInit {
  companies = signal<ICompany[]>([]);

  private companyService = inject(CompanyService);
  private messageService = inject(MessageService);

  selectedCompany = signal<ICompany | null>(null);
  layout: 'list' | 'grid' = 'grid';
  isDialogVisible = model<boolean>(false);

  ngOnInit() {
    this.refreshData();
  }

  refreshData() {
    this.companyService.findAll().subscribe({
      next: (data) => this.companies.set(data),
      error: (err) =>
        this.messageService.add({
          severity: 'error',
          summary: 'Fetch Failed',
        }),
    });
  }

  updateCompany(company: ICompany) {
    this.selectedCompany.update(() => company);
    this.isDialogVisible.set(true);
  }

  createCompany() {
    this.selectedCompany.update(() => null);
    this.isDialogVisible.set(true);
  }

  deleteCompany(companyId: number) {
    if (confirm('Sei sicuro di voler eliminare questa filiale?')) {
      this.companyService.deleteCompany(companyId).subscribe(() => {
        this.refreshData(); // Ricarica la lista delle filiali dopo l'eliminazione
      });
    }
  }
}
