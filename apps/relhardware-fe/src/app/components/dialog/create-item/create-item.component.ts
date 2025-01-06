import {
  Component,
  inject,
  model,
  OnInit,
  output,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MessageService } from 'primeng/api';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Button } from 'primeng/button';
import { Dialog } from 'primeng/dialog';
import { ItemService } from '../../../service/item.service';
import { CompanyService } from '../../../service/company.service';
import {
  AutoCompleteCompleteEvent,
  AutoCompleteModule,
} from 'primeng/autocomplete';
import { ItemTypeService } from '../../../service/item-type.service';
import { ICompany, IItem, IItemType } from '@relhardware/dto-shared';
import { Fieldset } from 'primeng/fieldset';
import { InputText } from 'primeng/inputtext';

@Component({
  selector: 'app-create-item',
  imports: [
    CommonModule,
    Button,
    Dialog,
    FormsModule,
    ReactiveFormsModule,
    AutoCompleteModule,
    Fieldset,
    InputText,
  ],
  providers: [ItemTypeService, ItemService, CompanyService],
  template: ` <p-dialog
    header="Create Item"
    [modal]="true"
    [(visible)]="visible"
    [style]="{ width: '40rem' }"
    (onHide)="closeDialog()"
  >
    <pre>{{ itemFormGroup.value | json }}</pre>
    <form [formGroup]="itemFormGroup" (ngSubmit)="onSubmit()">
      <span class="p-text-secondary block mb-4"
        >Lorem ipsum dolor sit amet</span
      >
      <p-fieldset legend="Required Information" class="mb-4">
        <div class="field grid">
          <label for="idItemType" class="col-12 mb-2 md:col-2 md:mb-0"
            >Item Type</label
          >
          <div class="col-12 md:col-10">
            <p-autocomplete
              [fluid]="true"
              formControlName="itemType"
              [suggestions]="itemTypesFiltered()"
              (completeMethod)="searchItemType($event)"
              optionLabel="name"
              [forceSelection]="true"
              [dropdown]="true"
              id="itemType"
              [ngClass]="{
                'ng-invalid ng-dirty':
                  itemFormGroup.get('itemType')?.invalid &&
                  (itemFormGroup.get('itemType')?.touched ||
                    itemFormGroup.get('itemType')?.dirty)
              }"
            />
            @if (itemFormGroup.get('itemType')?.invalid &&
            itemFormGroup.get('itemType')?.touched &&
            itemFormGroup.get('itemType')?.hasError('required')) {
            <small>Field required</small>
            }
          </div>
        </div>
        <div class="field grid">
          <label for="model" class="col-12 mb-2 md:col-2 md:mb-0">Model</label>
          <div class="col-12 md:col-10">
            <input
              type="text"
              pInputText
              formControlName="model"
              [fluid]="true"
              id="model"
              [ngClass]="{
                'ng-invalid ng-dirty':
                  itemFormGroup.get('model')?.invalid &&
                  (itemFormGroup.get('model')?.touched ||
                    itemFormGroup.get('model')?.dirty)
              }"
            />
            @if (itemFormGroup.get('model')?.invalid &&
            itemFormGroup.get('model')?.touched &&
            itemFormGroup.get('model')?.hasError('required')) {
            <small>Field required</small>
            }
          </div>
        </div>
        <div class="field grid">
          <label for="serviceTag" class="col-12 mb-2 md:col-2 md:mb-0"
            >Service Tag</label
          >
          <div class="col-12 md:col-10">
            <input
              type="text"
              pInputText
              formControlName="serviceTag"
              [fluid]="true"
              id="serviceTag"
              [ngClass]="{
                'ng-invalid ng-dirty':
                  itemFormGroup.get('serviceTag')?.invalid &&
                  (itemFormGroup.get('serviceTag')?.touched ||
                    itemFormGroup.get('serviceTag')?.dirty)
              }"
            />
            @if (itemFormGroup.get('serviceTag')?.invalid &&
            itemFormGroup.get('serviceTag')?.touched &&
            itemFormGroup.get('serviceTag')?.hasError('required')) {
            <small>Field required</small>
            }
          </div>
        </div>
        <div class="field grid">
          <label for="company" class="col-12 mb-2 md:col-2 md:mb-0"
          >Company</label
          >
          <div class="col-12 md:col-10">
            <p-autocomplete
              [fluid]="true"
              formControlName="company"
              [suggestions]="companiesFiltered()"
              (completeMethod)="searchCompany($event)"
              optionLabel="name"
              [forceSelection]="true"
              [dropdown]="true"
              id="company"
              [ngClass]="{
                'ng-invalid ng-dirty':
                  itemFormGroup.get('company')?.invalid &&
                  (itemFormGroup.get('company')?.touched ||
                    itemFormGroup.get('company')?.dirty)
              }"
            />
            @if (itemFormGroup.get('company')?.invalid &&
            itemFormGroup.get('company')?.touched &&
            itemFormGroup.get('company')?.hasError('required')) {
              <small>Field required</small>
            }
          </div>
        </div>
      </p-fieldset>
      <div class="flex justify-content-end gap-2">
        <p-button label="Cancel" severity="secondary" (click)="closeDialog()" />
        <p-button
          label="Save"
          type="submit"
          [disabled]="itemFormGroup.invalid"
        />
      </div>
    </form>
  </p-dialog>`,
  standalone: true,
})
export class CreateItemComponent implements OnInit {
  private itemService = inject(ItemService);
  private itemTypeService = inject(ItemTypeService);
  private companyService = inject(CompanyService);
  private messageService = inject(MessageService);
  visible = model<boolean>(true);
  itemTypes = signal<IItemType[]>([]);
  itemTypesFiltered = signal<IItemType[]>([]);
  companies = signal<ICompany[]>([]);
  companiesFiltered = signal<ICompany[]>([]);
  refreshData = output<void>();
  itemFormGroup = new FormGroup({
    itemType: new FormControl<IItemType | null>(null, Validators.required),
    internalCode: new FormControl(''),
    model: new FormControl('', Validators.required),
    serviceTag: new FormControl('', Validators.required),
    contract: new FormControl(''),
    dockingStation: new FormControl<boolean>(false),
    productNumber: new FormControl(''),
    macAddress: new FormControl(''),
    company: new FormControl<ICompany | null>(null, Validators.required),
  });

  ngOnInit(): void {
    this.itemTypeService
      .findAll()
      .subscribe((value) => this.itemTypes.set(value));
    this.companyService.findAll()
      .subscribe((value) => this.companies.set(value));
  }

  closeDialog(): void {
    this.visible.set(false);
  }

  searchItemType(event: AutoCompleteCompleteEvent) {
    this.itemTypesFiltered.set(
      this.itemTypes().filter((value) => value.name.includes(event.query))
    );
  }
  searchCompany(event: AutoCompleteCompleteEvent) {
    this.companiesFiltered.set(
      this.companies().filter((value) => value.name.includes(event.query))
    );
  }

  fromFormToIItem(): IItem {
    return {
      itemType: this.itemFormGroup.get('itemType')?.value,
      internalCode: this.itemFormGroup.get('internalCode')?.value,
      model: this.itemFormGroup.get('model')?.value,
      serviceTag: this.itemFormGroup.get('serviceTag')?.value,
      contract: this.itemFormGroup.get('contract')?.value,
      dockingStation: this.itemFormGroup.get('dockingStation')?.value,
      productNumber: this.itemFormGroup.get('productNumber')?.value,
      macAddress: this.itemFormGroup.get('macAddress')?.value,
      company: this.itemFormGroup.get('company')?.value,
    } as IItem;
  }

  onSubmit() {
    this.itemService.createItem(this.fromFormToIItem()).subscribe(() => {
      this.refreshData.emit();
      this.messageService.add({
        severity: 'success',
        summary: 'Item Type Created',
      });
      this.closeDialog();
      this.itemFormGroup.reset();
    });
  }
}
