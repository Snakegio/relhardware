import {
  ChangeDetectionStrategy,
  Component,
  inject,
  model, output
} from '@angular/core';
import { ICompanyDto } from '@relhardware/dto-shared';
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

export class CreatelocationDialogComponent {

  companyService = inject(CompanyService);
  messageService = inject(MessageService);


  visible = model<boolean>(true);
  refreshData = output<void>();


  companyForm = new FormGroup({
    id: new FormControl(),
    name: new FormControl('', [Validators.required]),
    location: new FormControl(''),
    city: new FormControl(''),
    postalCode: new FormControl(''),
  });

  undoOperation() {
    this.visible.set(false);
  }

  saveOperation() {
      if(this.companyForm.valid) {
        const companyToSave = <ICompanyDto> this.companyForm.getRawValue();

        this.companyService.postCompany(companyToSave)
          .subscribe({
          next: () => {
            this.messageService.add({
              severity:'success',
              summary: 'Company Created'
            });
            this.refreshData.emit();
            this.companyForm.reset();
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
