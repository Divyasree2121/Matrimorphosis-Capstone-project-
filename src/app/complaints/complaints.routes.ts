import { Routes } from '@angular/router';
import { ComplaintListComponent } from './complaint-list/complaint-list';
import { ComplaintDetailsComponent } from './complaint-details/complaint-details.component';

export const COMPLAINTS_ROUTES: Routes = [
  { path: '', component: ComplaintListComponent },
  { path: 'new', component: ComplaintDetailsComponent },
  { path: ':id', component: ComplaintDetailsComponent },
];
