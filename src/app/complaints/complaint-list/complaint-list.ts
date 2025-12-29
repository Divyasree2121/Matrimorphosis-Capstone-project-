import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ComplaintsService } from '../complaints.service';
import { AsyncPipe, DatePipe } from '@angular/common';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-complaint-list',
  templateUrl: './complaint-list.html',
  styleUrls: ['./complaint-list.component.css'],
  imports: [AsyncPipe, DatePipe],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ComplaintListComponent {
  complaints$: Observable<any[]>;
  private complaintsService = inject(ComplaintsService);

  constructor() {
    this.complaints$ = this.complaintsService.getComplaints();
  }

  public getStatusColor(status: string): string {
    switch (status) {
      case 'Open':
        return 'red';
      case 'Assigned':
        return 'orange';
      case 'In-progress':
        return 'blue';
      case 'Resolved':
        return 'green';
      default:
        return 'black';
    }
  }
}
