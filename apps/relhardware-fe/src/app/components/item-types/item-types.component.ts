import { Component, inject, model, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ItemTypeService } from '../../service/item-type.service';
import { IItemType } from '@relhardware/dto-shared';
import { TableModule } from 'primeng/table';
import { InputText } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { Button } from 'primeng/button';
import { Ripple } from 'primeng/ripple';
import { Toolbar } from 'primeng/toolbar';
import { ToastModule } from 'primeng/toast';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { CreateItemTypesComponent } from '../dialog/create-item-types/create-item-types.component';

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
    ToastModule,
    ConfirmPopupModule,
    CreateItemTypesComponent,
  ],
  providers: [ItemTypeService, ConfirmationService],
  templateUrl: './item-types.component.html',
  standalone: true,
})
export class ItemTypesComponent implements OnInit {
  private confirmationService = inject(ConfirmationService);
  private itemTypeService = inject(ItemTypeService);
  private messageService = inject(MessageService);
  items = signal<IItemType[]>([]);
  isDialogVisible = model(false);

  ngOnInit() {
    this.updateData();
  }

  updateData() {
    this.itemTypeService.findAll().subscribe({
      next: (items) => {
        this.items.set(items);
      },
    });
  }

  onItemSave(item: IItemType) {
    if (item.id)
      this.itemTypeService
        .updateItemType(item.id, item)
        .subscribe(() => this.updateData());
  }

  openNew() {
    this.isDialogVisible.set(true);
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
        if (itemType.id)
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
