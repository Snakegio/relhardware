import { Route } from '@angular/router';
import { LayoutComponent } from './components/layout/layout.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { LoginComponent } from './components/auth/login/login.component';
import { UserManagementComponent } from './components/user-management/usermanagement.component';
import { AuthGuard } from './guards/auth.guard';
import { RolemanagementComponent } from './components/role-management/rolemanagement.component';
import { ItemTypesComponent } from './components/item-types/item-types.component';

export const appRoutes: Route[] = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: '',
    component: LayoutComponent,
    canActivate: [AuthGuard],
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
        component: ItemTypesComponent
      }
    ],
  },
  {
    path: '**',
    component: NotfoundComponent,
  },
];
