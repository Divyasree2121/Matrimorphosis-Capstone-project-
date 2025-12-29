import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private http = inject(HttpClient);
  private apiUrl = 'api/admin';

  getStaff(): Observable<any[]> {
    return of([
      { id: 1, name: 'John Doe' },
      { id: 2, name: 'Jane Smith' },
    ]);
    // return this.http.get<any[]>(`${this.apiUrl}/staff`);
  }

  assignComplaint(complaintId: number, staffId: number): Observable<any> {
    return of({ message: 'Complaint assigned successfully' });
    // return this.http.post(`${this.apiUrl}/complaints/assign`, { complaintId, staffId });
  }
}
