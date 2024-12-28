import {Route} from '@angular/router';
import {LayoutComponent} from './components/layout/layout.component';
import {DashboardComponent} from './components/dashboard/dashboard.component';
import {NotfoundComponent} from './components/notfound/notfound.component';
import {LoginComponent} from './components/auth/login/login.component';

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
