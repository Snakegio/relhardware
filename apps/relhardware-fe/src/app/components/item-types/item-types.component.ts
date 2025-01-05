import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ItemTypeService } from '../../service/item-type.service';
import { IItemType } from '@relhardware/dto-shared';
import { TableModule } from 'primeng/table';
import { InputText } from 'primeng/inputtext';
import { FormsModule, NgForm } from '@angular/forms';
import { Button } from 'primeng/button';
import { Ripple } from 'primeng/ripple';
import { Toolbar } from 'primeng/toolbar';
import { Dialog } from 'primeng/dialog';
import { ToastModule } from 'primeng/toast';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ConfirmPopupModule } from 'primeng/confirmpopup';

@Component({
  selector: 'app-item-types',
  imports: [
    CommonModule,
    TableModule,
    InputText,
    FormsModule,
    Ripple,
    Button,
    Toolbar,
    Dialog,
    ToastModule,
    ConfirmPopupModule,
  ],
  providers: [MessageService, ItemTypeService, ConfirmationService],
  templateUrl: './item-types.component.html',
  styleUrl: './item-types.component.css',
})
export class ItemTypesComponent implements OnInit {
  private confirmationService = inject(ConfirmationService);
  private itemTypeService = inject(ItemTypeService);
  private messageService = inject(MessageService);
  items = signal<IItemType[]>([]);
  visible = false;
  itemType = '';

  ngOnInit() {
    this.updateData();
  }

  updateData() {
    this.itemTypeService.getItemTypes().subscribe({
      next: (items) => {
        this.items.set(items);
      },
    });
  }

  onItemSave(item: IItemType) {
    this.itemTypeService
      .updateItemType(item.id, item)
      .subscribe(() => this.updateData());
  }

  openNew() {
    this.visible = true;
  }

  onSubmit(myForm: NgForm) {
    this.itemTypeService.createItemType(this.itemType).subscribe(() => {
      this.updateData();
      this.messageService.add({
        severity: 'success',
        summary: 'Item Type Created',
      });
      this.visible = false;
      myForm.reset();
    });
  }

  deleteElem(event: Event, itemType: IItemType) {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: 'Do you want to delete this record?',
      icon: 'pi pi-info-circle',
      rejectButtonProps: {
        label: 'Cancel',
        severity: 'secondary',
        outlined: true,
      },
      acceptButtonProps: {
        label: 'Delete',
        severity: 'danger',
      },
      accept: () => {
        this.itemTypeService.deleteItemType(itemType.id).subscribe(() => {
          this.updateData();
          this.messageService.add({
            severity: 'info',
            summary: 'Confirmed',
            detail: 'Record deleted',
            life: 3000,
          });
        });
      },
    });
  }
}
