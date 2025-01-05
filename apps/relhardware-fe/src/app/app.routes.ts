import { Route } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { ItemTypesComponent } from './components/item-types/item-types.component';
import { LocationManagementComponent } from './components/location-management/locationmanagement.component';
import { AllocationManagementComponent } from './components/allocation-management/allocationmanagement.component';
import { createAuthGuard } from 'keycloak-angular';

export const appRoutes: Route[] = [
  {
    path: '',
    canActivate: [createAuthGuard],
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent,
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
