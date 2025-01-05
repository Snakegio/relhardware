import {
  Component,
  inject,
  model,
  output,
  signal,
  WritableSignal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MessageService } from 'primeng/api';
import { ItemTypeService } from '../../../service/item-type.service';
import { FormsModule, NgForm } from '@angular/forms';
import { Button } from 'primeng/button';
import { Dialog } from 'primeng/dialog';
import { InputText } from 'primeng/inputtext';

@Component({
  selector: 'app-create-item-types',
  imports: [CommonModule, Button, Dialog, FormsModule, InputText],
  template: ` <p-dialog
    header="Create Item Types"
    [modal]="true"
    [(visible)]="visible"
    [style]="{ width: '40rem' }"
    (onHide)="closeDialog()"
  >
    <form (ngSubmit)="onSubmit(itemTypeForm)" #itemTypeForm="ngForm">
      <span class="p-text-secondary block mb-4"
        >Lorem ipsum dolor sit amet</span
      >
      <div class="flex items-center gap-4 mb-4">
        <label for="itemType" class="font-semibold w-24">Item Type</label>
        <input
          pInputText
          id="itemType"
          class="flex-auto"
          autocomplete="off"
          name="itemType"
          [ngModel]="itemType()"
          (ngModelChange)="itemType.set($event)"
          required
        />
      </div>
      <div class="flex justify-content-end gap-2">
        <p-button label="Cancel" severity="secondary" (click)="closeDialog()" />
        <p-button
          label="Save"
          type="submit"
          [disabled]="itemTypeForm.invalid"
        />
      </div>
    </form>
  </p-dialog>`,
})
export class CreateItemTypesComponent {
  private itemTypeService = inject(ItemTypeService);
  private messageService = inject(MessageService);
  // Signal per la visibilità del dialog
  visible = model<boolean>(true);
  // Signal per il valore dell'input
  itemType: WritableSignal<string> = signal<string>('');
  refreshData = output<void>();

  closeDialog(): void {
    this.visible.set(false);
  }

  onSubmit(myForm: NgForm) {
    this.itemTypeService.createItemType(this.itemType()).subscribe(() => {
      this.refreshData.emit();
      this.messageService.add({
        severity: 'success',
        summary: 'Item Type Created',
      });
      this.closeDialog();
      myForm.reset();
    });
  }
}
