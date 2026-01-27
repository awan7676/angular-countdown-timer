import { Component } from '@angular/core';
import { CountdownComponent } from './components/countdown/countdown';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CountdownComponent],
  template: `
    <div class="app-container">
      <app-countdown></app-countdown>
    </div>
  `,
})
export class AppComponent {
  title = 'countdown-app';
}