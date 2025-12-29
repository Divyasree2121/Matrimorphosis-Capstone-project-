
import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [FormsModule, RouterLink],
})
export class LoginComponent {
  email = signal('');
  password = signal('');
  
  private authService = inject(AuthService);
  private router = inject(Router);

  login(): void {
    this.authService.login({ email: this.email(), password: this.password() }).subscribe(() => {
      this.router.navigate(['/']);
    });
  }
}
