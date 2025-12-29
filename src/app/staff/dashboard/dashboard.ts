import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { ComplaintsService } from '../../complaints/complaints.service';
import { Observable } from 'rxjs';
import { StaffService } from '../staff.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-staff-dashboard',
  imports: [CommonModule],
  template: `
    <div class="staff-dashboard-container">
      <h2>Your Assigned Complaints</h2>
      <div class="complaint-list">
        <table>
          <thead>
            <tr>
              <th>Title</th>
              <th>Category</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            @for (complaint of complaints$ | async; track complaint.id) {
              <tr>
                <td>{{ complaint.title }}</td>
                <td>{{ complaint.category }}</td>
                <td>
                  <select #statusSelect [value]="complaint.status" (change)="updateStatus(complaint.id, statusSelect.value)">
                    <option value="Assigned">Assigned</option>
                    <option value="In-progress">In-progress</option>
                    <option value="Resolved">Resolved</option>
                  </select>
                </td>
                <td>
                  <button (click)="selectComplaint(complaint)">View Details</button>
                </td>
              </tr>
            }
          </tbody>
        </table>
      </div>

      @if (selectedComplaint(); as complaint) {
        <div class="complaint-details">
          <h3>Complaint Details</h3>
          <p><strong>Title:</strong> {{ complaint.title }}</p>
          <p><strong>Description:</strong> {{ complaint.description }}</p>
          <p><strong>Category:</strong> {{ complaint.category }}</p>
          <div class="form-group">
            <label for="status">Status</label>
            <select id="status" [value]="complaint.status" #detailStatusSelect>
              <option value="Assigned">Assigned</option>
              <option value="In-progress">In-progress</option>
              <option value="Resolved">Resolved</option>
            </select>
          </div>
          <div class="form-group">
            <label for="notes">Resolution Notes</label>
            <textarea id="notes" #notesTextarea></textarea>
          </div>
          <button (click)="updateComplaint(complaint.id, detailStatusSelect.value, notesTextarea.value)">Update Complaint</button>
          <button (click)="clearSelection()">Close</button>
        </div>
      }
    </div>
  `,
  styleUrls: ['./dashboard.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StaffDashboardComponent {
  complaints$: Observable<any[]>;
  private staffService = inject(StaffService);
  private complaintsService = inject(ComplaintsService);
  public selectedComplaint = signal<any | null>(null);

  constructor() {
    // Assuming the staff member's ID is 1 for now
    this.complaints$ = this.staffService.getAssignedComplaints(1);
  }

  updateStatus(complaintId: number, status: string) {
    this.complaintsService.updateComplaintStatus(complaintId, status).subscribe();
  }

  selectComplaint(complaint: any) {
    this.selectedComplaint.set(complaint);
  }

  clearSelection() {
    this.selectedComplaint.set(null);
  }

  updateComplaint(complaintId: number, status: string, resolution: string) {
    // In a real app, you'd also save the resolution notes
    this.complaintsService.updateComplaintStatus(complaintId, status).subscribe(() => {
        this.clearSelection();
        // Refresh the list
        this.complaints$ = this.staffService.getAssignedComplaints(1);
    });
  }
}
