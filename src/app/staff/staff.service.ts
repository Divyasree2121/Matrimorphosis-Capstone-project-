import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class StaffService {
  private http = inject(HttpClient);
  private apiUrl = 'api/staff'; 

  getAssignedComplaints(staffId: number): Observable<any[]> {
    // Mock data for now
    return of([
      { id: 1, title: 'Leaky Faucet', category: 'Plumbing', status: 'Assigned', createdAt: new Date() },
    ]);
    // return this.http.get<any[]>(`${this.apiUrl}/${staffId}/complaints`);
  }
}
