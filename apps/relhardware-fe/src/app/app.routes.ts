import { Route } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { ItemTypesComponent } from './components/item-types/item-types.component';
import { LocationManagementComponent } from './components/location-management/locationmanagement.component';
import { AllocationManagementComponent } from './components/allocation-management/allocationmanagement.component';
import { createAuthGuard } from 'keycloak-angular';
import { InventoryComponent } from './components/inventory/inventory.component';
import { AppLayout } from './components/layout/component/app.layout';

export const appRoutes: Route[] = [
  {
    path: '',
    component: AppLayout,
    canActivate: [createAuthGuard],
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent,
      },
      {
        path: 'inventory',
        component: InventoryComponent,
      },
      {
        path: 'item-types',
        component: ItemTypesComponent,
      },
      {
        path: 'item-location',
        component: LocationManagementComponent,
      },
      {
        path: 'item-allocation',
        component: AllocationManagementComponent,
      },
    ],
  },
  {
    path: '**',
    component: NotfoundComponent,
  },
];
