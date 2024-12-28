import { Route } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { LayoutComponent } from './ layout/layout.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';

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
    children: [
      {
        path: 'dashboard', // esempio di percorso figlio
        component: DashboardComponent, // componente figlio da visualizzare
      },
      // Add your routes here
    ]
  },
  {
    path: '**',
    component: NotfoundComponent,
  },
];
