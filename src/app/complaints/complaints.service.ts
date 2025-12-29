import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ComplaintsService {
  private http = inject(HttpClient);

  private complaints = [
    { id: 1, title: 'Leaky Faucet', category: 'Plumbing', description: 'The kitchen faucet is dripping constantly.', status: 'Open', assignedTo: null, resolution: null },
    { id: 2, title: 'Broken Light Switch', category: 'Electrical', description: 'The light switch in the living room is not working.', status: 'Open', assignedTo: null, resolution: null },
    { id: 3, title: 'Overgrown Bushes', category: 'Landscaping', description: 'The bushes in front of the house are blocking the sidewalk.', status: 'Assigned', assignedTo: 1, resolution: null }
  ];

  getComplaints(): Observable<any[]> {
    return of(this.complaints);
  }

  getComplaintById(id: number): Observable<any> {
    const complaint = this.complaints.find(c => c.id === id);
    return of(complaint);
  }

  updateComplaintStatus(id: number, status: string): Observable<any> {
    const complaint = this.complaints.find(c => c.id === id);
    if (complaint) {
      complaint.status = status;
    }
    return of(complaint);
  }

  submitComplaint(complaintData: any): Observable<any> {
    const newComplaint = {
      id: this.complaints.length + 1,
      ...complaintData,
      status: 'Open',
      assignedTo: null,
      resolution: null
    };
    this.complaints.push(newComplaint);
    return of(newComplaint);
  }
}
