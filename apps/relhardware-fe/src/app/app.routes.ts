import { Route } from '@angular/router';
import { LayoutComponent } from './components/layout/layout.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { UserManagementComponent } from './components/user-management/usermanagement.component';
import { RolemanagementComponent } from './components/role-management/rolemanagement.component';
import { ItemTypesComponent } from './components/item-types/item-types.component';
import { LocationManagementComponent } from './components/location-management/locationmanagement.component';
import { AllocationManagementComponent } from './components/allocation-management/allocationmanagement.component';
import { createAuthGuard } from 'keycloak-angular';

export const appRoutes: Route[] = [
  {
    path: '',
    component: LayoutComponent,
    canActivate: [createAuthGuard],
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent,
      },
      {
        path: 'user-management',
        component: UserManagementComponent,
      },
      {
        path: 'role-management',
        component: RolemanagementComponent,
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
