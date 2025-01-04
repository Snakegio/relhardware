import {
  Component,
  OnInit,
  signal,
  Signal,
  WritableSignal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ItemService } from '../../service/item.service';
import { Subscription } from 'rxjs';
import { IItemTypeDto } from '@relhardware/dto-shared';
import { TableModule } from 'primeng/table';
import { InputText } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { Button, ButtonDirective } from 'primeng/button';
import { Ripple } from 'primeng/ripple';

@Component({
  selector: 'app-item-types',
  imports: [
    CommonModule,
    TableModule,
    InputText,
    FormsModule,
    ButtonDirective,
    Ripple,
    Button,
  ],
  providers: [ItemService],
  templateUrl: './item-types.component.html',
  styleUrl: './item-types.component.css',
})
export class ItemTypesComponent implements OnInit {
  private subs: Subscription = new Subscription();
  items: WritableSignal<IItemTypeDto[]> = signal([]);

  constructor(private itemService: ItemService) {}

  ngOnInit() {
    this.subs.add(
      this.itemService.getItemTypes().subscribe({
        next: (items: IItemTypeDto[]) =>
          this.items.set([{ id: 0, name: 'item' }]),
      })
    );
  }

  onItemSave(item: IItemTypeDto) {
   console.log(item)
  }
}
