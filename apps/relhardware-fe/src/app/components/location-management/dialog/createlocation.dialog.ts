import {
  ChangeDetectionStrategy,
  Component,
  inject, input,
  model, OnChanges, OnInit, output, SimpleChanges
} from '@angular/core';
import { ICompany } from '@relhardware/dto-shared';
import { Dialog } from 'primeng/dialog';
import { Button } from 'primeng/button';
import { InputText } from 'primeng/inputtext';
import { IftaLabel } from 'primeng/iftalabel';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Message } from 'primeng/message';
import { CompanyService } from '../../../service/company.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-location-dialog',
  standalone: true,
  imports: [
    Dialog,
    Button,
    InputText,
    IftaLabel,
    FormsModule,
    ReactiveFormsModule,
    Message
  ],
  providers: [CompanyService, MessageService],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: 'createlocation.dialog.html'
})

export class CreatelocationDialogComponent implements OnInit, OnChanges  {

  companyService = inject(CompanyService);
  messageService = inject(MessageService);

  company = input<ICompany | null>(null);
  visible = model<boolean>(true);
  refreshData = output<void>();
  isEditMode = false;
  companyForm!: FormGroup;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['company'] && this.company()) {
      const company = this.company();
      if(company != null)
        this.initializeForm(company);
    }
  }

  private initializeForm(company: ICompany) {
    this.isEditMode = true;
    this.companyForm = new FormGroup({
      id: new FormControl(company.id),
      name: new FormControl(company.name, [Validators.required]),
      location: new FormControl(company.location),
      city: new FormControl(company.city),
      postalCode: new FormControl(company.postalCode)
    });
  }

  ngOnInit() {
      this.companyForm = new FormGroup({
        id: new FormControl(),
        name: new FormControl('', [Validators.required]),
        location: new FormControl(''),
        city: new FormControl(''),
        postalCode: new FormControl('')
      });
  }

  undoOperation() {
    this.visible.set(false);
  }

  saveOperation() {
      if(this.companyForm.valid) {
        const companyToSave = <ICompany> this.companyForm.getRawValue();
        if (this.isEditMode) {
          this.companyService.patchCompany(companyToSave.id, companyToSave).subscribe({
            next: () => {
              this.messageService.add({
                severity: 'success',
                summary: 'Company Updated',
              });
              this.refreshData.emit();
              this.resetForm();
              this.undoOperation();
            },
            error: () => {
              this.messageService.add({
                severity: 'error',
                summary: 'Company Update Failed',
              });
            },
          });
        } else {
          this.companyService.postCompany(companyToSave)
            .subscribe({
              next: () => {
                this.messageService.add({
                  severity:'success',
                  summary: 'Company Created'
                });
                this.refreshData.emit();
                this.resetForm();
                this.undoOperation();
              },
              error: () => {
                this.messageService.add({
                  severity: 'error',
                  summary: 'Company Creation Failed',
                });
              }
            })
        }



      }
  }



  private resetForm() {
    this.companyForm.reset();
  }


}
