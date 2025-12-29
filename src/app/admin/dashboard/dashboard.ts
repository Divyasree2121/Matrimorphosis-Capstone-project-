import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ComplaintsService } from '../../complaints/complaints.service';
import { AdminService } from '../admin.service';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin-dashboard',
  imports: [CommonModule],
  template: `
    <div class="admin-dashboard-container">
      <h2>Admin Dashboard</h2>
      <div class="complaint-list">
        <h3>Unassigned Complaints</h3>
        <table>
          <thead>
            <tr>
              <th>Title</th>
              <th>Category</th>
              <th>Assign To</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            @for (complaint of complaints$ | async; track complaint.id) {
              @if(complaint.status === 'Open') {
                <tr>
                  <td>{{ complaint.title }}</td>
                  <td>{{ complaint.category }}</td>
                  <td>
                    <select #staffSelect>
                      @for (staff of staff$ | async; track staff.id) {
                        <option [value]="staff.id">{{ staff.name }}</option>
                      }
                    </select>
                  </td>
                  <td>
                    <button (click)="assignComplaint(complaint.id, staffSelect.value)">Assign</button>
                  </td>
                </tr>
              }
            }
          </tbody>
        </table>
      </div>
    </div>
  `,
  styleUrls: ['./dashboard.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdminDashboardComponent {
  complaints$: Observable<any[]>;
  staff$: Observable<any[]>;
  private complaintsService = inject(ComplaintsService);
  private adminService = inject(AdminService);

  constructor() {
    this.complaints$ = this.complaintsService.getComplaints();
    this.staff$ = this.adminService.getStaff();
  }

  assignComplaint(complaintId: number, staffId: string) {
    this.adminService.assignComplaint(complaintId, parseInt(staffId, 10)).subscribe();
  }
}
