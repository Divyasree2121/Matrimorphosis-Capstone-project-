import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { authGuard } from './auth.guard';
import { StaffDashboardComponent } from './staff/dashboard/dashboard';
import { AdminDashboardComponent } from './admin/dashboard/dashboard';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  {
    path: '',
    canActivate: [authGuard],
    children: [
      { path: '', component: HomeComponent },
      {
        path: 'complaints',
        loadChildren: () => import('./complaints/complaints.routes').then(m => m.COMPLAINTS_ROUTES)
      },
      { path: 'staff/dashboard', component: StaffDashboardComponent },
      { path: 'admin/dashboard', component: AdminDashboardComponent }
    ]
  },
];
