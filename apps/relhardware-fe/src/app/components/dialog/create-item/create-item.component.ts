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
import { FormsModule, NgForm } from '@angular/forms';
import { Button } from 'primeng/button';
import { Dialog } from 'primeng/dialog';
import { InputText } from 'primeng/inputtext';
import { ItemService } from '../../../service/item.service';

@Component({
  selector: 'app-create-item',
  imports: [CommonModule, Button, Dialog, FormsModule, InputText],
  template: ` <p-dialog
    header="Create Item"
    [modal]="true"
    [(visible)]="visible"
    [style]="{ width: '40rem' }"
    (onHide)="closeDialog()"
  >
    <form (ngSubmit)="onSubmit(itemForm)" #itemForm="ngForm">
      <span class="p-text-secondary block mb-4"
        >Lorem ipsum dolor sit amet</span
      >
      <div class="flex items-center gap-4 mb-4">
        <label for="item" class="font-semibold w-24">Item Type</label>
        <input
          pInputText
          id="item"
          class="flex-auto"
          autocomplete="off"
          name="item"
          [ngModel]="item()"
          (ngModelChange)="item.set($event)"
          required
        />
      </div>
      <div class="flex justify-content-end gap-2">
        <p-button label="Cancel" severity="secondary" (click)="closeDialog()" />
        <p-button label="Save" type="submit" [disabled]="itemForm.invalid" />
      </div>
    </form>
  </p-dialog>`,
  standalone: true,
})
export class CreateItemComponent {
  private itemService = inject(ItemService);
  private messageService = inject(MessageService);
  visible = model<boolean>(true);
  item: WritableSignal<string> = signal<string>('');
  refreshData = output<void>();

  closeDialog(): void {
    this.visible.set(false);
  }

  onSubmit(myForm: NgForm) {
    this.itemService.createItem(this.item()).subscribe(() => {
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
