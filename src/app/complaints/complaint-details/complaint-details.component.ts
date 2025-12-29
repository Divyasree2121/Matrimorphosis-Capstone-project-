import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { ComplaintsService } from '../complaints.service';

@Component({
  selector: 'app-complaint-details',
  imports: [ReactiveFormsModule],
  templateUrl: './complaint-details.component.html',
  styleUrls: ['./complaint-details.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ComplaintDetailsComponent {
  private fb = inject(FormBuilder);
  private complaintsService = inject(ComplaintsService);
  public submissionStatus = signal('');
  complaintForm = this.fb.group({
    title: ['', Validators.required],
    description: ['', Validators.required],
    category: ['', Validators.required],
    attachment: [null]
  });

  onFileChange(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.complaintForm.patchValue({
        attachment: file
      });
    }
  }

  onSubmit() {
    if (this.complaintForm.valid) {
      this.complaintsService.submitComplaint(this.complaintForm.value).subscribe({
        next: () => {
          this.submissionStatus.set('Complaint submitted successfully!');
          this.complaintForm.reset();
        },
        error: () => {
          this.submissionStatus.set('Failed to submit complaint. Please try again.');
        }
      });
    }
  }
}
