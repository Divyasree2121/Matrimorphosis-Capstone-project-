
import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [FormsModule, RouterLink],
})
export class RegisterComponent {
  email = signal('');
  password = signal('');
  role = signal('user');

  private authService = inject(AuthService);
  private router = inject(Router);

  register(): void {
    this.authService.register({ email: this.email(), password: this.password(), role: this.role() }).subscribe(() => {
      this.router.navigate(['/']);
    });
  }
}
